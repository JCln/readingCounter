import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleHistoryDetailsComponent } from './user-role-history-details.component';

describe('UserRoleHistoryDetailsComponent', () => {
  let component: UserRoleHistoryDetailsComponent;
  let fixture: ComponentFixture<UserRoleHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
