import { TestBed } from '@angular/core/testing';

import { PrivacyService } from './privacy.service';

describe('PrivacyService', () => {
  let service: PrivacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivacyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
