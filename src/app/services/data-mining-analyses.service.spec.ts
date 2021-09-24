import { TestBed } from '@angular/core/testing';

import { DataMiningAnalysesService } from './data-mining-analyses.service';

describe('DataMiningAnalysesService', () => {
  let service: DataMiningAnalysesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataMiningAnalysesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
