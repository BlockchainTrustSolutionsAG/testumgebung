import { Component, OnInit, ViewChild } from '@angular/core';
import { utils } from 'ethers';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { FileVerifierService } from '../../services/file-verifier.service';

@Component({
  selector: 'app-file-upload-page',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.scss']
})
export class FileUploadPageComponent implements OnInit {

  @ViewChild('fileInputComponent', { static: false })
  chooser: FileInputComponent;

  public uploadFile = 'Datei hochladen';
  public loading: boolean;
  public infoMessage: string;

  constructor(private verifierService: FileVerifierService) { }

  ngOnInit() {
  }

  public upload() {
    if (this.loading) {
      return;
    }
    if (!this.chooser.file) {
      this.infoMessage = 'Bitte wähle eine Datei aus';
    } else if (!this.chooser.supported) {
      this.infoMessage = 'Dein Browser unterstützt kein Dateiupload';
    } else if (!this.chooser.name) {
      this.infoMessage = 'Bitte gib deinen Namen an';
    } else {
      const fileReader = new FileReader();
      fileReader.readAsText(this.chooser.file);
      fileReader.onloadend = async (evt) => {
        // @ts-ignore
        if (evt.target.readyState === FileReader.DONE) {
          // @ts-ignore
          const encoded = utils.id(evt.target.result);
          const encodedName = utils.id(this.chooser.name);
          this.chooser.resetFile();
          this.infoMessage = 'Lädt...';
          this.loading = true;
          this.infoMessage = await this.verifierService.upload(encoded, encodedName);
          this.loading = false;
        }
      };
    }
  }
}
