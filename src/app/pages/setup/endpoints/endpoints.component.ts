import { Component, OnDestroy, OnInit } from '@angular/core';
import { EndpointService } from '../../../core/data/endpoints/endpoint.service';
import { Endpoint } from '../../../core/data/endpoints/endpoints.domain';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss']
})
export class EndpointsComponent implements OnInit, OnDestroy {

  private to?: string;
  private paramsSubscription?: Subscription;

  constructor(
    private readonly endpointService: EndpointService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  get endpoints(): Endpoint[] {
    return this.endpointService.endpoints;
  }

  ngOnInit(): void {
    this.endpointService.load();
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => this.to = params.to);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  public trackBy(index: number, { url }: Endpoint): string {
    return url;
  }

  public use(endpoint: Endpoint, url: string): void {
    if (endpoint.url !== url) {
      endpoint.url = url;
      this.endpointService.save();
    }

    this.endpointService.selected = url;
    this.router.navigate([this.to || '/']).then();
  }

  public add(url: string) {
    this.use(this.endpointService.addEndpoint({ url }), url);
  }
}
