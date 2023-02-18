import { TestBed } from '@angular/core/testing';

import { PageSignsService } from './page-signs.service';

describe('PageSignsService', () => {
  let service: PageSignsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageSignsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
