import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleHistoryComponent } from './user-role-history.component';

describe('UserRoleHistoryComponent', () => {
  let component: UserRoleHistoryComponent;
  let fixture: ComponentFixture<UserRoleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
