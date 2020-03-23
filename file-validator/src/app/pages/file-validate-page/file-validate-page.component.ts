import { Component, OnInit, ViewChild } from '@angular/core';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { utils } from 'ethers';
import { FileValidatorService } from '../../services/file-validator.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-file-validate-page',
  templateUrl: './file-validate-page.component.html',
  styleUrls: ['./file-validate-page.component.scss']
})
export class FileValidatePageComponent implements OnInit {

  @ViewChild('fileInputComponent', { static: false })
  chooser: FileInputComponent;

  public validationPanel: boolean;
  public validateFile = 'Datei validieren';
  public infoMessage: string;
  public result;
  public valid: boolean;

  constructor(public validatorService: FileValidatorService) { }

  ngOnInit() {
  }

  public validate() {
    if (this.validatorService.loading) {
      return;
    }
    if (!this.chooser.file) {
      this.infoMessage = 'Bitte wähle eine Datei aus';
    } else if (!this.chooser.supported) {
      this.infoMessage = 'Dein Browser unterstützt kein Dateiupload';
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
          const encodedName = this.chooser.name ? utils.id(this.chooser.name) : null;
          const res = await this.validatorService.validate(encoded, encodedName);
          if(res != null) {
            this.valid = res[0];
            if (this.valid) {
              this.result = [{
                key: 'Zeitpunkt des Uploads:',
                value: Utils.formatDate(new Date(res[1] * 1000))
              }];
            } else {
              this.result = [{
                key: 'Dateiname:',
                value: this.chooser.file.name
              }];
            }
            if (this.chooser.name) {
              this.result.push({
                key: 'Ersteller:',
                value: this.chooser.name
              });
            }
            this.validationPanel = true;
            this.infoMessage = '';
          } else {
            this.infoMessage = 'Mit falscher Blockchain verbunden';
          }
        } else {
          this.infoMessage = 'Fehler beim Lesen der Datei';
        }
        this.validatorService.loading = false;
      };
    }
  }

  public back(): void {
    this.validationPanel = false;
  }
}
