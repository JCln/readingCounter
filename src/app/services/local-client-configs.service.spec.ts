import { TestBed } from '@angular/core/testing';

import { LocalClientConfigsService } from './local-client-configs.service';

describe('LocalClientConfigsService', () => {
  let service: LocalClientConfigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalClientConfigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
