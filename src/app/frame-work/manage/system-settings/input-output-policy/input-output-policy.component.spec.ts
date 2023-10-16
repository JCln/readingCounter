import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputPolicyComponent } from './input-output-policy.component';

describe('InputOutputPolicyComponent', () => {
  let component: InputOutputPolicyComponent;
  let fixture: ComponentFixture<InputOutputPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputOutputPolicyComponent]
    });
    fixture = TestBed.createComponent(InputOutputPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
