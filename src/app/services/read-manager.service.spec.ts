import { TestBed } from '@angular/core/testing';

import { ReadManagerService } from './read-manager.service';

describe('ReadManagerService', () => {
  let service: ReadManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
