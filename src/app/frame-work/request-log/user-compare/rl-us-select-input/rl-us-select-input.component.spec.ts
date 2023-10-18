import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RlUsSelectInputComponent } from './rl-us-select-input.component';

describe('RlUsSelectInputComponent', () => {
  let component: RlUsSelectInputComponent;
  let fixture: ComponentFixture<RlUsSelectInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RlUsSelectInputComponent]
    });
    fixture = TestBed.createComponent(RlUsSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
