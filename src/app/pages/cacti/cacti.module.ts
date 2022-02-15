import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CactiRoutingModule} from './cacti-routing.module';
import {CactiComponent} from './cacti.component';
import {CactiSelectionComponent} from './cacti-selection/cacti-selection.component';
import {ButtonModule} from "../../../components/button/button.module";
import {CactiEmptyComponent} from './cacti-empty/cacti-empty.component';

@NgModule({
  declarations: [
    CactiComponent,
    CactiSelectionComponent,
    CactiEmptyComponent
  ],
  imports: [
    CommonModule,
    CactiRoutingModule,
    ButtonModule
  ]
})
export class CactiModule {
}
