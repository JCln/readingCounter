import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcRoleZoneComponent } from './uc-role-zone.component';

describe('UcRoleZoneComponent', () => {
  let component: UcRoleZoneComponent;
  let fixture: ComponentFixture<UcRoleZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcRoleZoneComponent]
    });
    fixture = TestBed.createComponent(UcRoleZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
