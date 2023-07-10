import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashUnreadCountComponent } from './dash-unread-count.component';

describe('DashUnreadCountComponent', () => {
  let component: DashUnreadCountComponent;
  let fixture: ComponentFixture<DashUnreadCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashUnreadCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashUnreadCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
