import {Injectable} from '@angular/core';
import {AbstractCachedCrudService} from "../crud/crud-cached.service";
import {Genus, GenusWithoutId} from "./cacti.domain";
import {HttpClient} from "@angular/common/http";
import {EndpointService} from "../endpoint/endpoint.service";
import {Compare, UpdateCachedElement} from "../crud/crud-small-cached.service";
import {NotificationService} from "../../components/notification/notification.service";

const API_MODULE = "cacti";
const NAME = "genus";
const PLURAL_NAME = "genre";
const UPDATE_FUNC: UpdateCachedElement<Genus, Genus> = (c, f) => c.name = f.name;
const COMPARE_FUNC: Compare<Genus> = (a, b) => a.name.localeCompare(b.name);

@Injectable({
  providedIn: 'root'
})
export class CactiGenusService extends AbstractCachedCrudService<GenusWithoutId, Genus, string> {

  constructor(
    http: HttpClient,
    endpointService: EndpointService,
    private readonly notificationService: NotificationService
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC, COMPARE_FUNC);
  }

  protected cacheLoadFailed(error: any): void {
    this.notificationService.error("Gattungen konnten nicht geladen werden.");
  }
}
