import { TestBed } from '@angular/core/testing';

import { UserAddManagerService } from './user-add-manager.service';

describe('UserAddManagerService', () => {
  let service: UserAddManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAddManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
