import { TestBed } from '@angular/core/testing';

import { AddUserManagerService } from './add-user-manager.service';

describe('AddUserManagerService', () => {
  let service: AddUserManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUserManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
