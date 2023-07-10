import { TestBed } from '@angular/core/testing';

import { ImportDynamicService } from './import-dynamic.service';

describe('ImportDynamicService', () => {
  let service: ImportDynamicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportDynamicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
