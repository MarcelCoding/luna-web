import { AfterContentInit, Component, ContentChild } from '@angular/core';
import { ContentEditableDirective } from './content-editable.directive';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';
import { OverlayReference } from '@angular/cdk/overlay/overlay-reference';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterContentInit {

  @ContentChild(ContentEditableDirective)
  private ele?: ContentEditableDirective;

  private overlayRef?: OverlayRef;

  constructor(
    private readonly overlay: Overlay
  ) {
  }

  ngAfterContentInit(): void {
    if (!this.ele) {
      return;
    }

    this.ele.onSelect = (event, selected) => {
      if (!selected) {
        this.overlayRef?.detach();
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
        return;
      }

      if (this.overlayRef) {
        return;
      }

      // Find out how much (if any) user has scrolled
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      // Get cursor position
      const posX = event!.clientX - 110;
      const posY = event!.clientY + 20 + scrollTop;

      console.log(posX, posY);

      this.overlayRef = this.overlay.create({
        disposeOnNavigation: true,
        positionStrategy: new FixedPositionStrategy(posX, posY)
      });
      this.overlayRef.attach(new ComponentPortal(EditorToolbarComponent)).instance.onClick = () => {
        setTimeout(() => this.focus(), 10);
      };
    };
  }

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

class FixedPositionStrategy implements PositionStrategy {

  private overlayRef?: OverlayReference;
  private oldX?: string;
  private oldY?: string;

  constructor(
    private readonly x: number,
    private readonly y: number
  ) {
  }

  apply(): void {
    if (!this.overlayRef) {
      return;
    }

    this.oldX = this.overlayRef.overlayElement.style.left;
    this.oldY = this.overlayRef.overlayElement.style.top;

    this.overlayRef.overlayElement.style.left = `${this.x}px`;
    this.overlayRef.overlayElement.style.top = `${this.y}px`;
  }

  attach(overlayRef: OverlayReference): void {
    this.overlayRef = overlayRef;
  }

  dispose(): void {
    if (!this.overlayRef) {
      return;
    }

    if (this.oldX) {
      this.overlayRef.overlayElement.style.left = this.oldX;
    }
    if (this.oldY) {
      this.overlayRef.overlayElement.style.top = this.oldY;
    }
  }
}
