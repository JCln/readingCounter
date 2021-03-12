import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IImportDynamic, IImportDynamicDefault } from '../Interfaces/inon-manage';
import { IImportDynamicRes } from './../Interfaces/inon-manage';
import { ConfirmDialogComponent } from './../shared/confirm-dialog/confirm-dialog.component';
import { SnackWrapperService } from './snack-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  importDynamicValue: IImportDynamic;

  constructor(
    private snackWrapperService: SnackWrapperService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) { }

  persentCheck = (val: number): boolean => {
    return this.utilsService.persentCheck(val);
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
  validationOnNull = (val: any): boolean => {
    if (this.utilsService.isNull(val))
      return false;
    return true;
  }
  checkVertification = (val: IImportDynamicDefault, _isOrderByDate: boolean): boolean => {
    this.importDynamicValue = val;
    if (!this.utilsService.isSameLength(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.snackWrapperService.openSnackBar('تعداد ارقام از اشتراک، تا اشتراک باید برابر باشد', 3000, 'snack_warn');
      return false;
    }
    if (!this.utilsService.lengthControl(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak, 5, 15)) {
      this.snackWrapperService.openSnackBar('فرمت اشتراک ناصحیح است', 3000, 'snack_warn');
      return false;
    }
    if (!this.utilsService.isFromLowerThanToByString(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.snackWrapperService.openSnackBar('از اشتراک کمتر از تا اشتراک است!', 3000, 'snack_warn');
      return false;
    }
    if (!this.persentOfImage()) {
      this.snackWrapperService.openSnackBar('درصد تصویر نمیتواند بیش تر از 100 و کمتر از 0 باشد', 3000, 'snack_warn');
      return false;
    }
    if (!this.persentOfalalHesab()) {
      this.snackWrapperService.openSnackBar('درصد تصویر نمیتواند بیش تر از 100 و کمتر از 0 باشد', 3000, 'snack_warn');
      return false;
    }
    if (!_isOrderByDate) {
      if (!this.validationOnNull(val.readingPeriodId)) {
        this.snackWrapperService.openSnackBar('مدت قرائتی ایجاد و سپس امتحان نمایید', 3000, 'snack_warn');
        return false;
      }
    }
    if (!this.validationOnNull(this.importDynamicValue.counterReaderId)) {
      this.snackWrapperService.openSnackBar('یک مامور قرائت انتخاب نمایید', 3000, 'snack_warn');
      return false;
    }
    return true;
  }
  validationInvalid = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('مامور قرائتی در این ناحیه انتخاب نشده است', 6000, 'snack_danger');
      return false;
    }
    return true;
  }
  validationReadingPeriod = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('مدت دوره‌ای پیدا نشد', 6000, 'snack_danger');
      return false;
    }
    return true;
  }
  validationReadingConfigDefault = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('تنظیمات قرائت پیشفرضی وجود ندارد', 6000, 'snack_danger');
      return false;
    }
    return true;
  }
  validationPeriodKind = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('نوع دوره ای وجود ندارد', 6000, 'snack_warn');
      return false;
    }
    return true;
  }
  validationZoneDictionary = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.snackWrapperService.openSnackBar('ناحیه ای تعریف نشده است', 6000, 'snack_warn');
      return false;
    }
    return true;
  }
  showResDialog = (res: IImportDynamicRes) => {
    return new Promise(resolve => {
      this.dialog.open(ConfirmDialogComponent, {
        data: res
      })
    })
  }

}
