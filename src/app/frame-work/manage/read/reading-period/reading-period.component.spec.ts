import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingPeriodComponent } from './reading-period.component';

describe('ReadingPeriodComponent', () => {
  let component: ReadingPeriodComponent;
  let fixture: ComponentFixture<ReadingPeriodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingPeriodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
