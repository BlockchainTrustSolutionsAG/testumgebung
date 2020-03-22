import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent implements OnInit {

  @ViewChild('fileChooser', { static: false })
  chooser: ElementRef;

  @Input() public title;
  @Input() public buttonDesc: string;
  @Input() public loading: boolean;
  @Input() public infoMessage: string;

  public chooseDesc = 'Klicke oder Drag and Drop zum Wählen';

  @Output() clickButton = new EventEmitter();
  public supported: boolean;

  public name: string;
  public file;

  constructor() { }

  ngOnInit() {
    // @ts-ignore
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      this.supported = true;
    }
  }

  public resetFile(): void {
    this.chooser.nativeElement.value = '';
    this.file = undefined;
  }

  public fileChange($event: Event): void {
    this.infoMessage = '';
    // @ts-ignore
    this.file = $event.target.files[0];
  }
}
