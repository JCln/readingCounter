import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RlUsSelectActionComponent } from './rl-us-select-action.component';

describe('RlUsSelectActionComponent', () => {
  let component: RlUsSelectActionComponent;
  let fixture: ComponentFixture<RlUsSelectActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RlUsSelectActionComponent]
    });
    fixture = TestBed.createComponent(RlUsSelectActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
