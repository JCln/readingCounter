import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPackAverageComponent } from './dash-pack-average.component';

describe('DashPackAverageComponent', () => {
  let component: DashPackAverageComponent;
  let fixture: ComponentFixture<DashPackAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPackAverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPackAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
