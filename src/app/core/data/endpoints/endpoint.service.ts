import { Injectable } from '@angular/core';
import { Endpoint } from './endpoints.domain';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  private selected0?: string;
  private endpoints0?: Endpoint[];

  public get endpoints(): Endpoint[] {
    return this.endpoints0 || this.load();
  }

  public get selected(): string | undefined {
    // @ts-expect-error
    return window.endpoint || this.selected0 || (this.selected0 = localStorage.getItem('endpoint') || undefined);
  }

  public set selected(endpoint: string | undefined) {
    if (endpoint) {
      localStorage.setItem('endpoint', endpoint);
    }
    else {
      localStorage.removeItem('endpoint');
    }

    this.selected;
  }

  public addEndpoint(endpoint: Endpoint): Endpoint {
    this.endpoints.push(endpoint);
    this.save();
    return endpoint;
  }

  public removeEndpoint(url: string) {
    this.endpoints0 = this.endpoints.filter(endpoint => endpoint.url === url);
    this.save();
  }

  /* -- internal methods --  */

  public load(): Endpoint[] {
    const data = localStorage.getItem('endpoints');
    const endpoints: Endpoint[] = data ? JSON.parse(data) : [];

    if (!endpoints.find(endpoint => endpoint.url === 'https://luna.m4rc3l.de/api')) {
      endpoints.push({ url: 'https://luna.m4rc3l.de/api' });
    }

    return this.endpoints0 = endpoints;
  }

  public save(): void {
    if (!this.endpoints0?.length) {
      localStorage.removeItem('endpoints');
    }
    else {
      localStorage.setItem('endpoints', JSON.stringify(this.endpoints0));
    }
  }
}
