import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashXyComponent } from './dash-xy.component';

describe('DashXyComponent', () => {
  let component: DashXyComponent;
  let fixture: ComponentFixture<DashXyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashXyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashXyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
