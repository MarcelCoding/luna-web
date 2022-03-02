import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TextFieldComponent} from './text-field.component';
import { TextareaAutoresizeDirective } from './textarea-autoresize.directive';
import { AutocompleteOptionDirective } from './autocomplete-option.directive';

@NgModule({
  declarations: [TextFieldComponent, TextareaAutoresizeDirective, AutocompleteOptionDirective],
  imports: [CommonModule],
  exports: [TextFieldComponent, TextareaAutoresizeDirective, AutocompleteOptionDirective]
})
export class TextFieldModule {
}
