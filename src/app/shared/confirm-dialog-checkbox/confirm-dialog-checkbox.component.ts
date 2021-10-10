import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-checkbox',
  templateUrl: './confirm-dialog-checkbox.component.html',
  styleUrls: ['./confirm-dialog-checkbox.component.scss']
})
export class ConfirmDialogCheckboxComponent {

  constructor(
    private mdDialogRef: MatDialogRef<ConfirmDialogCheckboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public close(value) {
    this.mdDialogRef.close(value);
  }
  public cancel() {
    this.close(false);
  }
  public confirm() {
    this.close(true);
  }

}
