import { TestBed } from '@angular/core/testing';

import { TimeoutInterceptorService } from './timeout-interceptor.service';

describe('TimeoutInterceptorService', () => {
  let service: TimeoutInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeoutInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
