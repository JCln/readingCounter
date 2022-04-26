import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashRequestRateComponent } from './dash-request-rate.component';

describe('DashRequestRateComponent', () => {
  let component: DashRequestRateComponent;
  let fixture: ComponentFixture<DashRequestRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashRequestRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashRequestRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
