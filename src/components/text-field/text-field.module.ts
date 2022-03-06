import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFieldComponent} from './text-field.component';
import {TextareaAutoresizeDirective} from './textarea-autoresize.directive';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TextFieldComponent,
    TextareaAutoresizeDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TextFieldComponent,
    TextareaAutoresizeDirective
  ]
})
export class TextFieldModule {
}
