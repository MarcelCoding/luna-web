import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appTextareaAutoresize]'
})
export class TextareaAutoresizeDirective implements OnInit {

  constructor(
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
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height = `${this.elementRef.nativeElement.scrollHeight}px`;
  }
}
