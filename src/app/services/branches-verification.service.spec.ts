import { TestBed } from '@angular/core/testing';

import { BranchesVerificationService } from './branches-verification.service';

describe('BranchesVerificationService', () => {
  let service: BranchesVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
