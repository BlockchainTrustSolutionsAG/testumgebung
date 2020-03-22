import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.scss']
})
export class FileInformationComponent implements OnInit {

  @Input() public valid;
  @Input() public infos;
  public validMessage = 'Bei dieser Datei handelt es sich um ein Original';
  public invalidMessage = 'Bei dieser Datei handelt es sich um kein Original';

  constructor() { }

  ngOnInit() {
  }

}
