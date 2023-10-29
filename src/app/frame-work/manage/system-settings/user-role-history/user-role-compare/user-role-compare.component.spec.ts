import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleCompareComponent } from './user-role-compare.component';

describe('UserRoleCompareComponent', () => {
  let component: UserRoleCompareComponent;
  let fixture: ComponentFixture<UserRoleCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRoleCompareComponent]
    });
    fixture = TestBed.createComponent(UserRoleCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
