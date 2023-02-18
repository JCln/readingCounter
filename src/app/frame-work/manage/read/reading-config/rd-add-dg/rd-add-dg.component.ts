import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ReadManagerService } from 'services/read-manager.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from 'src/app/classes/math-s';

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
    private utilsService: UtilsService,
    private readManagerService: ReadManagerService
  ) {
    data = data.di;
    this.form = fb.group({
      // defaultHasPreNumber: false,
      isOnQeraatCode: false,
      displayBillId: false,
      displayRadif: false,
      logicalOrder: [],
      zoneId: data.zoneId,
      defaultAlalHesab: [],
      maxAlalHesab: [],
      minAlalHesab: [],
      defaultImagePercent: [],
      maxImagePercent: [],
      minImagePercent: [],
      lowConstBoundMaskooni: [],
      lowPercentBoundMaskooni: [],
      highConstBoundMaskooni: [],
      highPercentBoundMaskooni: [],
      lowConstBoundSaxt: [],
      lowPercentBoundSaxt: [],
      highConstBoundSaxt: [],
      highPercentBoundSaxt: [],
      lowConstZarfiatBound: [],
      lowPercentZarfiatBound: [],
      highConstZarfiatBound: [],
      highPercentZarfiatBound: [],
      lowPercentRateBoundNonMaskooni: [],
      highPercentRateBoundNonMaskooni: [],
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
  async save() {
    if (!this.percentValidate()) {
      this.utilsService.snackBarMessageWarn(EN_messages.highLow100);
    }
    else if (!this.zoneValidate()) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
    }
    else {
      const a = await this.readManagerService.addOrEditAuths(ENInterfaces.ReadingConfigADD, this.form.value)
      if (a) {
        this.dialogRef.close(this.form.value);
      }
    }

  }
  close() {
    this.dialogRef.close();
  }

}