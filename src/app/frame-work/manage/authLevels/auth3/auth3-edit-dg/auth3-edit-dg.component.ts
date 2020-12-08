import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth3-edit-dg',
  templateUrl: './auth3-edit-dg.component.html',
  styleUrls: ['./auth3-edit-dg.component.scss']
})
export class Auth3EditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth3EditDgComponent>,
    fb: FormBuilder
  ) {
    data = data.row;
    this.selected = data.authLevel2Id;
    this.form = fb.group({
      id: data.id,
      title: data.title,
      authLevel2Id: data.id,
      value: data.value,
      cssClass: data.cssClass,
      route: data.route,
      logicalOrder: data.logicalOrder,
      inSidebar: data.inSidebar,
      isClosable: data.isClosable,
      isRefreshable: data.isRefreshable
    })
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}