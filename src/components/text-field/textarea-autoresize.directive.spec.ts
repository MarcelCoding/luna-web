import {TextareaAutoresizeDirective} from './textarea-autoresize.directive';
import {ElementRef, Renderer2} from "@angular/core";

describe('TextareaAutoresizeDirective', () => {
  it('should create an instance', () => {
    const textarea = document.createElement("textarea");
    const elementRef: ElementRef<HTMLTextAreaElement> = {nativeElement: textarea};

    const renderer2 = jasmine.createSpyObj<Renderer2>('Renderer2', ['setStyle']);

    const directive = new TextareaAutoresizeDirective(renderer2, elementRef);
    expect(directive).toBeTruthy();
  });
});
