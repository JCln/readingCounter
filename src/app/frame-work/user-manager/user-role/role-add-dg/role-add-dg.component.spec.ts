import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddDgComponent } from './role-add-dg.component';

describe('RoleAddDgComponent', () => {
  let component: RoleAddDgComponent;
  let fixture: ComponentFixture<RoleAddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleAddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
