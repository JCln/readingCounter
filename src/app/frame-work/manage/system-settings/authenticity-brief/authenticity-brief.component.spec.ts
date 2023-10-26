import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticityBriefComponent } from './authenticity-brief.component';

describe('AuthenticityBriefComponent', () => {
  let component: AuthenticityBriefComponent;
  let fixture: ComponentFixture<AuthenticityBriefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticityBriefComponent]
    });
    fixture = TestBed.createComponent(AuthenticityBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
