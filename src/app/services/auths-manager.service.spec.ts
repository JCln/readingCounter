import { TestBed } from '@angular/core/testing';

import { AuthsManagerService } from './auths-manager.service';

describe('AuthsManagerService', () => {
  let service: AuthsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
