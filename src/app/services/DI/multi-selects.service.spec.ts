import { TestBed } from '@angular/core/testing';

import { MultiSelectsService } from './multi-selects.service';

describe('MultiSelectsService', () => {
  let service: MultiSelectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSelectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
