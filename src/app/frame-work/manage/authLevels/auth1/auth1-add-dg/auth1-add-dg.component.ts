import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth1-add-dg',
  templateUrl: './auth1-add-dg.component.html',
  styleUrls: ['./auth1-add-dg.component.scss']
})
export class Auth1AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<Auth1AddDgComponent>) {
    this.form = fb.group({
      id: [''],
      title: ['', Validators.required],
      cssClass: [''],
      inSidebar: ['', Validators.required],
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
