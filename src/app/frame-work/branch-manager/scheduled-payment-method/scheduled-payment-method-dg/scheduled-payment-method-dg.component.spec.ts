import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledPaymentMethodDgComponent } from './scheduled-payment-method-dg.component';

describe('ScheduledPaymentMethodDgComponent', () => {
  let component: ScheduledPaymentMethodDgComponent;
  let fixture: ComponentFixture<ScheduledPaymentMethodDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledPaymentMethodDgComponent]
    });
    fixture = TestBed.createComponent(ScheduledPaymentMethodDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
