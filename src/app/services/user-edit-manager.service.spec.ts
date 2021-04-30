import { TestBed } from '@angular/core/testing';

import { UserEditManagerService } from './user-edit-manager.service';

describe('UserEditManagerService', () => {
  let service: UserEditManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEditManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
