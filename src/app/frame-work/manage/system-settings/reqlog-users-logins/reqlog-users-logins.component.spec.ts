import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqlogUsersLoginsComponent } from './reqlog-users-logins.component';

describe('ReqlogUsersLoginsComponent', () => {
  let component: ReqlogUsersLoginsComponent;
  let fixture: ComponentFixture<ReqlogUsersLoginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqlogUsersLoginsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqlogUsersLoginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
