import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredConfirmationComponent } from './registered-confirmation.component';

describe('RegisteredConfirmationComponent', () => {
  let component: RegisteredConfirmationComponent;
  let fixture: ComponentFixture<RegisteredConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredConfirmationComponent]
    });
    fixture = TestBed.createComponent(RegisteredConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
