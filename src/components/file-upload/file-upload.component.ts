import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [ButtonComponent]
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
