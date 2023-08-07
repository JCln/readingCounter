import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackComplaintComponent } from './feedback-complaint.component';

describe('FeedbackComplaintComponent', () => {
  let component: FeedbackComplaintComponent;
  let fixture: ComponentFixture<FeedbackComplaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackComplaintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComplaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
