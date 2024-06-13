import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRuleComponent } from './flow-rule.component';

describe('FlowRuleComponent', () => {
  let component: FlowRuleComponent;
  let fixture: ComponentFixture<FlowRuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowRuleComponent]
    });
    fixture = TestBed.createComponent(FlowRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
