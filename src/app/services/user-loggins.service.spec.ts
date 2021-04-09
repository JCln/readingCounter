import { TestBed } from '@angular/core/testing';

import { UserLogginsService } from './user-loggins.service';

describe('UserLogginsService', () => {
  let service: UserLogginsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogginsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
