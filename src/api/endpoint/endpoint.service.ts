import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor() {
  }

  public get current(): string {
    return '/api';
  }
}
