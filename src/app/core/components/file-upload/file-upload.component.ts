import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @ViewChild('fileInput')
  private input!: ElementRef<HTMLInputElement>;

  @Output()
  private files = new EventEmitter<FileList>();

  change(): void {
    if (this.input.nativeElement.files) {
      this.files.emit(this.input.nativeElement.files);
      this.input.nativeElement.files = null;
    }
  }
}
