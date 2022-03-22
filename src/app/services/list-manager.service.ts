import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { ENRandomNumbers, ENSelectedColumnVariables, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { ISearchMoshReqDialog } from 'interfaces/search';
import { SortEvent } from 'primeng/api/sortevent';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { Converter } from '../classes/converter';
import { MathS } from '../classes/math-s';
import { OffloadModify } from '../classes/offload-modify-type';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ref: DynamicDialogRef;

  generalListModify = (): IObjectIteratation[] => {
    return [
      { field: 'billId', header: 'شناسه قبض', isSelected: false, readonly: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, readonly: true },
      { field: 'radif', header: 'ش.پرونده', isSelected: false, readonly: true },
      { field: 'eshterak', header: 'اشتراک', isSelected: true, readonly: true },
      // { field: 'zoneId', header: 'ناحیه', isSelected: false , readonly: true},
      { field: 'qeraatCode', header: 'قرائت', isSelected: false, readonly: true },
      { field: 'firstName', header: 'نام', isSelected: true, readonly: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: true, readonly: true },
      { field: 'fatherName', header: 'نام پدر', isSelected: false, readonly: true },
      { field: 'oldRadif', header: 'ش.پرونده قدیم', isSelected: false, readonly: true },
      { field: 'oldEshterak', header: 'اشتراک قدیم', isSelected: false, readonly: true },
      { field: 'karbariCode', header: 'کاربری', isSelected: true, readonly: true },
      { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false, readonly: true },
      { field: 'preNumber', header: 'رقم قبلی', isSelected: true, readonly: true },
      { field: 'counterNumber', header: 'رقم فعلی', isSelected: true, readonly: false },
      { field: 'preDate', header: 'تاریخ قبلی', isSelected: false, readonly: true },
      { field: 'offloadDateJalali', header: 'تاریخ فعلی', isSelected: true, readonly: false },
      { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false, readonly: true },
      { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false, readonly: true },
      { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true, isSelectOption: true, readonly: false },
      { field: 'address', header: 'آدرس', isSelected: false, readonly: true },
      { field: 'pelak', header: 'پلاک', isSelected: false, readonly: true },
      { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false, readonly: true },
      { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false, readonly: true },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false, readonly: true },
      { field: 'qotrCode', header: 'قطر', isSelected: false, readonly: true },
      // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false , readonly: true},
      { field: 'postalCode', header: 'کد پستی', isSelected: false, readonly: true },
      { field: 'preAverage', header: 'میانگین قبلی', isSelected: false, readonly: true },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
      { field: 'counterInstallDate', header: 'تاریخ نصب', isSelected: false, readonly: true },
      { field: 'tavizDate', header: 'تاریخ تعویض', isSelected: false, readonly: true },
      { field: 'tavizNumber', header: 'ش تعویض', isSelected: false, readonly: true },
      { field: 'zarfiat', header: 'ظرفیت', isSelected: false, readonly: true },
      { field: 'mobile', header: 'موبایل', isSelected: false, readonly: true },
      { field: 'hazf', header: 'حذف', isSelected: false, readonly: true },
      { field: 'hasError', header: 'خطا', isSelected: false, isBoolean: true, readonly: true },
      { field: 'errorDescription', header: 'توضیح خطا', isSelected: false, readonly: true },
      { field: 'possibleAddress', header: 'آدرس پیمایش', isSelected: false, readonly: true },
      { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false, readonly: true },
      { field: 'possibleEshterak', header: 'اشتراک پیمایش', isSelected: false, readonly: true },
      { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false, readonly: true },
      { field: 'possiblePhoneNumber', header: 'تلفن پیمایش', isSelected: false, readonly: true },
      { field: 'possibleAhadMaskooniOrAsli', header: 'مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
      { field: 'possibleAhadTejariOrFari', header: 'تجاری/فرعی پیمایش', isSelected: false, readonly: true },
      { field: 'possibleAhadSaierOrAbBaha', header: 'آحاد/سایر/آبها پیمایش', isSelected: false, readonly: true },
      { field: 'y', header: 'Y', isSelected: false, readonly: true },
      { field: 'x', header: 'X', isSelected: false, readonly: true },
      { field: 'gisAccuracy', header: 'دقت', isSelected: false, readonly: true },
      { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true, readonly: true },
      { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true, readonly: true },
      { field: 'masraf', header: 'مصرف', isSelected: false, readonly: true },
      // { field: 'eslahType', header: 'اصلاح', isSelected: false , readonly: true},
      { field: 'excludedForEslah', header: 'اصلاح', isSelected: true, isBoolean: true, readonly: true },
      { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false, readonly: true },
      { field: 'offLoadTime', header: 'زمان', isSelected: false, readonly: true },
      { field: 'dateDifference', header: 'مدت', isSelected: false, readonly: true },
      { field: 'modifyType', header: 'نوع اصلاح', isSelected: true, isSelectOption: true, readonly: false },
      { field: 'description', header: 'توضیحات', isSelected: false, readonly: true }
    ]
  }
  columnSelectedLMPerDay = (): IObjectIteratation[] => {
    return [
      { field: 'day', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'fromTime', header: 'از ساعت', isSelected: true, readonly: true },
      { field: 'toTime', header: 'تا ساعت', isSelected: true, readonly: true },
      { field: 'duration', header: 'مدت(h)', isSelected: true, readonly: true },
      { field: 'distance', header: 'مسافت', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: false, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: false, readonly: true },
      { field: 'xarabFaqedCount', header: 'تعداد فاقد/خراب', isSelected: false, readonly: true },
      { field: 'xarabFaqedPercent', header: 'درصد فاقد/خراب', isSelected: false, readonly: true }
    ];
  }
  columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'counterReaders', header: 'مامور(ها)', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
      { field: 'overalDistance', header: 'مسافت کل(m)', isSelected: true, readonly: true },
      { field: 'overalDuration', header: 'زمان کل(h)', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: true, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: true, readonly: true }
    ];
  }
  searchReqMoshDialog: ISearchMoshReqDialog = {
    // searchBy: 1  => eshterak
    zoneId: null,
    searchBy: 1,
    item: null,
    similar: false
  }

  // getSearchTypes = (): Search[] => {
  //   return [
  //     Search.eshterak,
  //     Search.radif,
  //     Search.readCode,
  //     Search.billId,
  //   ]
  // }
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) { }

  getLMAllZoneDictionary = () => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariDictionaryCode = () => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getKarbariDictionary = () => {
    return this.dictionaryWrapperService.getKarbariDictionary();
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  getCounterStateDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateDictionary();
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getCounterStateByZoneIdDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getLM = (method: ENInterfaces | string, trackNumber: number | string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, trackNumber).subscribe(res => {
        resolve(res);
      })
    })
  }
  postBodyDataSource = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postById = (method: ENInterfaces, id?: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postByQueue = (method: ENInterfaces, id: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTSG(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  /*OTHER */
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(MathS.getRange(item.newRate))
      item.preAverage = +MathS.getRange(item.preAverage);
      item.x = MathS.getRange(item.x);
      item.y = MathS.getRange(item.y);
      item.gisAccuracy = MathS.getRange(item.gisAccuracy);
    })
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  showResDialog = (res: any[], disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogCheckboxComponent,
        {
          disableClose: disableClose,
          minWidth: '19rem',
          data: {
            data: res,
            title: title
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (disableClose) {
          if (result) {
            resolve(true);
          }
        }
      })
    });
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }
  showInMapSingleValidation = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseInt(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred || MathS.isNull(parseInt(dataSource.gisAccuracy))) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return false;
    }
    return true;
  }
  postOffloadModifyEdited = (body: IOffloadModifyReq): Promise<any> => {
    body.jalaliDay = Converter.persianToEngNumbers(body.jalaliDay);

    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.trackingPostOffloadModify, body).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        console.log(res);

        resolve(res);
      }).catch(() => {
        resolve(false);
      })
    });
  }
  getOffloadModifyType = (): OffloadModify[] => {
    return [
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading,
      OffloadModify.bazresi
    ]
  }
  offloadModifyValidation = (object: IOffloadModifyReq): boolean => {
    if (MathS.isNull(object.id)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(object.jalaliDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }
    if (MathS.isNullZero(object.modifyType)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_modify_type);
      return false;
    }

    return true;
  }
  selectedItems = (_selectors: any[]): any[] => {
    const a = [];
    _selectors.filter(items => {
      if (items.isSelected)
        a.push(items.id)
    })
    return a;
  }
  showSnackWarn = (message: string) => {
    this.utilsService.snackBarMessageWarn(message);
  }
  // moshtarak dialog
  private validationNullMosh = (dataSource: ISearchMoshReqDialog): boolean => {
    if (dataSource.hasOwnProperty('searchBy')) {
      if (MathS.isNull(dataSource.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('item')) {
      if (MathS.isNull(dataSource.item)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
        return false;
      }
    }
    return true;
  }
  private validationNumbers = (object: ISearchMoshReqDialog): boolean => {
    if (object.hasOwnProperty('searchBy')) {
      if (MathS.isNaN(object.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
        return false;
      }
    }
    return true;
  }
  verificationMosh = (searchReq: ISearchMoshReqDialog): boolean => {
    return this.validationNullMosh(searchReq) && this.validationNumbers(searchReq)
  }
  makeHadPicturesToBoolean = (dataSource: any) => {
    dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.snackEmptyValue();
  }

}
