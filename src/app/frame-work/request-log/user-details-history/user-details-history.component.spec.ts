import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsHistoryComponent } from './user-details-history.component';

describe('UserDetailsHistoryComponent', () => {
  let component: UserDetailsHistoryComponent;
  let fixture: ComponentFixture<UserDetailsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
