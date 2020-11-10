import { TestBed } from '@angular/core/testing';

import { SpinnerWrapperService } from './spinner-wrapper.service';

describe('SpinnerWrapperService', () => {
  let service: SpinnerWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
