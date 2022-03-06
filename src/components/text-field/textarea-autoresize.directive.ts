import {Directive, ElementRef, HostListener, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]'
})
export class TextareaAutoresizeDirective implements OnInit {

  constructor(
    private readonly renderer: Renderer2,
    private readonly elementRef: ElementRef<HTMLTextAreaElement>
  ) {
  }

  public ngOnInit(): void {
    if (this.elementRef.nativeElement.scrollHeight) {
      setTimeout(() => this.resize());
    }
  }

  @HostListener('input')
  private onInput(): void {
    this.resize();
  }

  private resize(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', 0);
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${this.elementRef.nativeElement.scrollHeight}px`);
  }
}
