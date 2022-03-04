import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor() {
  }

  public current(): string {
    return '/api';
  }
}
