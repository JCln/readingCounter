import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth2-edit-dg',
  templateUrl: './auth2-edit-dg.component.html',
  styleUrls: ['./auth2-edit-dg.component.scss']
})
export class Auth2EditDgComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth2EditDgComponent>,
    fb: FormBuilder
  ) {
    data = data.row;
    this.form = fb.group({
      id: data.id,
      authLevel1Id: data.authLevel1Id,
      title: data.title,
      cssClass: data.cssClass,
      route: data.route,
      logicalOrder: data.logicalOrder,
      inSidebar: data.inSidebar
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
