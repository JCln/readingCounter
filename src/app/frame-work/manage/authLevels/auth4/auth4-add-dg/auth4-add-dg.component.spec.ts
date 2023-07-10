import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth4AddDgComponent } from './auth4-add-dg.component';

describe('Auth4AddDgComponent', () => {
  let component: Auth4AddDgComponent;
  let fixture: ComponentFixture<Auth4AddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth4AddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth4AddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
