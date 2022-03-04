import {Injectable} from '@angular/core';
import {UpdateCachedElement} from "../crud/crud-small-cached.service";
import {Form, FormWithoutId} from "./cacti.domain";
import {AbstractCachedCrudService} from "../crud/crud-cached.service";
import {HttpClient} from "@angular/common/http";
import {EndpointService} from "../endpoint/endpoint.service";

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
    endpointService: EndpointService
  ) {
    super(http, endpointService.current, API_MODULE, NAME, PLURAL_NAME, UPDATE_FUNC);
  }
}
