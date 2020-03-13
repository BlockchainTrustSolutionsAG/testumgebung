import { TestBed } from '@angular/core/testing';

import { PdfVerifierService } from './pdf-verifier.service';

describe('PdfVerifierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfVerifierService = TestBed.get(PdfVerifierService);
    expect(service).toBeTruthy();
  });
});
