import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: "", loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)},
  {path: "home", pathMatch: "full", redirectTo: ""},
  {path: "cacti", loadChildren: () => import("./pages/cacti/cacti.module").then(m => m.CactiModule)},
  {path: "**", loadComponent: () => import("./pages/not-found/not-found.component").then(m => m.NotFoundComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
