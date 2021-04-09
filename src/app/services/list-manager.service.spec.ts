import { TestBed } from '@angular/core/testing';

import { ListManagerService } from './list-manager.service';

describe('ListManagerService', () => {
  let service: ListManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
