import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowRuleDgComponent } from './flow-rule-dg.component';

describe('FlowRuleDgComponent', () => {
  let component: FlowRuleDgComponent;
  let fixture: ComponentFixture<FlowRuleDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowRuleDgComponent]
    });
    fixture = TestBed.createComponent(FlowRuleDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
