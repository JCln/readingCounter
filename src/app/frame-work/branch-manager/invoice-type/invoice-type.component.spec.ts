import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTypeComponent } from './invoice-type.component';

describe('InvoiceTypeComponent', () => {
  let component: InvoiceTypeComponent;
  let fixture: ComponentFixture<InvoiceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceTypeComponent]
    });
    fixture = TestBed.createComponent(InvoiceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
