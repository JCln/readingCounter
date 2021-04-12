import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrvchChartComponent } from './trvch-chart.component';

describe('TrvchChartComponent', () => {
  let component: TrvchChartComponent;
  let fixture: ComponentFixture<TrvchChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrvchChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrvchChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
