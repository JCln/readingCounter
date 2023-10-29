import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcRoleRolesComponent } from './uc-role-roles.component';

describe('UcRoleRolesComponent', () => {
  let component: UcRoleRolesComponent;
  let fixture: ComponentFixture<UcRoleRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcRoleRolesComponent]
    });
    fixture = TestBed.createComponent(UcRoleRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
