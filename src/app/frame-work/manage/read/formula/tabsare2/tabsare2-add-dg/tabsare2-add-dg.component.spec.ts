import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tabsare2AddDgComponent } from './tabsare2-add-dg.component';

describe('Tabsare2AddDgComponent', () => {
  let component: Tabsare2AddDgComponent;
  let fixture: ComponentFixture<Tabsare2AddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tabsare2AddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tabsare2AddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
