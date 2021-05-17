import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingPeriodKindComponent } from './reading-period-kind.component';

describe('ReadingPeriodKindComponent', () => {
  let component: ReadingPeriodKindComponent;
  let fixture: ComponentFixture<ReadingPeriodKindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingPeriodKindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingPeriodKindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
