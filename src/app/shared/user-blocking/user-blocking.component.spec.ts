import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBlockingComponent } from './user-blocking.component';

describe('UserBlockingComponent', () => {
  let component: UserBlockingComponent;
  let fixture: ComponentFixture<UserBlockingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBlockingComponent]
    });
    fixture = TestBed.createComponent(UserBlockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
