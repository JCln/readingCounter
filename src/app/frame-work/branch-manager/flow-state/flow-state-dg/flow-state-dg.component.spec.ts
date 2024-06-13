import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowStateDgComponent } from './flow-state-dg.component';

describe('FlowStateDgComponent', () => {
  let component: FlowStateDgComponent;
  let fixture: ComponentFixture<FlowStateDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowStateDgComponent]
    });
    fixture = TestBed.createComponent(FlowStateDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
