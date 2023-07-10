import { TestBed } from '@angular/core/testing';

import { FormulasService } from './formulas.service';

describe('FormulasService', () => {
  let service: FormulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
