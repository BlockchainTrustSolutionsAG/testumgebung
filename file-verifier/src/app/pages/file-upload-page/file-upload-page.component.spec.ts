import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadPageComponent } from './file-upload-page.component';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { FormsModule } from '@angular/forms';

describe('FileUploadPageComponent', () => {
  let component: FileUploadPageComponent;
  let fixture: ComponentFixture<FileUploadPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ FileUploadPageComponent, FileInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
