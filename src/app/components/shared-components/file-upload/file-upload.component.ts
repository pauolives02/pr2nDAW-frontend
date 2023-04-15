import { Component, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {
  
  private file: File | null = null
  onChange: Function
  fileName: string = ''

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0)
    this.onChange(file)
    this.file = file
    this.file ? this.fileName = file.name : this.fileName = ''
  }

  constructor(
    private host: ElementRef<HTMLInputElement>
  ) {}

  writeValue(value: null) {
    this.host.nativeElement.value = ''
    this.file = null
    this.fileName = ''
  }

  registerOnChange(fn: Function) {
    this.onChange = fn
  }

  registerOnTouched(fn: Function) {

  }
}
