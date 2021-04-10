import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisperseChartComponent } from './disperse-chart.component';

describe('DisperseChartComponent', () => {
  let component: DisperseChartComponent;
  let fixture: ComponentFixture<DisperseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisperseChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisperseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
