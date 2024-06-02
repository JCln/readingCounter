import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledPaymentMethodComponent } from './scheduled-payment-method.component';

describe('ScheduledPaymentMethodComponent', () => {
  let component: ScheduledPaymentMethodComponent;
  let fixture: ComponentFixture<ScheduledPaymentMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledPaymentMethodComponent]
    });
    fixture = TestBed.createComponent(ScheduledPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
