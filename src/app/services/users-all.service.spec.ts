import { TestBed } from '@angular/core/testing';

import { UsersAllService } from './users-all.service';

describe('UsersAllService', () => {
  let service: UsersAllService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersAllService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
