import { Directive, ElementRef, HostListener } from '@angular/core';
import { TextFieldComponent } from './text-field.component';

@Directive({
  selector: '[appTextFieldRef]'
})
export class TextFieldRefDirective {

  public field?: TextFieldComponent;

  constructor(
    private readonly ele: ElementRef<HTMLInputElement | HTMLTextAreaElement>
  ) {
  }

  get value(): string {
    return this.ele.nativeElement.value;
  }

  public focus(): void {
    this.ele.nativeElement.focus();
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent): boolean {
    if (event.key === 'Escape') {
      this.ele.nativeElement.blur();
      return true;
    }

    return !this.field ? true : this.field.onKeyDown(event);
  }

  @HostListener('focus')
  private onFocus(): void {
    this.field?.focusEvent.emit(true);
  }

  @HostListener('blur')
  private onBlur(): void {
    setTimeout(() => this.field?.focusEvent.emit(false), 250);
  }
}
