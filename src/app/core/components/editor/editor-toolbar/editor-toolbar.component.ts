import { Component } from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss']
})
export class EditorToolbarComponent {

  public onClick?: () => void;
  public element?: HTMLElement;

  formatDoc(sCmd: string, sValue?: string) {
    // @ts-expect-error
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(sCmd, false, sValue);
  }

  sel(sCmd: string, event: Event) {
    // @ts-expect-error
    const target: HTMLSelectElement = event.target;

    this.formatDoc(sCmd, (target[target.selectedIndex] as HTMLOptionElement).value);
    target.selectedIndex = 0;
    this.click();
  }

  public checkType(type: string): boolean {
    if (!this.element) {
      return false;
    }

    return this.checkType0(this.element, type);
  }

  public checkStyle(key: string, value: string): boolean {
    if (!this.element) {
      return false;
    }

    return this.checkStyle0(this.element, key, value);
  }

  private checkType0(element: HTMLElement, type: string): boolean {
    const parent = element.parentElement;

    if (parent && parent.isContentEditable && this.checkType0(parent, type)) {
      return true;
    }

    return element.tagName === type;
  }

  private checkStyle0(element: HTMLElement, key: string, value: string): boolean {
    const parent = element.parentElement;

    if (parent && parent.isContentEditable && this.checkStyle0(parent, key, value)) {
      return true;
    }

    return element.style.getPropertyValue(key) === value;
  }

  private click(): void {
    if (this.onClick) {
      this.onClick();
    }
  }
}
