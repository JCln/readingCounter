import { TestBed } from '@angular/core/testing';

import { AllImportsService } from './all-imports.service';

describe('AllImportsService', () => {
  let service: AllImportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllImportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
