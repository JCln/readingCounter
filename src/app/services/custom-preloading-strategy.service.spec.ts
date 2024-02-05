import { TestBed } from '@angular/core/testing';

import { CustomPreloadingStrategyService } from './custom-preloading-strategy.service';

describe('CustomPreloadingStrategyService', () => {
  let service: CustomPreloadingStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPreloadingStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
