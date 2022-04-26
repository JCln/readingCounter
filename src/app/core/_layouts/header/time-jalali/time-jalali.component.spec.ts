import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeJalaliComponent } from './time-jalali.component';

describe('TimeJalaliComponent', () => {
  let component: TimeJalaliComponent;
  let fixture: ComponentFixture<TimeJalaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeJalaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeJalaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
