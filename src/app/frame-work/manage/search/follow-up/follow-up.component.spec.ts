import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpComponent } from './follow-up.component';

describe('FollowUpComponent', () => {
  let component: FollowUpComponent;
  let fixture: ComponentFixture<FollowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
