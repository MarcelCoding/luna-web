import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileUploadComponent} from './file-upload.component';
import {ButtonModule} from "../button/button.module";

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  exports: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class FileUploadModule {
}
