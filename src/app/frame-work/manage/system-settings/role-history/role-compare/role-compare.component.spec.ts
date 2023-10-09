import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCompareComponent } from './role-compare.component';

describe('RoleCompareComponent', () => {
  let component: RoleCompareComponent;
  let fixture: ComponentFixture<RoleCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleCompareComponent]
    });
    fixture = TestBed.createComponent(RoleCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
