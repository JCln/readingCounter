import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAddDgComponent } from './budget-add-dg.component';

describe('BudgetAddDgComponent', () => {
  let component: BudgetAddDgComponent;
  let fixture: ComponentFixture<BudgetAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
