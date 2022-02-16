import {TextareaAutoresizeDirective} from './textarea-autoresize.directive';
import {ElementRef} from "@angular/core";

describe('TextareaAutoresizeDirective', () => {
  it('should create an instance', () => {
    const textarea = document.createElement("textarea");
    const elementRef: ElementRef<HTMLTextAreaElement> = {nativeElement: textarea};

    const directive = new TextareaAutoresizeDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
