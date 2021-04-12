import { TestBed } from '@angular/core/testing';

import { RouteReuseStrategyService } from './route-reuse-strategy.service';

describe('RouteReuseStrategyService', () => {
  let service: RouteReuseStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteReuseStrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
