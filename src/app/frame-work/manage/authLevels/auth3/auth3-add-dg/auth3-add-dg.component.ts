import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth3-add-dg',
  templateUrl: './auth3-add-dg.component.html',
  styleUrls: ['./auth3-add-dg.component.scss']
})
export class Auth3AddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<Auth3AddDgComponent>) {
    this.form = fb.group({
      id: 0,
      title: ['', Validators.required],
      authLevel2Id: ['', Validators.required],
      cssClass: [''],
      route: [''],
      inSidebar: [''],
      isClosable: [''],
      isRefreshable: [''],
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