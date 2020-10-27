import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth1Component } from './auth1.component';

describe('Auth1Component', () => {
  let component: Auth1Component;
  let fixture: ComponentFixture<Auth1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
