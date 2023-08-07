import { TestBed } from '@angular/core/testing';

import { MobileAppService } from './mobile-app.service';

describe('MobileAppService', () => {
  let service: MobileAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
