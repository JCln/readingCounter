import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth4Component } from './auth4.component';

describe('Auth4Component', () => {
  let component: Auth4Component;
  let fixture: ComponentFixture<Auth4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
