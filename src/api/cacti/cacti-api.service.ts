import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {CactusHistoryEntry} from "./cacti.domain";
import {handleHttpError} from "../api.utils";
import {EndpointService} from "../endpoint/endpoint.service";

@Injectable({
  providedIn: 'root'
})
export class CactiApiService {

  constructor(
    private readonly endpointService: EndpointService,
    private readonly http: HttpClient
  ) {
  }

  private get endpoint(): string {
    return this.endpointService.current();
  }

}
