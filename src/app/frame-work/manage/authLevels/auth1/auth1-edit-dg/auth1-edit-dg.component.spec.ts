import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth1EditDgComponent } from './auth1-edit-dg.component';

describe('Auth1EditDgComponent', () => {
  let component: Auth1EditDgComponent;
  let fixture: ComponentFixture<Auth1EditDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth1EditDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth1EditDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
