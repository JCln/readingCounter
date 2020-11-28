import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rd-edit-dg',
  templateUrl: './rd-edit-dg.component.html',
  styleUrls: ['./rd-edit-dg.component.scss']
})
export class RdEditDgComponent {
  form: FormGroup;
  selected: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<RdEditDgComponent>,
    fb: FormBuilder) {
    const editable = data.editable;    
    data = data.row;
    this.selected = data.zoneId;

    this.form = fb.group({
      defaultHasPreNumber: data.defaultHasPreNumber,
      isOnQeraatCode: data.isOnQeraatCode,
      displayBillId: data.displayBillId,
      displayRadif: data.displayRadif,
      logicalOrder: data.logicalOrder,
      zoneId: editable,
      defaultAlalHesab: data.defaultAlalHesab,
      maxAlalHesab: data.maxAlalHesab,
      minAlalHesab: data.minAlalHesab,
      defaultImagePercent: data.defaultImagePercent,
      maxImagePercent: data.maxImagePercent,
      minImagePercent: data.minImagePercent,
      lowConstBoundMaskooni: data.lowConstBoundMaskooni,
      lowPercentBoundMaskooni: data.lowPercentBoundMaskooni,
      highConstBoundMaskooni: data.highConstBoundMaskooni,
      highPercentBoundMaskooni: data.highPercentBoundMaskooni,
      lowConstBoundSaxt: data.lowConstBoundSaxt,
      lowPercentBoundSaxt: data.lowPercentBoundSaxt,
      highConstBoundSaxt: data.highConstBoundSaxt,
      highPercentBoundSaxt: data.highPercentBoundSaxt,
      lowConstZarfiatBound: data.lowConstZarfiatBound,
      lowPercentZarfiatBound: data.lowPercentZarfiatBound,
      highConstZarfiatBound: data.highConstZarfiatBound,
      highPercentZarfiatBound: data.highPercentZarfiatBound,
      lowPercentRateBoundNonMaskooni: data.lowPercentRateBoundNonMaskooni,
      highPercentRateBoundNonMaskooni: data.highPercentRateBoundNonMaskooni
    })
  }
  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
