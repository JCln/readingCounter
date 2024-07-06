import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredRecalcComponent } from './registered-recalc.component';

describe('RegisteredRecalcComponent', () => {
  let component: RegisteredRecalcComponent;
  let fixture: ComponentFixture<RegisteredRecalcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredRecalcComponent]
    });
    fixture = TestBed.createComponent(RegisteredRecalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
