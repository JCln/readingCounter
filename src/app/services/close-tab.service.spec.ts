import { TestBed } from '@angular/core/testing';

import { CloseTabService } from './close-tab.service';

describe('CloseTabService', () => {
  let service: CloseTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
