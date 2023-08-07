import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackNotComplaintComponent } from './feedback-not-complaint.component';

describe('FeedbackNotComplaintComponent', () => {
  let component: FeedbackNotComplaintComponent;
  let fixture: ComponentFixture<FeedbackNotComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackNotComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackNotComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
