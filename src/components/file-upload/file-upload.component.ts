import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Input() public label?: string;
  @Output() private files = new EventEmitter<FileList>();

  @ViewChild('fileInput')
  private input!: ElementRef<HTMLInputElement>;

  public change(): void {
    if (this.input.nativeElement.files) {
      this.files.emit(this.input.nativeElement.files);
      this.input.nativeElement.files = null;
    }
  }

  public upload(): void {
    this.input.nativeElement.click();
  }
}
