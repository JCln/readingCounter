import { TestBed } from '@angular/core/testing';

import { AllContactsService } from './all-contacts.service';

describe('AllContactsService', () => {
  let service: AllContactsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
