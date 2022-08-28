import {Injectable} from "@angular/core";
import {Compare, UpdateCachedElement} from "../crud/crud-small-cached.service";
import {Specie, SpecieWithoutId} from "./cacti.domain";
import {AbstractCachedCrudService} from "../crud/crud-cached.service";
import {HttpClient} from "@angular/common/http";
import {EndpointService} from "../endpoint/endpoint.service";
import {NotificationService} from "../../components/notification/notification.service";
import {map, Observable} from "rxjs";

const API_MODULE = "cacti";
const NAME = "specie";
const PLURAL_NAME = "species";
const UPDATE_FUNC: UpdateCachedElement<Specie, Specie> = (c, f) => {
  c.name = f.name;
  c.genusId = f.genusId;
};
const COMPARE_FUNC: Compare<Specie> = (a, b) => a.name.localeCompare(b.name);

@Injectable({
  providedIn: "root",
})
export class CactiSpecieService extends AbstractCachedCrudService<SpecieWithoutId, Specie, string> {

  constructor(
    http: HttpClient,
    endpointService: EndpointService,
    private readonly notificationService: NotificationService,
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC, COMPARE_FUNC);
  }

  public searchWithGenus(term: string, genusId: string): Observable<Specie[]> {
    const term0 = term.toLowerCase().trim();

    const species = this.findAll();

    return term0.length
      ? species.pipe(map(all => all.filter(ele => ele.genusId === genusId && ele.name.toLowerCase().includes(term0))))
      : species;
  }

  protected cacheLoadFailed(error: any): void {
    this.notificationService.error("Arten konnten nicht geladen werden.");
  }
}
