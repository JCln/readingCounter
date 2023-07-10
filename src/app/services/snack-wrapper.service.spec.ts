import { TestBed } from '@angular/core/testing';

import { SnackWrapperService } from './snack-wrapper.service';

describe('SnackWrapperService', () => {
  let service: SnackWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
