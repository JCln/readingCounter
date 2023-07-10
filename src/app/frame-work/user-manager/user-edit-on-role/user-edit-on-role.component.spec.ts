import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditOnRoleComponent } from './user-edit-on-role.component';

describe('UserEditOnRoleComponent', () => {
  let component: UserEditOnRoleComponent;
  let fixture: ComponentFixture<UserEditOnRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditOnRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditOnRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
