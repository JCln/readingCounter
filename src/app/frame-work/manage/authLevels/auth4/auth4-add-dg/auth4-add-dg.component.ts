import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth4-add-dg',
  templateUrl: './auth4-add-dg.component.html',
  styleUrls: ['./auth4-add-dg.component.scss']
})
export class Auth4AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<Auth4AddDgComponent>) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      title: ['', Validators.required],
      authLevel3Id: data.authLevel3Id,
      value: ['', Validators.required],
      cssClass: ['', Validators.required],
      logicalOrder: ['', Validators.required]
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
