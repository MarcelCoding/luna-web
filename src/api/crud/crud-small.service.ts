import {CrudSmallService} from "./crud-small.service.interface";
import {HttpClient} from "@angular/common/http";
import {catchError, map, mergeMap, Observable, of, retry} from "rxjs";
import {IdHolder} from "../api.domain";
import {handleHttpError} from "../api.utils";

export abstract class AbstractSmallCrudService<D, DI extends IdHolder<I>, S extends IdHolder<I>, I> implements CrudSmallService<D, DI, S, I> {

  protected readonly pascalName: string;
  protected readonly pascalPluralName: string;

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly apiBase: () => string,
    protected readonly apiModule: string,
    protected readonly name: string,
    protected readonly pluralName: string
  ) {
    this.pascalName = AbstractSmallCrudService.toPascalCase(this.name);
    this.pascalPluralName = AbstractSmallCrudService.toPascalCase(pluralName);
  }

  private static toPascalCase(value: string): string {
    return value.split('-')
      .map(part => part[0].toUpperCase() + part.substring(1))
      .join('');
  }

  protected get fullApiPath(): string {
    return `${this.apiBase()}/${this.apiModule}/${this.name}`;
  }

  public findAll(): Observable<S[]> {
    return this.http.get<S[]>(`${this.fullApiPath}`)
      .pipe(retry(2), catchError(handleHttpError(`findAll${this.pascalPluralName}`)));
  }

  public search(term: string): Observable<S[]> {
    const term0 = term.toLowerCase().trim();

    const careGroups = this.findAll();

    return term0.length
      // @ts-ignore
      ? careGroups.pipe(map(all => all.filter(ele => ele.name.toLowerCase().includes(term0))))
      : careGroups;
  }

  public get(id: I): Observable<DI> {
    return this.http.get<DI>(`${this.fullApiPath}/${id}`)
      .pipe(retry(2), catchError(handleHttpError(`get${this.pascalName}`)));
  }

  public add(dto: D): Observable<DI> {
    return this.http.post<DI>(`${this.fullApiPath}`, dto)
      .pipe(catchError(handleHttpError(`add${this.pascalName}`)));
  }

  public set(id: I, dto: D): Observable<DI> {
    return this.http.put<DI>(`${this.fullApiPath}/${id}`, dto)
      .pipe(catchError(handleHttpError(`set${this.pascalName}`)));
  }

  public update(id: I, dto: D): Observable<DI> {
    return this.http.patch<DI>(`${this.fullApiPath}/${id}`, dto)
      .pipe(catchError(handleHttpError(`update${this.pascalName}`)));
  }

  public delete(id: I): Observable<void> {
    return this.http.delete(`${this.fullApiPath}/${id}`)
      .pipe(mergeMap(() => of(void 0)), catchError(handleHttpError(`delete${this.pascalName}`)));
  }
}
