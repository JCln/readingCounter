import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnlinesDgComponent } from './user-onlines-dg.component';

describe('UserOnlinesDgComponent', () => {
  let component: UserOnlinesDgComponent;
  let fixture: ComponentFixture<UserOnlinesDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOnlinesDgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOnlinesDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
