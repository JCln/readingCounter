import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHistoryComponent } from './role-history.component';

describe('RoleHistoryComponent', () => {
  let component: RoleHistoryComponent;
  let fixture: ComponentFixture<RoleHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
