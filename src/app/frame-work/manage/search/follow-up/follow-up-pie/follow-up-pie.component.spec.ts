import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpPieComponent } from './follow-up-pie.component';

describe('FollowUpPieComponent', () => {
  let component: FollowUpPieComponent;
  let fixture: ComponentFixture<FollowUpPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowUpPieComponent]
    });
    fixture = TestBed.createComponent(FollowUpPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
