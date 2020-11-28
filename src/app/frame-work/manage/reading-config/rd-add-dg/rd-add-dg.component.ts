import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rd-add-dg',
  templateUrl: './rd-add-dg.component.html',
  styleUrls: ['./rd-add-dg.component.scss']
})
export class RdAddDgComponent {
  selectedValue: string;
  form: FormGroup;

  constructor(
    fb: FormBuilder,
    private dialogRef: MatDialogRef<RdAddDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    data = data.di;
    this.form = fb.group({
      defaultHasPreNumber: false,
      isOnQeraatCode: false,
      displayBillId: false,
      displayRadif: false,
      logicalOrder: [''],
      zoneId: data.zoneId,
      defaultAlalHesab: [''],
      maxAlalHesab: [''],
      minAlalHesab: [''],
      defaultImagePercent: [''],
      maxImagePercent: [''],
      minImagePercent: [''],
      lowConstBoundMaskooni: [''],
      lowPercentBoundMaskooni: [''],
      highConstBoundMaskooni: [''],
      highPercentBoundMaskooni: [''],
      lowConstBoundSaxt: [''],
      lowPercentBoundSaxt: [''],
      highConstBoundSaxt: [''],
      highPercentBoundSaxt: [''],
      lowConstZarfiatBound: [''],
      lowPercentZarfiatBound: [''],
      highConstZarfiatBound: [''],
      highPercentZarfiatBound: [''],
      lowPercentRateBoundNonMaskooni: [''],
      highPercentRateBoundNonMaskooni: [''],
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}