import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private utilsService: UtilsService
  ) {
    data = data.di;
    this.form = fb.group({
      // defaultHasPreNumber: false,
      isOnQeraatCode: false,
      displayBillId: false,
      displayRadif: false,
      logicalOrder: [0],
      zoneId: data.zoneId,
      defaultAlalHesab: [0],
      maxAlalHesab: [0],
      minAlalHesab: [0],
      defaultImagePercent: [0],
      maxImagePercent: [0],
      minImagePercent: [0],
      lowConstBoundMaskooni: [0],
      lowPercentBoundMaskooni: [0],
      highConstBoundMaskooni: [0],
      highPercentBoundMaskooni: [0],
      lowConstBoundSaxt: [0],
      lowPercentBoundSaxt: [0],
      highConstBoundSaxt: [0],
      highPercentBoundSaxt: [0],
      lowConstZarfiatBound: [0],
      lowPercentZarfiatBound: [0],
      highConstZarfiatBound: [0],
      highPercentZarfiatBound: [0],
      lowPercentRateBoundNonMaskooni: [0],
      highPercentRateBoundNonMaskooni: [0],
    })
  }
  private percentValidate = (): boolean => {
    if (!this.utilsService.persentCheck(this.form.value.defaultAlalHesab))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.maxAlalHesab))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.minAlalHesab))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.defaultImagePercent))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.maxImagePercent))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.minImagePercent))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowConstBoundMaskooni))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowPercentBoundMaskooni))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highConstBoundMaskooni))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highPercentBoundMaskooni))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowConstBoundSaxt))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowPercentBoundSaxt))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highConstBoundSaxt))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highPercentBoundSaxt))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowConstZarfiatBound))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowPercentZarfiatBound))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highConstZarfiatBound))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highPercentZarfiatBound))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.lowPercentRateBoundNonMaskooni))
      return false;
    if (!this.utilsService.persentCheck(this.form.value.highPercentRateBoundNonMaskooni))
      return false;
    return true;
  }
  private zoneValidate = (): boolean => {
    if (this.utilsService.isNull(this.form.value.zoneId))
      return false;
    return true;
  }
  save() {
    if (!this.percentValidate()) {
      this.utilsService.snackBarMessageWarn('مقدار نمیتواند بیش تر از 100 و کمتر از 0 باشد');
      return;
    }
    if (!this.zoneValidate()) {
      this.utilsService.snackBarMessageWarn('ناحیه انتخاب نشده است');
      return;
    }
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }

}