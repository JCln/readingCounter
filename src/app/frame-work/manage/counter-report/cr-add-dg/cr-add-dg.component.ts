import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cr-add-dg',
  templateUrl: './cr-add-dg.component.html',
  styleUrls: ['./cr-add-dg.component.scss']
})
export class CrAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<CrAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di;
    this.form = fb.group({
      id: [''],
      moshtarakinId: [''],
      title: [''],
      zoneId: data.zoneId,
      isAhad: false,
      isKarbari: false,
      canNumberBeLessThanPre: false,
      isTavizi: false,
      clientOrder: ['']
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}