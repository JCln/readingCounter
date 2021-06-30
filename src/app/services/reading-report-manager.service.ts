import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { IReadingReportWithZoneIDsReq } from 'src/app/Interfaces/imanage';
import { ENSelectedColumnVariables, IObjectIteratation, ITitleValue } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { EN_messages } from '../Interfaces/enums.enum';
import { IReadingReportGISReq, IReadingReportReq, IReadingReportTraverseDifferentialReq } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  private readingReportReq: IReadingReportReq;
  private readingReportGISReq: IReadingReportGISReq;
  private rRTraverseDiffrential: IReadingReportTraverseDifferentialReq;
  private rRAnalyzeReq: IReadingReportWithZoneIDsReq;

  /* GET*/

  getRRReq(): IReadingReportReq {
    return this.readingReportReq;
  }
  getRRTrvDifferential(): IReadingReportTraverseDifferentialReq {
    return this.rRTraverseDiffrential;
  }
  getRRGISReq(): IReadingReportGISReq {
    return this.readingReportGISReq;
  }
  getRRAnalyzeReq(): IReadingReportWithZoneIDsReq {
    return this.rRAnalyzeReq;
  }

  /* COLUMNS*/
  private _RRAnalyzeByParam = [
    // { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: false },
    // { field: 'zoneTitle', header: 'عنوان ناحیه', isSelected: true, readonly: false },
    // { field: 'regionTitle', header: 'منطقه', isSelected: false, readonly: false },
    { field: 'statusTitle', header: 'وضعیت', isSelected: true, readonly: false },
    { field: 'min', header: 'کمینه', isSelected: true, readonly: false },
    { field: 'max', header: 'بیشینه', isSelected: true, readonly: false },
    { field: 'average', header: 'میانگین', isSelected: true, readonly: false },
    { field: 'variance', header: 'واریانس', isSelected: true, readonly: false },
    { field: 'standardDeviation', header: 'انحراف معیار', isSelected: true, readonly: false },
    { field: 'median', header: 'میانه', isSelected: true, readonly: false },
    { field: 'mode', header: 'مٌد', isSelected: true, readonly: false },
    { field: 'duration', header: 'مدت', isSelected: false, readonly: false }
  ];
  private _RRMaster = [
    // { field: 'zoneId', header: 'کد ناحیه', isSelected: true, readonly: false },
    { field: 'zoneTitle', header: 'ناحیه', isSelected: true, readonly: true },
    { field: 'reportTitle', header: 'عنوان گزارش', isSelected: true, readonly: true },
    { field: 'reportId', header: 'گزارش', isSelected: true, readonly: true },
    { field: 'itemCount', header: 'تعداد', isSelected: true, readonly: true }
  ]
  private _RRDetails = [
    { field: 'billId', header: 'ش قبض', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'radif', header: 'ش.پرونده', isSelected: false, readonly: true },
    { field: 'eshterak', header: 'اشتراک', isSelected: false, readonly: true },
    { field: 'fulName', header: 'نام و نام خانوادگی', isSelected: true, readonly: true },
    { field: 'address', header: 'نشانی', isSelected: false, readonly: true },
    { field: 'karbariCode', header: 'کاربری', isSelected: false, readonly: true },
    // { field: 'possibleKarbariCode', header: 'کد کاربری پیمایش', isSelected: false, readonly: true },
    { field: 'ahadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی', isSelected: true, readonly: true },
    { field: 'possibleAhadMaskooniOrAsli', header: 'مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
    { field: 'ahadTejariOrFari', header: 'آحاد تجاری/فرعی', isSelected: false, readonly: true },
    { field: 'possibleAhadTejariOrFari', header: 'تجاری/فرعی پیمایش', isSelected: false, readonly: true },
    { field: 'ahadSaierOrAbBaha', header: 'آحاد سایر/آبها', isSelected: false, readonly: true },
    { field: 'possibleSaierOrAbBaha', header: 'سایر/آبها پیمایش', isSelected: false, readonly: true },
    { field: 'reportTitle', header: 'گزارش', isSelected: true, readonly: true },
    { field: 'offloadDateJalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
    { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false, readonly: true }
  ]
  private _RRTraverse = [
    { field: 'billId', header: 'شناسه قبض', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'radif', header: 'ش.پرونده', isSelected: true, readonly: true },
    { field: 'eshterak', header: 'اشتراک', isSelected: true, readonly: false },
    { field: 'fulName', header: 'نام و نام خانوادگی', isSelected: true, readonly: true },
    { field: 'address', header: 'نشانی', isSelected: false, readonly: true },
    { field: 'possibleAddress', header: 'نشانی پیمایش', isSelected: false, readonly: true },
    { field: 'karbariCode', header: 'کاربری', isSelected: false, readonly: false },
    // { field: 'possibleKarbariCode', header: 'کد کاربری پیمایش', isSelected: false, readonly: true },
    { field: 'ahadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی', isSelected: false, readonly: true },
    { field: 'possibleAhadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
    { field: 'ahadTejariOrFari', header: 'آحاد تجاری/فرعی', isSelected: false, readonly: false },
    { field: 'possibleAhadTejariOrFari', header: 'آحاد تجاری/فرعی پیمایش', isSelected: false, readonly: true },
    { field: 'ahadSaierOrAbBaha', header: 'آحاد سایر/آبها', isSelected: false, readonly: true },
    { field: 'possibleSaierOrAbBaha', header: 'سایر/آبها پیمایش', isSelected: false, readonly: false },
    { field: 'offloadDateJalali', header: 'روز', isSelected: false, readonly: true },
    { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
    { field: 'possibleCounterSerial', header: 'سریال کنتور پیمایش', isSelected: false, readonly: false },
    { field: 'mobile', header: 'موبایل', isSelected: false, readonly: true },
    { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false, readonly: true },
    { field: 'possibleEmpty', header: 'خالی پیمایش', isSelected: false, readonly: true }
  ]
  private _RRTraverseDifferential = [
    { field: 'billId', header: 'شناسه قبض', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'radif', header: 'ش.پرونده', isSelected: true, readonly: true },
    { field: 'eshterak', header: 'اشتراک', isSelected: true, readonly: false },
    { field: 'fulName', header: 'نام و نام خانوادگی', isSelected: true, readonly: true },
    // { field: 'possibleKarbariCode', header: 'کد کاربری پیمایش', isSelected: true, readonly: true },
    { field: 'karbariCode', header: 'کاربری', isSelected: false, readonly: false },
    { field: 'ahadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی', isSelected: false, readonly: true },
    { field: 'possibleAhadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
    { field: 'ahadTejariOrFari', header: 'آحاد تجاری/فرعی', isSelected: false, readonly: false },
    { field: 'possibleAhadTejariOrFari', header: 'آحاد تجاری/فرعی پیمایش', isSelected: false, readonly: true },
    { field: 'ahadSaierOrAbBaha', header: 'آحاد سایر/آبها', isSelected: false, readonly: true },
    { field: 'possibleSaierOrAbBaha', header: 'سایر/آبها پیمایش', isSelected: false, readonly: false },
    { field: 'offloadDateJalali', header: 'روز', isSelected: false, readonly: true },
    { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
    { field: 'possibleCounterSerial', header: 'سریال کنتور پیمایش', isSelected: false, readonly: false },
    { field: 'mobile', header: 'موبایل', isSelected: false, readonly: true },
    { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false, readonly: true },
    { field: 'possibleEmpty', header: 'خالی پیمایش', isSelected: false, readonly: true },
    { field: 'address', header: 'نشانی', isSelected: false, readonly: true },
    { field: 'possibleAddress', header: 'نشانی پیمایش', isSelected: false, readonly: true },
  ]
  private _RRKarkard = [
    // { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    // { field: 'fromTime', header: 'از ساعت', isSelected: true, readonly: true },
    // { field: 'toTime', header: 'تا ساعت', isSelected: true, readonly: true },
    { field: 'duration', header: 'مدت', isSelected: true, readonly: true },
    { field: 'overalCount', header: 'تعداد', isSelected: true, readonly: true },
    { field: 'adiCount', header: 'عادی', isSelected: true, readonly: true },
    { field: 'faqedCount', header: 'فاقد', isSelected: true, readonly: true },
    { field: 'maneCount', header: 'مانع', isSelected: true, readonly: true },
    { field: 'xarabCount', header: 'خراب', isSelected: true, readonly: true },
    { field: 'tavizCount', header: 'تعویض', isSelected: true, readonly: true },
    { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true }
  ]
  private _RRKarkardDaily = [
    { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'fromTime', header: 'از', isSelected: true, readonly: true },
    { field: 'toTime', header: 'تا', isSelected: true, readonly: true },
    { field: 'duration', header: 'مدت', isSelected: true, readonly: true },
    { field: 'overalCount', header: 'تعداد', isSelected: true, readonly: true },
    { field: 'adiCount', header: 'عادی', isSelected: true, readonly: true },
    { field: 'faqedCount', header: 'فاقد', isSelected: true, readonly: true },
    { field: 'maneCount', header: 'مانع', isSelected: true, readonly: true },
    { field: 'xarabCount', header: 'خراب', isSelected: true, readonly: true },
    { field: 'tavizCount', header: 'تعویض', isSelected: true, readonly: true },
    { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true },
    // { field: 'areaTitle', header: 'سایر', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true }
  ]
  private _RRDisposalHours = [
    { field: 'dayJalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'overalCount', header: 'تعداد', isSelected: true, readonly: true },
    { field: '_8To10', header: '8 - 10', isSelected: true, readonly: true },
    { field: '_10To12', header: '10 - 12', isSelected: true, readonly: true },
    { field: '_12To14', header: '12 - 14', isSelected: true, readonly: true },
    { field: '_14To16', header: '14 - 16', isSelected: true, readonly: true },
    { field: '_16To18', header: '16 - 18', isSelected: true, readonly: true },
    { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true }
  ];

  columnRRAnalyzeByParam = (): IObjectIteratation[] => {
    return this._RRAnalyzeByParam;
  }
  columnRRMaster = (): IObjectIteratation[] => {
    return this._RRMaster;
  }
  columnRRDetails = (): IObjectIteratation[] => {
    return this._RRDetails;
  }
  columnRRTraverse = (): IObjectIteratation[] => {
    return this._RRTraverse;
  }
  columnRRTraverseDifferential = (): IObjectIteratation[] => {
    return this._RRTraverseDifferential;
  }

  columnRRKarkard = (): IObjectIteratation[] => {
    return this._RRKarkard;
  }
  columnRRKarkardDaly = (): IObjectIteratation[] => {
    return this._RRKarkardDaily;
  }
  columnRRDisposalHours = (): IObjectIteratation[] => {
    return this._RRDisposalHours;
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private _location: Location
  ) { }

  // CALL APIs
  postRRManager = (backTo: string, method: ENInterfaces, validator: string): Promise<any> => {
    console.log(this[validator]);
    if (!this[validator]) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_again);
      this.routeTo(backTo);
      return;
    }
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, this[validator]).subscribe((res) => {
          if (this.utilsService.isNull(res))
            this.emptyMessage();
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }

  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getKarbariDictionary();
  }
  getCounterStateByZoneIdDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getTraverseDiffrentialDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getTraverseDifferentialDictionary();
  }


  private datesValidation = (value: object): boolean => {
    if (value.hasOwnProperty('fromDate')) {
      if (this.utilsService.isNull(value['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (value.hasOwnProperty('toDate')) {
      if (this.utilsService.isNull(value['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (value.hasOwnProperty('zoneId')) {
      if (this.utilsService.isNull(value['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (value.hasOwnProperty('isCounterState')) {
      if (this.readingReportGISReq.isCounterState === true) {
        if (this.utilsService.isNull(this.readingReportGISReq.counterStateId)) {
          this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
          return false;
        }
      }
    }
    return true;
  }
  private periodValidations = (value: object): boolean => {
    if (value.hasOwnProperty('readingPeriodId'))
      if (this.utilsService.isNull(value['readingPeriodId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    if (value.hasOwnProperty('year'))
      if (this.utilsService.isNull(value['year'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    if (value.hasOwnProperty('zoneId'))
      if (this.utilsService.isNull(value['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    return true;
  }
  private periodValidationGIS = (): boolean => {
    if (this.readingReportGISReq.isForbidden === true) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_forbiddenByDate);
      return false;
    }
    if (this.readingReportGISReq.isCounterState === true) {
      if (this.utilsService.isNull(this.readingReportGISReq.counterStateId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
        return false;
      }
    }
    return true;
  }

  // VerificationS
  verificationRRTraverse = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRTraverseDifferential = (readingReportReq: IReadingReportTraverseDifferentialReq, isValidateByDate: boolean): boolean => {
    this.rRTraverseDiffrential = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRKarkard = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRKarkardDaily = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRMaster = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRDetails = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRDisposalHours = (readingReportReq: IReadingReportReq): boolean => {
    this.readingReportReq = readingReportReq;
    return this.datesValidation(readingReportReq);
  }
  verificationRRGIS = (readingReportGISReq: IReadingReportGISReq, isValidateByDate: boolean): boolean => {
    this.readingReportGISReq = readingReportGISReq;
    return isValidateByDate ? this.datesValidation(readingReportGISReq) : this.periodValidationGIS()
  }
  verificationRRAnalyzePerformance = (readingReportReq: IReadingReportWithZoneIDsReq, isValidateByDate: boolean): boolean => {
    this.rRAnalyzeReq = readingReportReq;
    this.convertDates();
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }

  // 
  // snack bar
  convertDates = () => {
    this.rRAnalyzeReq.fromDate = this.utilsService.persianToEngNumbers(this.rRAnalyzeReq.fromDate);
    this.rRAnalyzeReq.toDate = this.utilsService.persianToEngNumbers(this.rRAnalyzeReq.toDate);
  }
  emptyMessage = () => {
    this.utilsService.snackBarMessageFailed(EN_messages.notFound);
  }
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  routeTo = (route: string) => {
    this.utilsService.routeTo(route);
  }
  backToPreviousPage = () => {
    this._location.back();
  }
  routeToMapGIS = () => {
    this.utilsService.routeToByExtras('/wr', { state: { test: this.readingReportGISReq } });
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
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
}
