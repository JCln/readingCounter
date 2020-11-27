import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CounterStateAddDgComponent } from '../counter-state-add-dg/counter-state-add-dg.component';

@Component({
  selector: 'app-counter-state-edit-dg',
  templateUrl: './counter-state-edit-dg.component.html',
  styleUrls: ['./counter-state-edit-dg.component.scss']
})
export class CounterStateEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CounterStateAddDgComponent>
  ) {
    data = data.row;
    this.selected = data.zoneId;
    
    this.form = fb.group({
      id: data.id,
      moshtarakinId: data.moshtarakinId,
      title: data.title,
      zoneId: data.id,
      clientOrder: data.clientOrder,
      canEnterNumber: data.canEnterNumber,
      isMane: data.isMane,
      canNumberBeLessThanPre: data.canNumberBeLessThanPre,
      isTavizi: data.isTavizi,
      shouldEnterNumber: data.shouldEnterNumber,
      isXarab: data.isXarab,
      isFaqed: data.isFaqed
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}
