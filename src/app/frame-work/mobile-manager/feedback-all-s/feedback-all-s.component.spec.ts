import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAllSComponent } from './feedback-all-s.component';

describe('FeedbackAllSComponent', () => {
  let component: FeedbackAllSComponent;
  let fixture: ComponentFixture<FeedbackAllSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackAllSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackAllSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
