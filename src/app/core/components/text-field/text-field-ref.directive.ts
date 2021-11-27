import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { TextFieldBaseComponent } from './text-field.base.component';

@Directive({
  selector: '[appTextFieldRef]'
})
export class TextFieldRefDirective {

  public field?: TextFieldBaseComponent;

  constructor(
    private readonly ele: ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | HTMLElement>,
    @Optional() private readonly host?: EditorComponent
  ) {
  }

  get value(): string {
    // @ts-expect-error
    return this.host ? this.host.value : this.ele.nativeElement.value;
  }

  public focus(): void {
    (this.host || this.ele.nativeElement).focus();
  }

  @HostListener('keydown', ['$event'])
  private onKeyDown(event: KeyboardEvent): boolean {
    if (event.key === 'Escape') {
      (this.host || this.ele.nativeElement).blur();
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

  @HostListener('change')
  private onChange(): void {
    if (this.ele.nativeElement.nodeName === 'SELECT') {
      setTimeout(() => this.ele.nativeElement.blur(), 0);
    }
  }
}
