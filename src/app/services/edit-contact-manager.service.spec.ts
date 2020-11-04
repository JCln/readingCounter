import { TestBed } from '@angular/core/testing';

import { EditContactManagerService } from './edit-contact-manager.service';

describe('EditContactManagerService', () => {
  let service: EditContactManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditContactManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
