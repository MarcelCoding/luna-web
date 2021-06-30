import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector:
    '[contenteditable][formControlName],' +
    '[contenteditable][formControl],' +
    '[contenteditable][ngModel]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ContentEditableDirective),
    multi: true
  }]
})
export class ContentEditableDirective implements ControlValueAccessor {

  private onChange?: (value: string) => void;
  private onTouched?: () => void;

  public onSelect?: (event: MouseEvent | null, selected: boolean) => void;

  constructor(
    private readonly ele: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {
  }

  public get textValue(): string {
    return this.ele.nativeElement.innerText.trim();
  }

  public get htmlValue(): string {
    return this.ele.nativeElement.innerHTML;
  }

  public focus(): void {
    this.ele.nativeElement.focus();
  }

  public blur(): void {
    this.ele.nativeElement.blur();
  }

  writeValue(value: string): void {
    this.renderer.setProperty(
      this.ele.nativeElement,
      'innerHTML',
      value
    );
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.renderer.setAttribute(
      this.ele.nativeElement,
      'contenteditable',
      String(!disabled)
    );
  }

  @HostListener('input')
  private onInput(): void {
    if (this.onChange) {
      this.onChange(this.htmlValue);
    }
  }

  @HostListener('blur')
  private onBlur(): void {
    if (this.onTouched) {
      this.onTouched();
    }

    // if (this.onSelect) {
    //   this.onSelect(null, false);
    // }
  }

  @HostListener('window:mouseup', ['$event'])
  // @HostListener('mousedown')
  private onMouseUp(event: MouseEvent): void {
    setTimeout(() => {
      if (this.onSelect) {
        const selection = window.getSelection()?.toString();
        const content = this.ele.nativeElement.innerText;

        if (content && selection && content.includes(selection)) {
          this.onSelect(event, true);
        }
        else {
          this.onSelect(event, false);
        }
      }
    }, 10);
  }
}
