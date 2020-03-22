import { Component, OnInit, ViewChild } from '@angular/core';
import { utils } from 'ethers';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { FileValidatorService } from '../../services/file-validator.service';

@Component({
  selector: 'app-file-upload-page',
  templateUrl: './file-upload-page.component.html',
  styleUrls: ['./file-upload-page.component.scss']
})
export class FileUploadPageComponent implements OnInit {

  @ViewChild('fileInputComponent', { static: false })
  chooser: FileInputComponent;

  public uploadFile = 'Datei hochladen';
  public infoMessage: string;

  constructor(private validatorService: FileValidatorService) { }

  ngOnInit() {
  }

  public upload() {
    if (this.validatorService.loading) {
      return;
    }
    if (!this.chooser.file) {
      this.infoMessage = 'Bitte wähle eine Datei aus';
    } else if (!this.chooser.supported) {
      this.infoMessage = 'Dein Browser unterstützt kein Dateiupload';
    } else if (!this.chooser.name) {
      this.infoMessage = 'Bitte gib deinen Namen an';
    } else {
      this.validatorService.loading = true;
      this.infoMessage = 'Lädt...';
      const fileReader = new FileReader();
      fileReader.readAsText(this.chooser.file);
      fileReader.onloadend = async (evt) => {
        // @ts-ignore
        if (evt.target.readyState === FileReader.DONE) {
          // @ts-ignore
          const encoded = utils.id(evt.target.result);
          const encodedName = utils.id(this.chooser.name);
          this.infoMessage = await this.validatorService.upload(encoded, encodedName);
          this.chooser.resetFile();
        } else {
          this.infoMessage = 'Fehler beim Lesen der Datei';
        }
        this.validatorService.loading = false;
      };
    }
  }
}
