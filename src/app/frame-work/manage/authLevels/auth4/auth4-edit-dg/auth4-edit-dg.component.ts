import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth4-edit-dg',
  templateUrl: './auth4-edit-dg.component.html',
  styleUrls: ['./auth4-edit-dg.component.scss']
})
export class Auth4EditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth4EditDgComponent>,
  ) {
    data = data.row;
    this.selected = data.authLevel3Id;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      authLevel3Id: data.id,
      value: data.value,
      cssClass: data.cssClass,
      logicalOrder: data.logicalOrder
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
