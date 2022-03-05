import {catchError, Observable, of, Subject, tap, throwError} from "rxjs";
import {AbstractSmallCrudService} from "./crud-small.service";
import {IdHolder} from "../api.domain";
import {HttpClient} from "@angular/common/http";
import {Inject, Injectable, OnDestroy} from "@angular/core";

const CACHE_LIFETIME_MIN: number = 5;
const CACHE_LIFETIME: number = 1000 * 60 * CACHE_LIFETIME_MIN;

export type UpdateCachedElement<D, S> = (cached: S, fresh: D) => void;
export type ConvertToSmall<D, S> = (fresh: D) => S;

@Injectable()
export abstract class AbstractSmallCachedCrudService<D, DI extends IdHolder<I>, S extends IdHolder<I>, I> extends AbstractSmallCrudService<D, DI, S, I> implements OnDestroy {

  private cache: S[] | null;
  private cacheExpire: number;
  private updatingCache: Subject<S[]> | null;

  protected constructor(
    @Inject('') http: HttpClient,
    @Inject('') apiBase: () => string,
    @Inject('') apiModule: string,
    @Inject('') name: string,
    @Inject('') pluralName: string,
    @Inject('') private readonly updateCachedElement: UpdateCachedElement<DI, S>,
    @Inject('') private readonly convertToSmall: ConvertToSmall<DI, S>
  ) {
    super(http, apiBase, apiModule, name, pluralName);

    this.cache = null;
    this.cacheExpire = 0;
    this.updatingCache = null;

    this.loadCache().subscribe();
  }

  public ngOnDestroy(): void {
    console.log(`Destroying ${this.name} cache...`);
    this.updatingCache?.complete();
  }

  public invalidateCache(): void {
    this.cache = null;
    this.cacheExpire = 0;
  }

  public override findAll(): Observable<S[]> {
    if (this.updatingCache) {
      return this.updatingCache.asObservable();
    }

    if (this.cacheExpire > Date.now() && this.cache) {
      return of(this.cache);
    }

    return this.loadCache();
  }

  public override get(id: I): Observable<DI> {
    return super.get(id).pipe(tap(this.updateCache));
  }

  public override add(dto: D): Observable<DI> {
    return super.add(dto).pipe(tap(fresh => this.cache?.push(this.convertToSmall(fresh))));
  }

  public override set(id: I, dto: D): Observable<DI> {
    return super.set(id, dto).pipe(tap(this.updateCache));
  }

  public override update(id: I, dto: D): Observable<DI> {
    return super.update(id, dto).pipe(tap(this.updateCache));
  }

  public override delete(id: I): Observable<void> {
    return super.delete(id).pipe(tap(() => {
      if (!this.cache) {
        return;
      }

      const index = this.cache.findIndex(cached => cached.id === id);
      if (index !== -1) {
        this.cache.splice(index, 1);
      }
    }));
  }

  private updateCache(fresh: DI): void {
    if (!this.cache) {
      return;
    }

    const cached = this.cache.find(cached => cached.id === fresh.id);

    if (cached) {
      this.updateCachedElement(cached, fresh);
    }
  }

  private loadCache(): Observable<S[]> {
    this.updatingCache = new Subject<S[]>();

    return super.findAll()
      .pipe(
        tap(all => {
          this.cache = all;
          this.cacheExpire = Date.now() + CACHE_LIFETIME;
          const updatingCache = this.updatingCache;
          this.updatingCache = null;

          if (updatingCache) {
            updatingCache.next(all);
            updatingCache.complete();
          }

          console.info(`Updated ${this.name} cache, loaded ${all.length} ${this.pluralName} with a lifetime of ${CACHE_LIFETIME_MIN} min.`);
        }),
        catchError(err => {
          this.cache = null;
          this.cacheExpire = 0;
          const updatingCache = this.updatingCache;
          this.updatingCache = null;

          if (updatingCache) {
            updatingCache.error(err);
            updatingCache.complete();
          }

          console.error(`Unable to load ${this.name} cache: `, err);
          return throwError(err);
        })
      );
  }
}
