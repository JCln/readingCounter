import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcRoleInputComponent } from './uc-role-input.component';

describe('UcRoleInputComponent', () => {
  let component: UcRoleInputComponent;
  let fixture: ComponentFixture<UcRoleInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcRoleInputComponent]
    });
    fixture = TestBed.createComponent(UcRoleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
