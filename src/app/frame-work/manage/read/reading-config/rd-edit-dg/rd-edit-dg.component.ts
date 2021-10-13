import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EN_messages } from 'interfaces/enums.enum';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

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
    fb: FormBuilder,
    private utilsService: UtilsService
  ) {
    const editable = data.editable;
    data = data.row;
    this.selected = data.zoneId;

    this.form = fb.group({
      id: data.id,
      defaultHasPreNumber: data.defaultHasPreNumber,
      isOnQeraatCode: data.isOnQeraatCode,
      displayBillId: data.displayBillId,
      displayRadif: data.displayRadif,
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
  private percentValidate = (): boolean => {
    if (!MathS.persentCheck(this.form.value.defaultAlalHesab))
      return false;
    if (!MathS.persentCheck(this.form.value.maxAlalHesab))
      return false;
    if (!MathS.persentCheck(this.form.value.minAlalHesab))
      return false;
    if (!MathS.persentCheck(this.form.value.defaultImagePercent))
      return false;
    if (!MathS.persentCheck(this.form.value.maxImagePercent))
      return false;
    if (!MathS.persentCheck(this.form.value.minImagePercent))
      return false;
    if (!MathS.persentCheck(this.form.value.lowConstBoundMaskooni))
      return false;
    if (!MathS.persentCheck(this.form.value.lowPercentBoundMaskooni))
      return false;
    if (!MathS.persentCheck(this.form.value.highConstBoundMaskooni))
      return false;
    if (!MathS.persentCheck(this.form.value.highPercentBoundMaskooni))
      return false;
    if (!MathS.persentCheck(this.form.value.lowConstBoundSaxt))
      return false;
    if (!MathS.persentCheck(this.form.value.lowPercentBoundSaxt))
      return false;
    if (!MathS.persentCheck(this.form.value.highConstBoundSaxt))
      return false;
    if (!MathS.persentCheck(this.form.value.highPercentBoundSaxt))
      return false;
    if (!MathS.persentCheck(this.form.value.lowConstZarfiatBound))
      return false;
    if (!MathS.persentCheck(this.form.value.lowPercentZarfiatBound))
      return false;
    if (!MathS.persentCheck(this.form.value.highConstZarfiatBound))
      return false;
    if (!MathS.persentCheck(this.form.value.highPercentZarfiatBound))
      return false;
    if (!MathS.persentCheck(this.form.value.lowPercentRateBoundNonMaskooni))
      return false;
    if (!MathS.persentCheck(this.form.value.highPercentRateBoundNonMaskooni))
      return false;
    return true;
  }
  private zoneValidate = (): boolean => {
    if (MathS.isNull(this.form.value.zoneId))
      return false;
    return true;
  }
  save() {
    if (!this.percentValidate()) {
      this.utilsService.snackBarMessageWarn(EN_messages.highLow100);
      return;
    }
    if (!this.zoneValidate()) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return;
    }
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }
}
