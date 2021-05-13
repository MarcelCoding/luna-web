import { Component, ContentChild } from '@angular/core';
import { ContentEditableDirective } from './content-editable.directive';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {

  @ContentChild(ContentEditableDirective)
  private ele?: ContentEditableDirective;

  public get value(): string {
    return this.ele?.textValue || '';
  }

  public focus(): void {
    this.ele?.focus();
  }

  public blur(): void {
    this.ele?.blur();
  }
}
