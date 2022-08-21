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
import {TextFieldModule} from "../../../components/text-field/text-field.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FileUploadModule} from "../../../components/file-upload/file-upload.module";
import {ErrorModule} from "../../../components/error/error.module";
import { CactiCactusNotFoundComponent } from './cacti-cactus-not-found/cacti-cactus-not-found.component';

@NgModule({
  declarations: [
    CactiComponent,
    CactiSelectionComponent,
    CactiEmptyComponent,
    CactiCactusFormComponent,
    CactiNewCactusComponent,
    CactiDatasheetComponent,
    CactiCactusNotFoundComponent
  ],
  imports: [
    CommonModule,
    CactiRoutingModule,
    ButtonModule,
    TreeViewModule,
    TextFieldModule,
    ErrorModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class CactiModule {
}
