import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCalculatedComponent } from './registered-calculated.component';

describe('RegisteredCalculatedComponent', () => {
  let component: RegisteredCalculatedComponent;
  let fixture: ComponentFixture<RegisteredCalculatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredCalculatedComponent]
    });
    fixture = TestBed.createComponent(RegisteredCalculatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
