import { Component, OnInit, ViewChild } from '@angular/core';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { utils } from 'ethers';
import { FileVerifierService } from '../../services/file-verifier.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-file-verify-page',
  templateUrl: './file-verify-page.component.html',
  styleUrls: ['./file-verify-page.component.scss']
})
export class FileVerifyPageComponent implements OnInit {

  @ViewChild('fileInputComponent', { static: false })
  chooser: FileInputComponent;

  public verifyPage: boolean;
  public verifyFile = 'Datei verifzieren';
  public loading: boolean;
  public infoMessage: string;
  public result;
  public valid: boolean;

  constructor(private verifierService: FileVerifierService) { }

  ngOnInit() {
  }

  public verify() {
    if (this.loading) {
      return;
    }
    if (!this.chooser.file) {
      this.infoMessage = 'Bitte wähle eine Datei aus';
    } else if (!this.chooser.supported) {
      this.infoMessage = 'Dein Browser unterstützt kein Dateiupload';
    } else {
      this.infoMessage = '';
      const fileReader = new FileReader();
      fileReader.readAsText(this.chooser.file);
      fileReader.onloadend = async (evt) => {
        // @ts-ignore
        if (evt.target.readyState === FileReader.DONE) {
          this.loading = true;
          this.infoMessage = 'Lädt...';
          // @ts-ignore
          const encoded = utils.id(evt.target.result);
          const encodedName = this.chooser.name ? utils.id(this.chooser.name) : null;
          const res = await this.verifierService.verify(encoded, encodedName);
          this.valid = res[0];
          if (this.valid) {
            this.result = [{
              key: 'Zeitpunkt des Uploads:',
              value: Utils.formatDate(new Date(res[1] * 1000))
            }];
            if (this.chooser.name) {
              this.result.push({
                key: 'Ersteller:',
                value: this.chooser.name
              });
            }
          } else {
             this.result = [{
              key: 'Dateiname:',
              value: this.chooser.file.name
            }];
          }
          this.verifyPage = true;
          this.infoMessage = '';
          this.loading = false;
        }
      };
    }
  }

  public back(): void {
    this.verifyPage = false;
  }
}
