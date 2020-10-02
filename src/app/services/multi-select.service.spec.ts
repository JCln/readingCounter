import { TestBed } from '@angular/core/testing';

import { MultiSelectService } from './multi-select.service';

describe('MultiSelectService', () => {
  let service: MultiSelectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSelectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
