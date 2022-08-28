import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";

export interface ComponentCanDeactivate {
  canDeactivate(): boolean;
}

@Injectable({
  providedIn: "root",
})
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  public canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivate()
      ? true
      : confirm("Du hast noch nicht gespeicherte Änderungen. Möchtest du dennoch diese Seite verlassen und die Änderungen verwerfen?");
  }
}
