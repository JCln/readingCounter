import { TestBed } from '@angular/core/testing';

import { ManageServerService } from './manage-server.service';

describe('ManageServerService', () => {
  let service: ManageServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
