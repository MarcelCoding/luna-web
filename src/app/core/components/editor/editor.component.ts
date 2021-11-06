import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { ContentEditableDirective } from './content-editable.directive';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterContentInit {

  @ContentChild(ContentEditableDirective)
  private ele?: ContentEditableDirective;

  private overlayRef?: OverlayRef;
  private instance?: EditorToolbarComponent;

  constructor(
    private readonly overlay: Overlay
  ) {
  }

  public get value(): string {
    return this.ele?.textValue || '';
  }

  ngAfterContentInit(): void {
    if (!this.ele) {
      return;
    }

    this.ele.onSelect = (event, selected, element) => {
      if (!selected) {
        this.overlayRef?.detach();
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
        return;
      }

      if (this.overlayRef) {
        if (this.instance) this.instance.element = element;
        return;
      }

      // Find out how much (if any) user has scrolled
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // Get cursor position
      const posX = event!.clientX - 110;
      const posY = event!.clientY + 20 + scrollTop;

      const position = this.overlay.position()
        .global()
        .left(`${posX}px`)
        .top(`${posY}px`);

      this.overlayRef = this.overlay.create({
        disposeOnNavigation: true,
        positionStrategy: position
      });
      this.instance = this.overlayRef.attach(new ComponentPortal(EditorToolbarComponent)).instance;
      this.instance.element = element;
      this.instance.onClick = () => {
        setTimeout(() => this.focus(), 10);
      };
    };
  }

  public focus(): void {
    this.ele?.focus();
  }

  public blur(): void {
    this.ele?.blur();
  }
}
