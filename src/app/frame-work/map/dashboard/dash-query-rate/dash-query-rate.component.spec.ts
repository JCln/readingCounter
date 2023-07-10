import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashQueryRateComponent } from './dash-query-rate.component';

describe('DashQueryRateComponent', () => {
  let component: DashQueryRateComponent;
  let fixture: ComponentFixture<DashQueryRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashQueryRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashQueryRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
