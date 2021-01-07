import { Injectable } from '@angular/core';

import { IImportDynamic } from '../Interfaces/iimport-dynamic';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  importDynamicValue: IImportDynamic;

  constructor(
    private snackWrapperService: SnackWrapperService,
    private utilsService: UtilsService
  ) { }
  persentCheck = (val: number): boolean => {
    if (val >= 0 && val <= 100)
      return true;
    return false;
  }
  persentOfalalHesab = (): boolean => {
    if (this.persentCheck(this.importDynamicValue.alalHesabPercent))
      return true;
    return false;
  }
  persentOfImage = (): boolean => {
    if (this.persentCheck(this.importDynamicValue.imagePercent))
      return true;
    return false;
  }
  checkLengthFromToEshterak = (from: string, to: string): boolean => {
    if (from.toString().trim().length === to.toString().trim().length)
      return true;
    return false;
  }
  validationOnNull = (val: any): boolean => {
    if (this.utilsService.isNull(val))
      return false
    return true;
  }
  checkVertification = (val: IImportDynamic): boolean => {
    this.importDynamicValue = val;
    if (!this.checkLengthFromToEshterak(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.snackWrapperService.openSnackBar('تعداد ارقام از اشتراک، تا اشتراک باید برابر باشد', 3000, 'snack_danger');
      return false;
    }
    if (!this.persentOfImage()) {
      this.snackWrapperService.openSnackBar('درصد تصویر نمیتواند بیش تر از 100 و کمتر از 0 باشد', 3000, 'snack_danger');
      return false;
    }
    if (!this.persentOfalalHesab()) {
      this.snackWrapperService.openSnackBar('درصد تصویر نمیتواند بیش تر از 100 و کمتر از 0 باشد', 3000, 'snack_danger');
      return false;
    }
    if (!this.validationOnNull(this.importDynamicValue.counterReaderId)) {
      this.snackWrapperService.openSnackBar('یک قرائت خوان انتخاب نمایید', 3000, 'snack_danger');
      return false;
    }
    return true;
  }
  validationInvalid = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('قرائت خوانی در این ناحیه انتخاب نشده است', 6000, 'snack_danger');
      return false;
    }
    return true;
  }
  validationReadingConfigDefault = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('تنظیمات قرائت پیشفرضی دریافت نشده است و یا وجود ندارد', 6000, 'snack_danger');
      return false;
    }
    return true;
  }
}
