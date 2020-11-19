import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStateEditDgComponent } from './counter-state-edit-dg.component';

describe('CounterStateEditDgComponent', () => {
  let component: CounterStateEditDgComponent;
  let fixture: ComponentFixture<CounterStateEditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStateEditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStateEditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
