import {Component} from '@angular/core';

@Component({
  selector: 'app-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
})
export class EditorToolbarComponent {

  formatDoc(sCmd: string, sValue?: string) {
    // @ts-expect-error
    document.execCommand('styleWithCSS', false, false);
    document.execCommand(sCmd, false, sValue);
  }

  sel(sCmd: string, event: Event) {
    // @ts-expect-error
    const target: HTMLSelectElement = event.target;

    this.formatDoc(sCmd, (target[target.selectedIndex] as HTMLOptionElement).value);
    target.selectedIndex = 0;
  }
}
