import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EndpointService } from '../../core/data/endpoints/endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard implements CanActivate {

  constructor(
    private readonly endpointService: EndpointService,
    private readonly router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.endpointService.selected) {
      return true;
    }
    else {
      this.router.navigate(['/setup'], { queryParams: { to: state.url === '/' ? undefined : state.url.substring(1) } }).then();
      return false;
    }
  }
}
