import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRuleGetRegisteredDgComponent } from './flow-rule-get-registered-dg.component';

describe('FlowRuleGetRegisteredDgComponent', () => {
  let component: FlowRuleGetRegisteredDgComponent;
  let fixture: ComponentFixture<FlowRuleGetRegisteredDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowRuleGetRegisteredDgComponent]
    });
    fixture = TestBed.createComponent(FlowRuleGetRegisteredDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
