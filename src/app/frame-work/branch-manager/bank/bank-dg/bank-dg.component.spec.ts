import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDgComponent } from './bank-dg.component';

describe('BankDgComponent', () => {
  let component: BankDgComponent;
  let fixture: ComponentFixture<BankDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankDgComponent]
    });
    fixture = TestBed.createComponent(BankDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
