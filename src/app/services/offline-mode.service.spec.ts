import { TestBed } from '@angular/core/testing';

import { OfflineModeService } from './offline-mode.service';

describe('OfflineModeService', () => {
  let service: OfflineModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
