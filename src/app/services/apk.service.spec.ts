import { TestBed } from '@angular/core/testing';

import { ApkService } from './apk.service';

describe('ApkService', () => {
  let service: ApkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
