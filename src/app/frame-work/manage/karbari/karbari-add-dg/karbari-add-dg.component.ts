import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-karbari-add-dg',
  templateUrl: './karbari-add-dg.component.html',
  styleUrls: ['./karbari-add-dg.component.scss']
})
export class KarbariAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<KarbariAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    data = data.di;
    this.form = fb.group({
      id: 0,
      moshtarakinId: ['', Validators.required],
      title: ['', Validators.required],
      provinceId: data.provinceId,
      isMaskooni: ['', Validators.required],
      isSaxt: ['', Validators.required],
      hasReadingVibrate: ['', Validators.required]
    })

  }
  save() {
    console.log(this.form.value);

    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}