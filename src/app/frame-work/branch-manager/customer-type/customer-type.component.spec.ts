import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeComponent } from './customer-type.component';

describe('CustomerTypeComponent', () => {
  let component: CustomerTypeComponent;
  let fixture: ComponentFixture<CustomerTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerTypeComponent]
    });
    fixture = TestBed.createComponent(CustomerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
