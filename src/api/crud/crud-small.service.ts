import {CrudSmallService} from "./crud-small.service.interface";
import {HttpClient} from "@angular/common/http";
import {catchError, mergeMap, Observable, of, retry} from "rxjs";
import {IdHolder} from "../api.domain";
import {handleHttpError} from "../api.utils";

export abstract class AbstractSmallCrudService<D, DI extends IdHolder<I>, S extends IdHolder<I>, I> implements CrudSmallService<D, DI, S, I> {

  protected readonly upperName: string;
  protected readonly upperPluralName: string;

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly apiBase: () => string,
    protected readonly apiModule: string,
    protected readonly name: string,
    protected readonly pluralName: string
  ) {
    this.upperName = this.name[0].toUpperCase() + this.name.substring(1);
    this.upperPluralName = name[0].toUpperCase() + pluralName.substring(1);
  }

  protected get fullApiPath(): string {
    return `${this.apiBase()}/${this.apiModule}/${this.name}`;
  }

  public findAll(): Observable<S[]> {
    return this.http.get<S[]>(`${this.fullApiPath}`)
      .pipe(retry(2), catchError(handleHttpError(`findAll${this.upperName}`)));
  }

  public get(id: I): Observable<DI> {
    return this.http.get<DI>(`${this.fullApiPath}/${id}`)
      .pipe(retry(2), catchError(handleHttpError(`get${this.upperName}`)));
  }

  public add(dto: D): Observable<DI> {
    return this.http.post<DI>(`${this.fullApiPath}`, dto)
      .pipe(catchError(handleHttpError(`add${this.upperName}`)));
  }

  public set(id: I, dto: D): Observable<DI> {
    return this.http.put<DI>(`${this.fullApiPath}/${id}`, dto)
      .pipe(catchError(handleHttpError(`set${this.upperName}`)));
  }

  public update(id: I, dto: D): Observable<DI> {
    return this.http.patch<DI>(`${this.fullApiPath}/${id}`, dto)
      .pipe(catchError(handleHttpError(`update${this.upperName}`)));
  }

  public delete(id: I): Observable<void> {
    return this.http.delete(`${this.fullApiPath}/${id}`)
      .pipe(mergeMap(() => of(void 0)), catchError(handleHttpError(`delete${this.upperName}`)));
  }
}
