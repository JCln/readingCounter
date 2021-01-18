import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerDayXyComponent } from './per-day-xy.component';

describe('PerDayXyComponent', () => {
  let component: PerDayXyComponent;
  let fixture: ComponentFixture<PerDayXyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerDayXyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerDayXyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
