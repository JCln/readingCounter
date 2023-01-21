import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOnlinesComponent } from './user-onlines.component';

describe('UserOnlinesComponent', () => {
  let component: UserOnlinesComponent;
  let fixture: ComponentFixture<UserOnlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOnlinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOnlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
