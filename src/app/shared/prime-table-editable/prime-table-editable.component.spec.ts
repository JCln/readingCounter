import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeTableEditableComponent } from './prime-table-editable.component';

describe('PrimeTableEditableComponent', () => {
  let component: PrimeTableEditableComponent;
  let fixture: ComponentFixture<PrimeTableEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimeTableEditableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeTableEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
