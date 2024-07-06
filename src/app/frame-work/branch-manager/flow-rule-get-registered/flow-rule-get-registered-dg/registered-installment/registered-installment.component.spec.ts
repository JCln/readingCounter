import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredInstallmentComponent } from './registered-installment.component';

describe('RegisteredInstallmentComponent', () => {
  let component: RegisteredInstallmentComponent;
  let fixture: ComponentFixture<RegisteredInstallmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredInstallmentComponent]
    });
    fixture = TestBed.createComponent(RegisteredInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
