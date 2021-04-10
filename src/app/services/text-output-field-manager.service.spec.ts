import { TestBed } from '@angular/core/testing';

import { TextOutputFieldManagerService } from './text-output-field-manager.service';

describe('TextOutputFieldManagerService', () => {
  let service: TextOutputFieldManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextOutputFieldManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
