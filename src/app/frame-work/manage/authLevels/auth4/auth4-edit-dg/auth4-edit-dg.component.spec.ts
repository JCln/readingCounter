import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth4EditDgComponent } from './auth4-edit-dg.component';

describe('Auth4EditDgComponent', () => {
  let component: Auth4EditDgComponent;
  let fixture: ComponentFixture<Auth4EditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth4EditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth4EditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
