import { TestBed } from '@angular/core/testing';

import { FragmentManagerService } from './fragment-manager.service';

describe('FragmentManagerService', () => {
  let service: FragmentManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FragmentManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
