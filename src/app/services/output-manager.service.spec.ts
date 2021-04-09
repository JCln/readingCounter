import { TestBed } from '@angular/core/testing';

import { OutputManagerService } from './output-manager.service';

describe('OutputManagerService', () => {
  let service: OutputManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
