import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-counter-state-add-dg',
  templateUrl: './counter-state-add-dg.component.html',
  styleUrls: ['./counter-state-add-dg.component.scss']
})
export class CounterStateAddDgComponent {
  addNew: any = {
    id: 0,
    moshtarakinId: 0,
    title: '',
    zoneId: 0,
    clientOrder: 0,
    canEnterNumber: true,
    isMane: true,
    canNumberBeLessThanPre: true,
    isTavizi: true,
    shouldEnterNumber: true,
    isXarab: true,
    isFaqed: true
  }
  selectedValue: string;
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<CounterStateAddDgComponent>) {
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}