import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerDayPieComponent } from './per-day-pie.component';

describe('PerDayPieComponent', () => {
  let component: PerDayPieComponent;
  let fixture: ComponentFixture<PerDayPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerDayPieComponent]
    });
    fixture = TestBed.createComponent(PerDayPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
