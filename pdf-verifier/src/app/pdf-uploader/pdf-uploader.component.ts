import { Component, ElementRef, OnInit } from '@angular/core';
import { utils } from 'ethers';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.scss']
})
export class PdfUploaderComponent implements OnInit {

  @ViewChild('fileChooser', { static: false })
  chooser: ElementRef;

  constructor() { }

  private file;
  private supported;
  public errorMessage;

  ngOnInit() {
    // @ts-ignore
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      this.supported = true;
    }
  }

  public upload() {
    if (!this.file) {
      this.errorMessage = 'Bitte wähle eine Datei aus';
    } else if (this.file.type !== 'application/pdf') {
      this.errorMessage = 'Dies ist kein gültiges Dateiformat';
    } else if (!this.supported) {
      this.errorMessage = 'Dein Browser unterstützt kein Dateiupload';
    } else {
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onloadend = (evt) => {
        // @ts-ignore
        if (evt.target.readyState === FileReader.DONE) {
          // @ts-ignore
          const decoded = utils.id(evt.target.result);
          console.log('Decoded: ' + decoded);
          this.resetFile();
        }
      };
    }
  }

  private resetFile() {
    this.chooser.nativeElement.value = '';
    this.file = undefined;
  }

  public fileChange($event: Event) {
    this.errorMessage = '';
    // @ts-ignore
    this.file = $event.target.files[0];
  }
}
