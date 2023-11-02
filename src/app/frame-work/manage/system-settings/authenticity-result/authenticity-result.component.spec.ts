import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticityResultComponent } from './authenticity-result.component';

describe('AuthenticityBriefComponent', () => {
  let component: AuthenticityResultComponent;
  let fixture: ComponentFixture<AuthenticityResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticityResultComponent]
    });
    fixture = TestBed.createComponent(AuthenticityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
