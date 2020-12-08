import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth2-add-dg',
  templateUrl: './auth2-add-dg.component.html',
  styleUrls: ['./auth2-add-dg.component.scss']
})
export class Auth2AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth2AddDgComponent>) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: ['', Validators.required],
      authLevel1Id: data.authLevel1Id,
      cssClass: [''],
      logicalOrder: [''],
      route: [''],
      inSidebar: [false, Validators.required]
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
