import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateJalaliComponent } from './date-jalali.component';

describe('DateJalaliComponent', () => {
  let component: DateJalaliComponent;
  let fixture: ComponentFixture<DateJalaliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateJalaliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateJalaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
