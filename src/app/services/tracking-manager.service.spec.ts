import { TestBed } from '@angular/core/testing';

import { TrackingManagerService } from './tracking-manager.service';

describe('TrackingManagerService', () => {
  let service: TrackingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
