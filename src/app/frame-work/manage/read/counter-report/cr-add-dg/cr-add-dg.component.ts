import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ReadManagerService } from 'services/read-manager.service';

@Component({
  selector: 'app-cr-add-dg',
  templateUrl: './cr-add-dg.component.html',
  styleUrls: ['./cr-add-dg.component.scss']
})
export class CrAddDgComponent {
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private readManagerService: ReadManagerService,
    private dialogRef: MatDialogRef<CrAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di;
    this.form = fb.group({
      moshtarakinId: [''],
      title: [''],
      zoneId: data.zoneId,
      forProvince: false,
      isAhad: false,
      isKarbari: false,
      canNumberBeLessThanPre: false,
      isTavizi: false,
      clientOrder: ['']
    })
  }
  async save() {
    if (!this.readManagerService.verification(this.form.value))
      return;
    if (!await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.CounterReportAdd, this.form.value))
      return;
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}