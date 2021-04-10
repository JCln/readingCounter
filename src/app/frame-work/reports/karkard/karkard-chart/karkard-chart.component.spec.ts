import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarkardChartComponent } from './karkard-chart.component';

describe('KarkardChartComponent', () => {
  let component: KarkardChartComponent;
  let fixture: ComponentFixture<KarkardChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarkardChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KarkardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
