import { TestBed } from '@angular/core/testing';

import { AjaxReqWrapperService } from './ajax-req-wrapper.service';

describe('AjaxReqWrapperService', () => {
  let service: AjaxReqWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjaxReqWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
