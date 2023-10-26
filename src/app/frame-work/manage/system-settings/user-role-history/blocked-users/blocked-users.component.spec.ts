import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedUsersComponent } from './blocked-users.component';

describe('BlockedUsersComponent', () => {
  let component: BlockedUsersComponent;
  let fixture: ComponentFixture<BlockedUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockedUsersComponent]
    });
    fixture = TestBed.createComponent(BlockedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
