import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    private dialogRef: MatDialogRef<KarbariAddDgComponent>) {
    this.form = fb.group({
      id: 0,
      moshtarakinId: ['', Validators.required],
      title: ['', Validators.required],
      provinceId: ['', Validators.required],
      isMaskooni: ['', Validators.required],
      isSaxt: ['', Validators.required],
      hasReadingVibrate: ['', Validators.required]
    })

  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}