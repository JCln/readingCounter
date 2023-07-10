import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleHistorySummaryComponent } from './user-role-history-summary.component';

describe('UserRoleHistorySummaryComponent', () => {
  let component: UserRoleHistorySummaryComponent;
  let fixture: ComponentFixture<UserRoleHistorySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRoleHistorySummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleHistorySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
