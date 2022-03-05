import {IdHolder} from "../api.domain";
import {AbstractSmallCachedCrudService, UpdateCachedElement} from "./crud-small-cached.service";
import {HttpClient} from "@angular/common/http";
import {mergeMap, Observable, of, throwError} from "rxjs";

function identity<T>(ele: T): T {
  return ele;
}

export abstract class AbstractCachedCrudService<D, DI extends IdHolder<I>, I> extends AbstractSmallCachedCrudService<D, DI, DI, I> {

  protected constructor(
    http: HttpClient,
    apiBase: () => string,
    apiModule: string,
    name: string,
    pluralName: string,
    updateCachedElement: UpdateCachedElement<DI, DI>
  ) {
    super(http, apiBase, apiModule, name, pluralName, updateCachedElement, identity);
  }

  public override get(id: I): Observable<DI> {
    return super.findAll()
      .pipe(mergeMap(elements => {
        const genus = elements.find(ele => ele.id === id);
        return genus
          ? of(genus)
          : throwError(() => new Error(`${this.upperPluralName} with id ${id} not found`));
      }));
  }
}
