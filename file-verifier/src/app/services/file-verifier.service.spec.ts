import { TestBed } from '@angular/core/testing';

import { FileVerifierService } from './file-verifier.service';

describe('PdfVerifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileVerifierService = TestBed.get(FileVerifierService);
    expect(service).toBeTruthy();
  });
});
