import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CactiRoutingModule } from './cacti-routing.module';
import { CactiComponent } from './cacti.component';
import { CactiSelectionComponent } from './cacti-selection/cacti-selection.component';
import { CactiDatasheetComponent } from './cacti-datasheet/cacti-datasheet.component';
import { ComponentsModule } from '../../core/components/components.module';
import { CactiNothingSelectedComponent } from './cacti-nothing-selected/cacti-nothing-selected.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CactiHistoryEntryComponent } from './cacti-history-entry/cacti-history-entry.component';
import { CactiDatasheetCompactComponent } from './cacti-datasheet-compact/cacti-datasheet.compact.component';

@NgModule({
  declarations: [
    CactiComponent,
    CactiSelectionComponent,
    CactiDatasheetComponent,
    CactiDatasheetCompactComponent,
    CactiNothingSelectedComponent,
    CactiHistoryEntryComponent
  ],
  imports: [
    CommonModule,
    CactiRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ]
})
export class CactiModule {
}
