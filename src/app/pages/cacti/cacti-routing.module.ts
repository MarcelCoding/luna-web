import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CactiComponent } from './cacti.component';
import { CactiDatasheetComponent } from './cacti-datasheet/cacti-datasheet.component';
import { CactiNothingSelectedComponent } from './cacti-nothing-selected/cacti-nothing-selected.component';
import { PendingChangesGuard } from '../../core/pending-changes.guard';
import { CactiDatasheetCompactComponent } from './cacti-datasheet-compact/cacti-datasheet.compact.component';

const routes: Routes = [
  {
    path: '',
    component: CactiComponent,
    children: [
      { path: '', component: CactiNothingSelectedComponent },
      { path: ':cactusId', component: CactiDatasheetComponent, canDeactivate: [PendingChangesGuard] },
      { path: ':cactusId/compact', component: CactiDatasheetCompactComponent, canDeactivate: [PendingChangesGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CactiRoutingModule {
}
