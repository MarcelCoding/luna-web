import {Injectable} from "@angular/core";
import {Compare, UpdateCachedElement} from "../crud/crud-small-cached.service";
import {Form, FormWithoutId} from "./cacti.domain";
import {AbstractCachedCrudService} from "../crud/crud-cached.service";
import {HttpClient} from "@angular/common/http";
import {EndpointService} from "../endpoint/endpoint.service";
import {NotificationService} from "../../components/notification/notification.service";
import {filter, forkJoin, map, mergeMap, Observable, of} from "rxjs";
import {CactiSpecieService} from "./cacti-specie.service";

const API_MODULE = "cacti";
const NAME = "form";
const PLURAL_NAME = "forms";
const UPDATE_FUNC: UpdateCachedElement<Form, Form> = (c, f) => {
  c.name = f.name;
  c.specieId = f.specieId;
};
const COMPARE_FUNC: Compare<Form> = (a, b) => a.name.localeCompare(b.name);

@Injectable({
  providedIn: "root",
})
export class CactiFormService extends AbstractCachedCrudService<FormWithoutId, Form, string> {

  constructor(
    http: HttpClient,
    endpointService: EndpointService,
    private readonly notificationService: NotificationService,
    private readonly specieService: CactiSpecieService,
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC, COMPARE_FUNC);
  }

  public searchWithGenus(term: string, genusId: string): Observable<Form[]> {
    const term0 = term.toLowerCase().trim();

    return term0.length
      ? this.findAll()
        .pipe(mergeMap(forms =>
          forkJoin(forms.map(form =>
            this.specieService.get(form.specieId)
              .pipe(
                map(specie => specie.genusId === genusId && form.name.toLowerCase().includes(term0)),
                filter(d => d),
                map(() => form),
              ),
          )),
        ))
      : of([]);
  }

  public searchWithSpecie(term: string, specieId: string): Observable<Form[]> {
    const term0 = term.toLowerCase().trim();

    return term0.length
      ? this.findAll().pipe(map(all => all.filter(ele => ele.specieId === specieId && ele.name.toLowerCase().includes(term0))))
      : of([]);
  }

  protected cacheLoadFailed(error: any): void {
    this.notificationService.error("Formen konnten nicht geladen werden.");
  }
}
