import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeDgComponent } from './invoice-type-dg.component';

describe('InvoiceTypeDgComponent', () => {
  let component: InvoiceTypeDgComponent;
  let fixture: ComponentFixture<InvoiceTypeDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTypeDgComponent]
    });
    fixture = TestBed.createComponent(InvoiceTypeDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
