import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CactiRoutingModule} from './cacti-routing.module';
import {CactiComponent} from './cacti.component';
import {CactiSelectionComponent} from './cacti-selection/cacti-selection.component';
import {ButtonModule} from "../../../components/button/button.module";
import {CactiEmptyComponent} from './cacti-empty/cacti-empty.component';
import {TreeViewModule} from "../../../components/tree-view/tree-view.module";
import {CactiNewCactusComponent} from './cacti-new-cactus/cacti-new-cactus.component';
import {CactiDatasheetComponent} from './cacti-datasheet/cacti-datasheet.component';
import {CactiCactusFormComponent} from './cacti-cactus-form/cacti-cactus-form.component';

@NgModule({
  declarations: [
    CactiComponent,
    CactiSelectionComponent,
    CactiEmptyComponent,
    CactiNewCactusComponent,
    CactiDatasheetComponent,
    CactiCactusFormComponent
  ],
  imports: [
    CommonModule,
    CactiRoutingModule,
    ButtonModule,
    TreeViewModule
  ]
})
export class CactiModule {
}
