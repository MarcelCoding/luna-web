import {Directive, HostListener, Input} from '@angular/core';
import {TextFieldComponent} from "./text-field.component";

@Directive({
  selector: '[appAutocompleteOption]'
})
export class AutocompleteOptionDirective {

  @Input("appAutocompleteOption")
  public value?: string;
  public textField?: TextFieldComponent;

  @HostListener('click')
  private onClick(): void {
    if (!this.value) {
      throw new Error("AutocompleteOptionDirective is missing and value.");
    }

    this.textField?.selectOption(this, this.value);
  }
}
