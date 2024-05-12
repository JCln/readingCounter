import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterNumberChangeDgComponent } from './counter-number-change-dg.component';

describe('CounterNumberChangeDgComponent', () => {
  let component: CounterNumberChangeDgComponent;
  let fixture: ComponentFixture<CounterNumberChangeDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterNumberChangeDgComponent]
    });
    fixture = TestBed.createComponent(CounterNumberChangeDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
