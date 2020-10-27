import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth3Component } from './auth3.component';

describe('Auth3Component', () => {
  let component: Auth3Component;
  let fixture: ComponentFixture<Auth3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
