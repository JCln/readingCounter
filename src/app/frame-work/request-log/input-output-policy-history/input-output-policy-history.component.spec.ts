import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOutputPolicyHistoryComponent } from './input-output-policy-history.component';

describe('InputOutputPolicyHistoryComponent', () => {
  let component: InputOutputPolicyHistoryComponent;
  let fixture: ComponentFixture<InputOutputPolicyHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputOutputPolicyHistoryComponent]
    });
    fixture = TestBed.createComponent(InputOutputPolicyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
