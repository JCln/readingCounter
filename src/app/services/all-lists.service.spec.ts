import { TestBed } from '@angular/core/testing';

import { AllListsService } from './all-lists.service';

describe('AllListsService', () => {
  let service: AllListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
