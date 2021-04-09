import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth3EditDgComponent } from './auth3-edit-dg.component';

describe('Auth3EditDgComponent', () => {
  let component: Auth3EditDgComponent;
  let fixture: ComponentFixture<Auth3EditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth3EditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth3EditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
