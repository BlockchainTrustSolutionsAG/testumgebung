import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileVerifyPageComponent } from './file-verify-page.component';

describe('FileVerifyPageComponent', () => {
  let component: FileVerifyPageComponent;
  let fixture: ComponentFixture<FileVerifyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileVerifyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileVerifyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
