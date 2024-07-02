import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRuleGetRegisteredComponent } from './flow-rule-get-registered.component';

describe('FlowRuleGetRegisteredComponent', () => {
  let component: FlowRuleGetRegisteredComponent;
  let fixture: ComponentFixture<FlowRuleGetRegisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowRuleGetRegisteredComponent]
    });
    fixture = TestBed.createComponent(FlowRuleGetRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
