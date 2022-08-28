import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CactiRoutingModule} from "./cacti-routing.module";
import {CactiComponent} from "./cacti.component";
import {CactiSelectionComponent} from "./cacti-selection/cacti-selection.component";
import {CactiEmptyComponent} from "./cacti-empty/cacti-empty.component";
import {TreeViewModule} from "../../../components/tree-view/tree-view.module";
import {CactiNewCactusComponent} from "./cacti-new-cactus/cacti-new-cactus.component";
import {CactiDatasheetComponent} from "./cacti-datasheet/cacti-datasheet.component";
import {CactiCactusFormComponent} from "./cacti-cactus-form/cacti-cactus-form.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CactiCactusNotFoundComponent} from "./cacti-cactus-not-found/cacti-cactus-not-found.component";
import {CactiHistoryComponent} from "./cacti-history/cacti-history.component";
import {CactiHistoryEntryComponent} from "./cacti-history-entry/cacti-history-entry.component";
import {TextFieldComponent} from "../../../components/text-field/text-field.component";
import {FileUploadComponent} from "../../../components/file-upload/file-upload.component";
import {ErrorComponent} from "../../../components/error/error.component";
import {ButtonComponent} from "../../../components/button/button.component";
import {EditorModule} from "../../../components/editor/editor.module";

@NgModule({
  declarations: [
    CactiComponent,
    CactiSelectionComponent,
    CactiEmptyComponent,
    CactiCactusFormComponent,
    CactiNewCactusComponent,
    CactiDatasheetComponent,
    CactiCactusNotFoundComponent,
    CactiHistoryComponent,
    CactiHistoryEntryComponent,
  ],
  imports: [
    CommonModule,
    CactiRoutingModule,
    ButtonComponent,
    TreeViewModule,
    TextFieldComponent,
    ErrorComponent,
    ReactiveFormsModule,
    FileUploadComponent,
    EditorModule,
  ],
})
export class CactiModule {
}
