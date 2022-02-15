import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CactiComponent} from './cacti.component';
import {CactiEmptyComponent} from "./cacti-empty/cacti-empty.component";
import {CactiNewCactusComponent} from "./cacti-new-cactus/cacti-new-cactus.component";
import {CactiDatasheetComponent} from "./cacti-datasheet/cacti-datasheet.component";

const routes: Routes = [{
  path: '', component: CactiComponent, children: [
    {path: '', component: CactiEmptyComponent},
    {path: 'new', component: CactiNewCactusComponent},
    {path: ':id', component: CactiDatasheetComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CactiRoutingModule {
}
