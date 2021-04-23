import { TestBed } from '@angular/core/testing';

import { SectorsManagerService } from './sectors-manager.service';

describe('SectorsManagerService', () => {
  let service: SectorsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectorsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
