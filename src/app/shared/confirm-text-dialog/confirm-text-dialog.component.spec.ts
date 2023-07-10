import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTextDialogComponent } from './confirm-text-dialog.component';

describe('ConfirmTextDialogComponent', () => {
  let component: ConfirmTextDialogComponent;
  let fixture: ComponentFixture<ConfirmTextDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTextDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
