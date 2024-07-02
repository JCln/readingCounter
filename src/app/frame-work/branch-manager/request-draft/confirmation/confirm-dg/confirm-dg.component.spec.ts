import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDgComponent } from './confirm-dg.component';

describe('ConfirmDgComponent', () => {
  let component: ConfirmDgComponent;
  let fixture: ComponentFixture<ConfirmDgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDgComponent]
    });
    fixture = TestBed.createComponent(ConfirmDgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
