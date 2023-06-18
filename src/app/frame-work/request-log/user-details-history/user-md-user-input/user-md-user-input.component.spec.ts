import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMdUserInputComponent } from './user-md-user-input.component';

describe('UserMdUserInputComponent', () => {
  let component: UserMdUserInputComponent;
  let fixture: ComponentFixture<UserMdUserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMdUserInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMdUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
