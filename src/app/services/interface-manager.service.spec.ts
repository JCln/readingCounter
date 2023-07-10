import { TestBed } from '@angular/core/testing';

import { InterfaceManagerService } from './interface-manager.service';

describe('InterfaceManagerService', () => {
  let service: InterfaceManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterfaceManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
