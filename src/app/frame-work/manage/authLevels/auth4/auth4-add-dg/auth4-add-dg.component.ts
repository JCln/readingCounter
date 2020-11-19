import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth4-add-dg',
  templateUrl: './auth4-add-dg.component.html',
  styleUrls: ['./auth4-add-dg.component.scss']
})
export class Auth4AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<Auth4AddDgComponent>) {
    this.form = fb.group({
      id: 0,
      title: ['', Validators.required],
      authLevel3Id: ['', Validators.required],
      value: ['', Validators.required],
      cssClass: [''],
      logicalOrder: ['']
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
