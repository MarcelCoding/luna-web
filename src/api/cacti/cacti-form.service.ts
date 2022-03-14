import {Injectable} from '@angular/core';
import {UpdateCachedElement} from "../crud/crud-small-cached.service";
import {Form, FormWithoutId} from "./cacti.domain";
import {AbstractCachedCrudService} from "../crud/crud-cached.service";
import {HttpClient} from "@angular/common/http";
import {EndpointService} from "../endpoint/endpoint.service";
import {NotificationService} from "../../components/notification/notification.service";
import {filter, forkJoin, map, mergeMap, Observable} from "rxjs";
import {CactiSpecieService} from "./cacti-specie.service";

const API_MODULE = "cacti";
const NAME = "form";
const PLURAL_NAME = "forms";
const UPDATE_FUNC: UpdateCachedElement<Form, Form> = (c, f) => {
  c.name = f.name;
  c.specieId = f.specieId;
};

@Injectable({
  providedIn: 'root'
})
export class CactiFormService extends AbstractCachedCrudService<FormWithoutId, Form, string> {

  constructor(
    http: HttpClient,
    endpointService: EndpointService,
    private readonly notificationService: NotificationService,
    private readonly specieService: CactiSpecieService
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC);
  }

  protected cacheLoadFailed(error: any): void {
    this.notificationService.error("Formen konnten nicht geladen werden.");
  }

  public searchWithGenus(term: string, genusId: string): Observable<Form[]> {
    const term0 = term.toLowerCase().trim();

    const forms = this.findAll();

    return term0.length
      ? forms.pipe(mergeMap(forms =>
        forkJoin(forms.map(form =>
          this.specieService.get(form.specieId)
            .pipe(
              map(specie => specie.genusId === genusId && form.name.toLowerCase().includes(term0)),
              filter(d => d),
              map(() => form)
            )
        ))
      )) : forms;
  }

  public searchWithSpecie(term: string, specieId: string): Observable<Form[]> {
    const term0 = term.toLowerCase().trim();

    const forms = this.findAll();

    return term0.length
      ? forms.pipe(map(all => all.filter(ele => ele.specieId === specieId && ele.name.toLowerCase().includes(term0))))
      : forms;
  }
}
