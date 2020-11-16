import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStateAddDgComponent } from './counter-state-add-dg.component';

describe('CounterStateAddDgComponent', () => {
  let component: CounterStateAddDgComponent;
  let fixture: ComponentFixture<CounterStateAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStateAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStateAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
