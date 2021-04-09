import { TestBed } from '@angular/core/testing';

import { HelpWrapperService } from './help-wrapper.service';

describe('HelpWrapperService', () => {
  let service: HelpWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
