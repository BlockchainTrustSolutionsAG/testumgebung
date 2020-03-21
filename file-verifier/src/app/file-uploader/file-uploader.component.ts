import { Component, ElementRef, OnInit } from '@angular/core';
import { utils} from 'ethers';
import { ViewChild } from '@angular/core';
import { FileVerifierService } from '../services/file-verifier.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [FileVerifierService]
})
export class FileUploaderComponent implements OnInit {

  @ViewChild('fileChooser', { static: false })
  chooser: ElementRef;

  constructor(private verifierService: FileVerifierService) { }

  private file;
  private supported;
  public infoMessage;
  public loading;
  public name;

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
    } else if (!this.supported) {
      this.infoMessage = 'Dein Browser unterstützt kein Dateiupload';
    } else if (!this.name) {
      this.infoMessage = 'Bitte gib deinen Namen an';
    } else {
      const fileReader = new FileReader();
      fileReader.readAsText(this.file);
      fileReader.onloadend = async (evt) => {
        // @ts-ignore
        if (evt.target.readyState === FileReader.DONE) {
          // @ts-ignore
          const encoded = utils.id(evt.target.result);
          const encodedName = utils.id(this.name);
          this.resetFile();
          this.infoMessage = 'Lädt...';
          this.loading = true;
          this.infoMessage = await this.verifierService.upload(encoded, encodedName);
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
