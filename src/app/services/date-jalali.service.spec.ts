import { TestBed } from '@angular/core/testing';

import { DateJalaliService } from './date-jalali.service';

describe('DateJalaliService', () => {
  let service: DateJalaliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateJalaliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
