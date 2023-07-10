import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleHistoryDetailsComponent } from './role-history-details.component';

describe('RoleHistoryDetailsComponent', () => {
  let component: RoleHistoryDetailsComponent;
  let fixture: ComponentFixture<RoleHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
