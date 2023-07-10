import { TestBed } from '@angular/core/testing';

import { ReadingReportManagerService } from './reading-report-manager.service';

describe('ReadingReportManagerService', () => {
  let service: ReadingReportManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingReportManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
