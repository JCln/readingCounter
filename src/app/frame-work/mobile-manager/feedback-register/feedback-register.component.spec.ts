import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRegisterComponent } from './feedback-register.component';

describe('FeedbackRegisterComponent', () => {
  let component: FeedbackRegisterComponent;
  let fixture: ComponentFixture<FeedbackRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
