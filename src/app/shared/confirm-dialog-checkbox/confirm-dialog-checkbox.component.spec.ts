import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCheckboxComponent } from './confirm-dialog-checkbox.component';

describe('ConfirmDialogCheckboxComponent', () => {
  let component: ConfirmDialogCheckboxComponent;
  let fixture: ComponentFixture<ConfirmDialogCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
