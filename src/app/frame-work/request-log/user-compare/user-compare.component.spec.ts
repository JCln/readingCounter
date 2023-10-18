import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCompareComponent } from './user-compare.component';

describe('UserCompareComponent', () => {
  let component: UserCompareComponent;
  let fixture: ComponentFixture<UserCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCompareComponent]
    });
    fixture = TestBed.createComponent(UserCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
