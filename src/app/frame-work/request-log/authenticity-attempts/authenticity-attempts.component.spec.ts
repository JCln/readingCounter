import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticityAttemptsComponent } from './authenticity-attempts.component';

describe('AuthenticityAttemptsComponent', () => {
  let component: AuthenticityAttemptsComponent;
  let fixture: ComponentFixture<AuthenticityAttemptsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticityAttemptsComponent]
    });
    fixture = TestBed.createComponent(AuthenticityAttemptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
