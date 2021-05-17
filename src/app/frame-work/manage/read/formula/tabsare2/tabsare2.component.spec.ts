import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabsare2Component } from './tabsare2.component';

describe('Tabsare2Component', () => {
  let component: Tabsare2Component;
  let fixture: ComponentFixture<Tabsare2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabsare2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabsare2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
