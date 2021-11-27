import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewItemComponent } from './tree-view-item/tree-view-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldComponent } from './text-field/text-field.component';
import { TextFieldRefDirective } from './text-field/text-field-ref.directive';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { OptionComponent } from './option/option.component';
import { ErrorComponent } from './error/error.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { ButtonComponent } from './button/button.component';
import { IconDirective } from './icon.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AutosizeDirective } from './autosize.directive';
import { ContentEditableDirective } from './editor/content-editable.directive';
import { EditorComponent } from './editor/editor.component';
import { EditorToolbarComponent } from './editor/editor-toolbar/editor-toolbar.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { TextFieldCompactComponent } from './text-field/text-field.compact.component';

@NgModule({
  declarations: [
    TreeViewItemComponent,
    TextFieldComponent,
    TextFieldCompactComponent,
    TextFieldRefDirective,
    AutocompleteComponent,
    OptionComponent,
    ErrorComponent,
    FormGroupComponent,
    ButtonComponent,
    IconDirective,
    FileUploadComponent,
    AutosizeDirective,
    ContentEditableDirective,
    EditorComponent,
    EditorToolbarComponent
  ],
  exports: [
    TreeViewItemComponent,
    TextFieldComponent,
    TextFieldCompactComponent,
    TextFieldRefDirective,
    AutocompleteComponent,
    OptionComponent,
    ErrorComponent,
    FormGroupComponent,
    ButtonComponent,
    IconDirective,
    FileUploadComponent,
    AutosizeDirective,
    ContentEditableDirective,
    EditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverlayModule
  ]
})
export class ComponentsModule {
}
