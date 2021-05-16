import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabsare3AddDgComponent } from './tabsare3-add-dg.component';

describe('Tabsare3AddDgComponent', () => {
  let component: Tabsare3AddDgComponent;
  let fixture: ComponentFixture<Tabsare3AddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabsare3AddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabsare3AddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
