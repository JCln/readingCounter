import { TestBed } from '@angular/core/testing';

import { SidebarItemsService } from './sidebar-items.service';

describe('SidebarItemsService', () => {
  let service: SidebarItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
