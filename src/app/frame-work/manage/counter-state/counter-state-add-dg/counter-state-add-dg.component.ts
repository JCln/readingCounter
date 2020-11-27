import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-counter-state-add-dg',
  templateUrl: './counter-state-add-dg.component.html',
  styleUrls: ['./counter-state-add-dg.component.scss']
})
export class CounterStateAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CounterStateAddDgComponent>
  ) {
    this.form = fb.group({
      id: ['', Validators.required],
      moshtarakinId: ['', Validators.required],
      title: ['', Validators.required],
      zoneId: data.zoneId,
      clientOrder: ['', Validators.required],
      canEnterNumber: [false, Validators.required],
      isMane: [false, Validators.required],
      canNumberBeLessThanPre: [false, Validators.required],
      isTavizi: [false, Validators.required],
      shouldEnterNumber: [false, Validators.required],
      isXarab: [false, Validators.required],
      isFaqed: [false, Validators.required]
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}