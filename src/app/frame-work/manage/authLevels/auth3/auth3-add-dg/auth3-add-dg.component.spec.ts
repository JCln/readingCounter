import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth3AddDgComponent } from './auth3-add-dg.component';

describe('Auth3AddDgComponent', () => {
  let component: Auth3AddDgComponent;
  let fixture: ComponentFixture<Auth3AddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth3AddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth3AddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
