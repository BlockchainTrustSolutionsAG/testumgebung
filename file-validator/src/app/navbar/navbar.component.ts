import { Component, OnInit } from '@angular/core';
import { FileValidatorService } from '../services/file-validator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public validatorService: FileValidatorService) { }

  ngOnInit() {
  }

}
