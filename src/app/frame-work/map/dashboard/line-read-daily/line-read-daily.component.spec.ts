import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineReadDailyComponent } from './line-read-daily.component';

describe('LineReadDailyComponent', () => {
  let component: LineReadDailyComponent;
  let fixture: ComponentFixture<LineReadDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineReadDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineReadDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
