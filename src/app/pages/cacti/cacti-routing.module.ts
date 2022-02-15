import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CactiComponent} from './cacti.component';
import {CactiEmptyComponent} from "./cacti-empty/cacti-empty.component";

const routes: Routes = [{
  path: '', component: CactiComponent, children: [
    {path: '', component: CactiEmptyComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CactiRoutingModule {
}
