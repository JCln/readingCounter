import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterHistoryComponent } from './user-master-history.component';

describe('UserMasterHistoryComponent', () => {
  let component: UserMasterHistoryComponent;
  let fixture: ComponentFixture<UserMasterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMasterHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMasterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
