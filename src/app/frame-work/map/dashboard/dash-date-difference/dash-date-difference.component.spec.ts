import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDateDifferenceComponent } from './dash-date-difference.component';

describe('DashDateDifferenceComponent', () => {
  let component: DashDateDifferenceComponent;
  let fixture: ComponentFixture<DashDateDifferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashDateDifferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashDateDifferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
