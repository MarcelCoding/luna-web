import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFieldComponent} from './text-field.component';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';

@NgModule({
  declarations: [TextFieldComponent, TextareaAutoresizeDirective],
  imports: [CommonModule],
  exports: [TextFieldComponent, TextareaAutoresizeDirective]
})
export class TextFieldModule {
}
