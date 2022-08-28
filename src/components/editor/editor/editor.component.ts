import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
  Sanitizer,
  SecurityContext,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {EditorToolbarComponent} from "../editor-toolbar/editor-toolbar.component";
import {Overlay} from "@angular/cdk/overlay";
import {ComponentPortal} from "@angular/cdk/portal";
import {DomSanitizer} from "@angular/platform-browser";

type OnChangeFn = (_: any) => void;
type OnTouchedFn = () => void;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: EditorComponent}],
})
export class EditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() public label?: string;
  private toolbar: ComponentRef<EditorToolbarComponent> | null = null;

  @ViewChild('input')
  private input?: ElementRef<HTMLDivElement>;

  constructor(
    private readonly overlay: Overlay,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
    private readonly sanitizer: DomSanitizer,
  ) {
  }

  public ngOnDestroy(): void {
    this.hideToolbar();
  }

  @HostListener("window:mousedown", ['$event.target'])
  private hideToolbar(target?: EventTarget): void {
    // click was in toolbar
    if (this.toolbar?.location.nativeElement.contains(target)) {
      return;
    }

    this.toolbar?.destroy();
  }

  @HostListener("window:mouseup", ['$event.target'])
  protected showToolbar(target?: EventTarget): void {
    // check if disabled
    if (this.input?.nativeElement.contentEditable === "false") {
      return;
    }

    // click was in toolbar
    if (this.toolbar?.location.nativeElement.contains(target)) {
      return;
    }

    const selection = document.getSelection();
    if (!selection || !selection.toString() || !this.elementRef.nativeElement.contains(selection.focusNode)) {
      return;
    }

    const range = selection.getRangeAt(0).getBoundingClientRect();

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(range)
      .withPositions([{
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      }])
      .withPush(false);

    const ref = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    const toolbarPortal = new ComponentPortal(EditorToolbarComponent);

    this.hideToolbar();
    this.toolbar = ref.attach(toolbarPortal);
  }

  public ngAfterViewInit() {
    if (this.input) {
      if (this.missedValue) {
        this.input.nativeElement.innerHTML = this.missedValue;
      }
      if (this.missedDisabled) {
        this.renderer.setAttribute(this.input.nativeElement, "contentEditable", String(!this.missedDisabled));
      }
    }
  }

  private onChangeFn?: OnChangeFn;

  public registerOnChange(fn: OnChangeFn): void {
    this.onChangeFn = fn;
  }

  private onTouchedFn?: OnTouchedFn;

  public registerOnTouched(fn: OnTouchedFn): void {
    this.onTouchedFn = fn;
  }

  private missedValue?: string;

  public writeValue(obj: any): void {
    const safe = this.sanitizer.sanitize(SecurityContext.HTML, obj) ?? '';

    if (this.input) {
      this.input.nativeElement.innerHTML = safe;
    }
    else {
      this.missedValue = safe;
    }
  }

  private missedDisabled?: boolean;

  public setDisabledState(isDisabled: boolean): void {
    if (this.input) {
      this.renderer.setAttribute(this.input.nativeElement, "contentEditable", String(!this.missedDisabled));
    }
    else {
      this.missedDisabled = isDisabled;
    }
  }

  protected onBlur(): void {
    this.onTouchedFn?.();
  }

  protected onInput(event: Event): void {
    this.onChangeFn?.((event.target as HTMLDivElement).innerHTML)
  }
}

