import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabsare3Component } from './tabsare3.component';

describe('Tabsare3Component', () => {
  let component: Tabsare3Component;
  let fixture: ComponentFixture<Tabsare3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabsare3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabsare3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
