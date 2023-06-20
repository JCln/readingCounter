import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqlogUsersLoginsDetailsComponent } from './reqlog-users-logins-details.component';

describe('ReqlogUsersLoginsDetailsComponent', () => {
  let component: ReqlogUsersLoginsDetailsComponent;
  let fixture: ComponentFixture<ReqlogUsersLoginsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqlogUsersLoginsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqlogUsersLoginsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
