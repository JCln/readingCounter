import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStateComponent } from './counter-state.component';

describe('CounterStateComponent', () => {
  let component: CounterStateComponent;
  let fixture: ComponentFixture<CounterStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
