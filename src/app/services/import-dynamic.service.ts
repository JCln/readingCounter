import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IAssessAddDtoSimafa, IAssessPreDisplayDtoSimafa, IOnOffLoadFlat } from 'interfaces/imanage';
import {
  IImportDataResponse,
  IImportDynamicDefault,
  IImportSimafaBatchReq,
  IImportSimafaReadingProgramsReq,
  IImportSimafaSingleReq,
  IReadingProgramRes,
} from 'interfaces/inon-manage';
import { ENSelectedColumnVariables, IMasrafStates, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { ConfirmDialogComponent } from '../frame-work/import-data/import-dynamic/confirm-dialog/confirm-dialog.component';
import { Converter } from './../classes/converter';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  importDynamicValue: IImportDynamicDefault;
  private _assessPre: IAssessPreDisplayDtoSimafa;
  private _simafaSingleReq: IReadingProgramRes;
  _simafaReadingProgram: IObjectIteratation[] = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, isNumber: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, isNumber: true },
    { field: 'listNumber', header: 'ش لیست', isSelected: true },
    { field: 'year', header: 'سال', isSelected: true, isNumber: true },
    { field: 'readingPeriodId', header: 'دوره قرائت', isSelected: true, isSelectOption: true },
  ]
  private _simafaBatch: IObjectIteratation[] = [
    { field: 'routeTitle', header: 'مسیر', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: false },
    { field: 'orderDigit', header: 'ترتیب', isSelected: false, readonly: true },
    { field: 'orderPersian', header: 'فارسی', isSelected: false, readonly: true, isBoolean: true },
    { field: 'routeAndReaderIds', header: 'مامور', isSelected: true, readonly: false, isSelectOption: true }
  ]
  private _assessPreColumns: IObjectIteratation[] =
    [
      { field: 'billId', header: 'شناسه قبض', isSelected: false },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
      { field: 'radif', header: 'ش.پرونده', isSelected: false },
      { field: 'eshterak', header: 'اشتراک', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'qeraatCode', header: 'قرائت', isSelected: false },
      { field: 'firstName', header: 'نام', isSelected: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
      { field: 'karbariCode', header: 'کاربری', isSelected: true },
      { field: 'preNumber', header: 'رقم قبلی', isSelected: true },
      { field: 'counterNumber', header: 'رقم فعلی', isSelected: true },
      { field: 'preDate', header: 'تاریخ قبلی', isSelected: false },
      { field: 'offloadDateJalali', header: 'تاریخ فعلی', isSelected: true },
      { field: 'address', header: 'آدرس', isSelected: false },
      { field: 'pelak', header: 'پلاک', isSelected: false },
      { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
      { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
      { field: 'qotrCode', header: 'قطر', isSelected: false },
      // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: false },
      { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
      { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
      { field: 'counterStateCode', header: 'وضعیت فعلی', isSelected: true },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
      // { field: 'counterStateId', header: 'کد وضعیت کنتور', isSelected: false },      
      { field: 'counterInstallDate', header: 'تاریخ نصب', isSelected: false },
      { field: 'tavizDate', header: 'تاریخ تعویض', isSelected: false },
      { field: 'tavizNumber', header: 'ش تعویض', isSelected: false },
      { field: 'zarfiat', header: 'ظرفیت', isSelected: false },
      { field: 'mobile', header: 'موبایل', isSelected: false },
      { field: 'hazf', header: 'حذف', isSelected: false },
      { field: 'hasError', header: 'خطا', isSelected: false, isBoolean: true },
      { field: 'errorDescription', header: 'توضیح خطا', isSelected: false },
      { field: 'possibleAddress', header: 'آدرس پیمایش', isSelected: false },
      { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false },
      { field: 'possibleEshterak', header: 'اشتراک پیمایش', isSelected: false },
      { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false },
      { field: 'possiblePhoneNumber', header: 'تلفن پیمایش', isSelected: false },
      { field: 'possibleAhadMaskooniOrAsli', header: 'مسکونی/اصلی پیمایش', isSelected: false },
      { field: 'possibleAhadTejariOrFari', header: 'تجاری/فرعی پیمایش', isSelected: false },
      { field: 'possibleAhadSaierOrAbBaha', header: 'آحاد/سایر/آبها پیمایش', isSelected: false },
      // { field: 'possibleKarbariCode', header: 'کد کاربری پیمایش', isSelected: false },
      { field: 'y', header: 'Y', isSelected: false },
      { field: 'x', header: 'X', isSelected: false },
      { field: 'gisAccuracy', header: 'دقت', isSelected: false },
      { field: 'masraf', header: 'مصرف', isSelected: false },
      { field: 'eslahType', header: 'اصلاح', isSelected: false },
      { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
      { field: 'dateDifference', header: 'طول دوره', isSelected: false },
      { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
      { field: 'imageCount', header: 'تعداد تصویر', isSelected: true, isBoolean: true },
      { field: 'description', header: 'توضیحات', isSelected: false }
    ]

  constructor(
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private router: Router,
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService    
  ) { }

  columnAssessPre = (): IObjectIteratation[] => {
    return this._assessPreColumns;
  }
  columnSimafaSingle = () => {
    return this._simafaSingleReq;
  }
  columnSimafaReadingProgram = (): IObjectIteratation[] => {
    return this._simafaReadingProgram;
  }
  columnSimafaBatch = (): IObjectIteratation[] => {
    return this._simafaBatch;
  }
  columnSetSimafaBatch = (val: IObjectIteratation) => {
    this._simafaBatch.push(val);
  }
  columnRemoveSimafaBatch = () => {
    const a = this._simafaBatch.filter(item => {
      return !(item.field == 'trackNumber' || item.field == 'count')
    })
    this._simafaBatch = a;
  }

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
  noRouteToImportMessage = () => this.utilsService.snackBarMessageWarn(EN_messages.import_NoRouteAvailable);

  private NANValidation = (sth: string, message?: EN_messages): boolean => {
    if (this.utilsService.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  private validationNull = (object: any): boolean => {
    if (object.hasOwnProperty('zoneId')) {
      if (this.utilsService.isNull(object.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (object.hasOwnProperty('listNumber')) {
      if (this.utilsService.isNull(object.listNumber)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_listNumber);
        return false;
      }
    }
    return true;
  }
  routeToWoui = (object: IOnOffLoadFlat) => {
    this.router.navigate(['wr/m/track/woui', false, object.id]);
  }
  routeToSimafaSingle = (object: IReadingProgramRes) => {
    this.router.navigate(['/wr/imp/simafa/rdpg/single', object]);
  }
  routeToSimafaBatch = (object: IReadingProgramRes) => {
    this.router.navigate(['/wr/imp/simafa/rdpg/batch', object]);
  }
  verificationAssessPre = (searchReq: IAssessPreDisplayDtoSimafa): boolean => {
    this._assessPre = searchReq;
    return this.validationNull(searchReq);
  }
  getAssessPre = () => {
    return this._assessPre;
  }
  checkVertification = (val: IImportDynamicDefault, _isOrderByDate: boolean): boolean => {
    this.importDynamicValue = val;
    if (!this.utilsService.isSameLength(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;
    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_to_eshterak))
      return false;

    if (!this.utilsService.lengthControl(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    if (!this.utilsService.isFromLowerThanToByString(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }
    if (!this.persentOfImage()) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (!this.persentOfalalHesab()) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (!_isOrderByDate) {
      console.log(1);

      if (!this.validationOnNull(val.readingPeriodId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_reading_time);
        return false;
      }
    }
    if (!this.validationOnNull(this.importDynamicValue.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    return true;
  }
  checkSimafaVertification = (val: IImportSimafaReadingProgramsReq): boolean => {
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (this.utilsService.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (this.utilsService.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (this.utilsService.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (this.utilsService.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (this.utilsService.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }

    return true;
  }
  validateSimafaBatch = (val: IImportSimafaBatchReq): boolean => {
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.readingProgramId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.fragmentMasterId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    if (this.utilsService.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    return true;
  }
  private validateSimafaBatchHaveSelectedCounterReaders = (val: IImportSimafaBatchReq): boolean => {
    return val.routeAndReaderIds.every(item => {
      return item.counterReaderId !== null
    })
  }
  verificationSimafaBatch = (val: IImportSimafaBatchReq) => {
    if (!this.validateSimafaBatchHaveSelectedCounterReaders(val)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_allReaders);
      return false;
    }
    if (!this.validateSimafaBatch(val)) {
      return false;
    }

    return true;
  }
  checkSimafaSingleVertification = (val: IImportSimafaSingleReq): boolean => {
    // call support group because inserted in previous section and readonly
    if (this.utilsService.isNull(val.readingProgramId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNull(val.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    if (this.utilsService.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (this.utilsService.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (this.utilsService.isNaN(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (this.utilsService.isNaN(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
      return false;
    }

    return true;
  }
  validationInvalid = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.thereis_no_reader);
      return false;
    }
    return true;
  }
  validationReadingPeriod = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.not_found_period);
      return false;
    }
    return true;
  }
  validationReadingConfigDefault = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.thereis_no_default);
      return false;
    }
    return true;
  }
  validationPeriodKind = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.thereis_no_type);
      return false;
    }
    return true;
  }
  validationZoneDictionary = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.not_found_zoneId);
      return false;
    }
    return true;
  }
  showResDialog = (res: IImportDataResponse, disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent,
        {
          disableClose: disableClose,
          minWidth: '19rem',
          data: {
            data: res,
            title: title,
            isConfirm: disableClose
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

  /*API CALLS */
  getKarbariDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getCounterReportByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterReportByZoneIdDictionary(zoneId);
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  postFragmentDetailsByEshterak = (val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentDETAILSByEshterak, val).toPromise().then(res =>
        resolve(res))
    });
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).toPromise().then(res =>
        resolve(res))
    });
  }
  getCounterStateByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getFragmentMasterDictionary = (zoneId: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.fragmentMasterInZone, zoneId).toPromise().then(res =>
        resolve(res))
    });
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getReadingPeriodsKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getReadingPeriod = (zoneId: number, kindId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuoteTriple(ENInterfaces.readingPeriodDictionaryByZoneIdAndKindId, zoneId, kindId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingConfigDefaults = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.readingConfigDefaultByZoneId, zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getMasrafStates = () => {
    return IMasrafStates;
  }
  postAssess = (method: ENInterfaces, object: IAssessPreDisplayDtoSimafa): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, object).subscribe(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(e => e);
    }
  }
  postImportDynamicData = (importDynamic: IImportDynamicDefault): Promise<any> => {
    importDynamic.fromDate = Converter.persianToEngNumbers(importDynamic.fromDate);
    importDynamic.toDate = Converter.persianToEngNumbers(importDynamic.toDate);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.postImportData, importDynamic).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postImportDynamicCount = (importDynamic: IImportDynamicDefault): Promise<any> => {
    importDynamic.fromDate = Converter.persianToEngNumbers(importDynamic.fromDate);
    importDynamic.toDate = Converter.persianToEngNumbers(importDynamic.toDate);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.postImportDynamicCount, importDynamic).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postImportSimafa = (method: ENInterfaces, body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getFragmentDetailsByMaster = (zoneId: string) => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.fragmentMasterInZone, zoneId).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(this.utilsService.getRange(item.newRate))
      if (item.gisAccuracy)
        item.gisAccuracy = this.utilsService.getRange(item.gisAccuracy)
    })
  }
  makeHadPicturesToBoolean = (dataSource: any) => {
    dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  makeAssessAddReq = (dataReq: IAssessAddDtoSimafa): IAssessAddDtoSimafa => {
    const temp: IAssessAddDtoSimafa = {
      onOffLoadIds: [],
      alalHesabPercent: 0,
      imagePercent: 0,
      hasPreNumber: true,
      displayBillId: true,
      displayRadif: true,
      counterReaderId: '',
      trackNumber: 0
    }
    return temp;
  }
  /* OTHERS */

  setSimafaSingleReq = (dataSourceReq: IReadingProgramRes) => {
    this._simafaSingleReq = dataSourceReq;
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
