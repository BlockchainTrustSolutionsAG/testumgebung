import { Component, ElementRef, OnInit } from '@angular/core';
import { utils} from 'ethers';
import { ViewChild } from '@angular/core';
import { PdfVerifierService } from '../services/pdf-verifier.service';

@Component({
  selector: 'app-pdf-uploader',
  templateUrl: './pdf-uploader.component.html',
  styleUrls: ['./pdf-uploader.component.scss'],
  providers: [PdfVerifierService]
})
export class PdfUploaderComponent implements OnInit {

  @ViewChild('fileChooser', { static: false })
  chooser: ElementRef;

  constructor(private verifierService: PdfVerifierService) { }

  private file;
  private supported;
  public infoMessage;
  public loading;

  ngOnInit() {
    // @ts-ignore
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      this.supported = true;
    }
  }

  public upload() {
    if (this.loading) {
      return;
    }
    if (!this.file) {
      this.infoMessage = 'Bitte wähle eine Datei aus';
    } else if (this.file.type !== 'application/pdf') {
      this.infoMessage = 'Dies ist kein gültiges Dateiformat';
    } else if (!this.supported) {
      this.infoMessage = 'Dein Browser unterstützt kein Dateiupload';
    } else {
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onloadend = async (evt) => {
        // @ts-ignore
        if (evt.target.readyState === FileReader.DONE) {
          // @ts-ignore
          const encoded = utils.id(evt.target.result);
          this.resetFile();
          this.infoMessage = 'Lädt...';
          this.loading = true;
          this.infoMessage = await this.verifierService.upload(encoded);
          this.loading = false;
        }
      };
    }
  }

  private resetFile() {
    this.chooser.nativeElement.value = '';
    this.file = undefined;
  }

  public fileChange($event: Event) {
    this.infoMessage = '';
    // @ts-ignore
    this.file = $event.target.files[0];
  }
}
