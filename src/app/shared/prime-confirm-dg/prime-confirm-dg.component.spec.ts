import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeConfirmDgComponent } from './prime-confirm-dg.component';

describe('PrimeConfirmDgComponent', () => {
  let component: PrimeConfirmDgComponent;
  let fixture: ComponentFixture<PrimeConfirmDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeConfirmDgComponent]
    });
    fixture = TestBed.createComponent(PrimeConfirmDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
