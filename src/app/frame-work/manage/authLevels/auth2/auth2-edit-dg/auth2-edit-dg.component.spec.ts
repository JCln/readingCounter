import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth2EditDgComponent } from './auth2-edit-dg.component';

describe('Auth2EditDgComponent', () => {
  let component: Auth2EditDgComponent;
  let fixture: ComponentFixture<Auth2EditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth2EditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth2EditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
