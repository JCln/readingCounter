import { TestBed } from '@angular/core/testing';

import { DictionaryWrapperService } from './dictionary-wrapper.service';

describe('DictionaryWrapperService', () => {
  let service: DictionaryWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DictionaryWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
