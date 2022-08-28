import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditorToolbarComponent} from './editor-toolbar/editor-toolbar.component';
import {OverlayModule} from "@angular/cdk/overlay";
import {EditorComponent} from './editor/editor.component';

@NgModule({
  declarations: [
    EditorComponent,
    EditorToolbarComponent,
    EditorComponent
  ],
  imports: [CommonModule, OverlayModule],
  exports: [EditorComponent]
})
export class EditorModule {
}
