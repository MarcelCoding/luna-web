import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFieldComponent} from './text-field.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TextFieldModule as CdkTextFieldModule} from "@angular/cdk/text-field";

@NgModule({
  declarations: [
    TextFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTextFieldModule,
  ],
  exports: [
    TextFieldComponent
  ]
})
export class TextFieldModule {
}
