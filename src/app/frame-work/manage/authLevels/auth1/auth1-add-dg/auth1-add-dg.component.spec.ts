import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auth1AddDgComponent } from './auth1-add-dg.component';

describe('Auth1AddDgComponent', () => {
  let component: Auth1AddDgComponent;
  let fixture: ComponentFixture<Auth1AddDgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Auth1AddDgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Auth1AddDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
