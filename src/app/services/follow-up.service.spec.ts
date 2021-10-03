import { TestBed } from '@angular/core/testing';

import { FollowUpService } from './follow-up.service';

describe('FollowUpService', () => {
  let service: FollowUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
