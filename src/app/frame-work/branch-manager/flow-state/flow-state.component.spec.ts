import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowStateComponent } from './flow-state.component';

describe('FlowStateComponent', () => {
  let component: FlowStateComponent;
  let fixture: ComponentFixture<FlowStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowStateComponent]
    });
    fixture = TestBed.createComponent(FlowStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
