import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileValidatePageComponent } from './file-validate-page.component';
import { FormsModule } from '@angular/forms';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { FileInformationComponent } from '../../components/file-information/file-information.component';

describe('FileValidatePageComponent', () => {
  let component: FileValidatePageComponent;
  let fixture: ComponentFixture<FileValidatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FileValidatePageComponent, FileInputComponent, FileInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileValidatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
