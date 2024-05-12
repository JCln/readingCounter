import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterNumberChangeComponent } from './counter-number-change.component';

describe('CounterNumberChangeComponent', () => {
  let component: CounterNumberChangeComponent;
  let fixture: ComponentFixture<CounterNumberChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterNumberChangeComponent]
    });
    fixture = TestBed.createComponent(CounterNumberChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
