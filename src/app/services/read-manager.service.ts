import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { EN_messages } from '../Interfaces/enums.enum';
import {
  ENSelectedColumnVariables,
  IDictionaryManager,
  IObjectIteratation,
  IResponses,
} from '../Interfaces/ioverall-config';
import { ENInterfaces } from './../Interfaces/en-interfaces.enum';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { SectionsService } from './sections.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReadManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private sectionsService: SectionsService,
    private converterService: ConverterService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) { }

  /* COLUMNS */
  private _counterReport = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
    { field: 'moshtarakinId', header: 'مشترکین', isSelected: true },
    { field: 'isAhad', header: 'آحاد', isSelected: true, isBoolean: true },
    { field: 'isKarbari', header: 'کاربری', isSelected: true, isBoolean: true },
    { field: 'canNumberBeLessThanPre', header: 'کمتر از قبلی', isSelected: true, isBoolean: true },
    { field: 'isTavizi', header: 'تعویض', isSelected: true, isBoolean: true },
    { field: 'clientOrder', header: 'ترتیب', isSelected: true }
  ]
  private _readingConfigDefault = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
    { field: 'defaultAlalHesab', header: 'علی‌الحساب', isSelected: true },
    { field: 'minAlalHesab', header: 'علی‌الحساب کمینه', isSelected: false },
    { field: 'maxAlalHesab', header: 'علی‌الحساب بیشینه', isSelected: false },
    { field: 'defaultImagePercent', header: 'درصد پیشفرض عکس', isSelected: true },
    { field: 'minImagePercent', header: 'درصد عکس کمینه', isSelected: false },
    { field: 'maxImagePercent', header: 'درصد عکس بیشینه', isSelected: false },
    // { field: 'defaultHasPreNumber', header: 'ش قبلی پیشفرض', isSelected: false },      
    { field: 'isOnQeraatCode', header: 'کد قرائت باشد', isSelected: false, isBoolean: true },
    { field: 'displayBillId', header: 'نمایش قبض', isSelected: false, isBoolean: true },
    { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false },
    { field: 'lowConstBoundMaskooni', header: 'ثابت کمینه مسکونی', isSelected: false },
    { field: 'highConstBoundMaskooni', header: 'ثابت بیشینه مسکونی', isSelected: false },
    { field: 'lowPercentBoundMaskooni', header: 'درصد کمینه مسکونی', isSelected: false },
    { field: 'highPercentBoundMaskooni', header: 'درصد بیشینه مسکونی', isSelected: false },
    { field: 'lowPercentBoundSaxt', header: 'درصد کمینه ساخت', isSelected: false },
    { field: 'lowConstBoundSaxt', header: 'ثابت کمینه ساخت', isSelected: false },
    { field: 'highConstBoundSaxt', header: 'ثابت بیشینه ساخت', isSelected: false },
    { field: 'highPercentBoundSaxt', header: 'درصد بیشینه ساخت', isSelected: false },
    { field: 'lowPercentZarfiatBound', header: 'درصد کمینه ظرفیت', isSelected: false },
    { field: 'lowConstZarfiatBound', header: 'ثابت کمینه ظرفیت', isSelected: false },
    { field: 'highConstZarfiatBound', header: 'ثابت بیشینه ظرفیت', isSelected: false },
    { field: 'highPercentZarfiatBound', header: 'درصد بیشنه ظرفیت', isSelected: false },
    { field: 'lowPercentRateBoundNonMaskooni', header: 'درصد low غیر مسکونی', isSelected: false },
    { field: 'highPercentRateBoundNonMaskooni', header: 'درصد high غیر مسکونی', isSelected: false }
  ]
  private _readingPeriod = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'readingPeriodKindId', header: 'نوع دوره', isSelected: true, isSelectOption: true },
    { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
    { field: 'moshtarakinId', header: 'مشترکین', isSelected: true },
    { field: 'clientOrder', header: 'ترتیب', isSelected: true }
  ]
  private _readingPeriodKind = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'moshtarakinId', header: 'مشترکین', isSelected: true },
    { field: 'clientOrder', header: 'ترتیب', isSelected: true },
    { field: 'isEnabled', header: 'فعال', isSelected: true, isBoolean: true },
  ]
  private _textOutput = [
    { field: 'itemTitle', header: 'عنوان', isSelected: true, readonly: true },
    { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true },
    { field: 'startIndex', header: 'ابتدا', isSelected: true, readonly: true },
    { field: 'endIndex', header: 'انتها', isSelected: true, readonly: true },
    { field: 'length', header: 'طول', isSelected: true, readonly: true }
  ]
  private _karbari = [
    { field: 'title', header: 'عنوان', isSelected: true },
    { field: 'provinceId', header: 'استان', isSelected: true, isSelectOption: true },
    { field: 'moshtarakinId', header: 'مشترکین', isSelected: true },
    { field: 'isMaskooni', header: 'مسکونی', isSelected: true, isBoolean: true },
    { field: 'isTejari', header: 'تجاری', isSelected: true, isBoolean: true },
    { field: 'isSaxt', header: 'ساخت', isSelected: true, isBoolean: true },
    { field: 'hasReadingVibrate', header: 'لرزش', isSelected: true, isBoolean: true }
  ]
  columnCounterReport = (): IObjectIteratation[] => {
    return this._counterReport;
  }
  columnReadingConfigDefault = (): IObjectIteratation[] => {
    return this._readingConfigDefault;
  }
  columnReadingPeriod = (): IObjectIteratation[] => {
    return this._readingPeriod;
  }
  columnReadingPeriodKind = (): IObjectIteratation[] => {
    return this._readingPeriodKind;
  }
  columnTextOutput = (): IObjectIteratation[] => {
    return this._textOutput;
  }
  columnKarbari = (): IObjectIteratation[] => {
    return this._karbari;
  }
  /* API CALLS */
  getProvinceDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getProvinceDictionary();
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getDataSource = (method: ENInterfaces): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(method).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(error);
    }
  }
  /* VERIFICATION & VALIDATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }
  /* OTHER */
  addOrEditAuths = (place: ENInterfaces, result: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, result).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  firstConfirmDialog = (): Promise<any> => {
    const title = EN_messages.confirm_remove;
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: title,
          isInput: false,
          isDelete: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
}
