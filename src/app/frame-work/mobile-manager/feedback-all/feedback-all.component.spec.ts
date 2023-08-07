import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAllComponent } from './feedback-all.component';

describe('FeedbackAllComponent', () => {
  let component: FeedbackAllComponent;
  let fixture: ComponentFixture<FeedbackAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
