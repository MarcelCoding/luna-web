import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CactiRoutingModule } from './cacti-routing.module';
import { CactiComponent } from './cacti.component';
import { CactiSelectionComponent } from './cacti-selection/cacti-selection.component';
import { CactiDatasheetComponent } from './cacti-datasheet/cacti-datasheet.component';
import { ComponentsModule } from '../../core/components/components.module';
import { CactiNothingSelectedComponent } from './cacti-nothing-selected/cacti-nothing-selected.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CactiComponent,
    CactiSelectionComponent,
    CactiDatasheetComponent,
    CactiNothingSelectedComponent
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
