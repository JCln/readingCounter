import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogginsComponent } from './user-loggins.component';

describe('UserLogginsComponent', () => {
  let component: UserLogginsComponent;
  let fixture: ComponentFixture<UserLogginsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLogginsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLogginsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
