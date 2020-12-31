import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterReportComponent } from './counter-report.component';

describe('CounterReportComponent', () => {
  let component: CounterReportComponent;
  let fixture: ComponentFixture<CounterReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
