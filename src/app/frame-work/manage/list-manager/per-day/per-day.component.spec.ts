import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerDayComponent } from './per-day.component';

describe('PerDayComponent', () => {
  let component: PerDayComponent;
  let fixture: ComponentFixture<PerDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
