import {Observable} from "rxjs";
import {IdHolder} from "../api.domain";

export interface CrudSmallService<D, DI extends IdHolder<I>, S extends IdHolder<I>, I> {

  findAll(): Observable<S[]>;

  get(id: I): Observable<DI>;

  add(dto: D): Observable<DI>;

  set(id: I, dto: D): Observable<DI>;

  update(id: I, dto: D): Observable<DI>;

  delete(id: I): Observable<void>;
}
