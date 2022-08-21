import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CareGroup, Specie} from "./cacti.domain";
import {EndpointService} from "../endpoint/endpoint.service";
import {NotificationService} from "../../components/notification/notification.service";
import {AbstractCachedCrudService} from "../crud/crud-cached.service";
import {Compare, UpdateCachedElement} from "../crud/crud-small-cached.service";
import {Observable} from "rxjs";

const API_MODULE = "cacti";
const NAME = "care-group";
const PLURAL_NAME = "care-groups";
const UPDATE_FUNC: UpdateCachedElement<CareGroup, CareGroup> = (a, b) => void 0;
const COMPARE_FUNC: Compare<CareGroup> = (a, b) => a.id.localeCompare(b.id);

@Injectable({
  providedIn: 'root'
})
export class CactiCareGroupService extends AbstractCachedCrudService<void, CareGroup, string> {

  constructor(
    http: HttpClient,
    endpointService: EndpointService,
    private readonly notificationService: NotificationService
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC, COMPARE_FUNC);
  }

  override add(dto: void): Observable<CareGroup> {
    throw new Error("Unsupported operation");
  }

  override set(id: string, dto: void): Observable<CareGroup> {
    throw new Error("Unsupported operation");
  }

  override update(id: string, dto: void): Observable<CareGroup> {
    throw new Error("Unsupported operation");
  }

  override delete(id: string): Observable<void> {
    throw new Error("Unsupported operation");
  }

  protected cacheLoadFailed(error: any): void {
    this.notificationService.error("Pflegegruppen konnten nicht geladen werden.");
  }
}
