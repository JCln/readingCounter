import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import {
  IMostReportInput,
  IReadingReportGISReq,
  IReadingReportReq,
  IReadingReportTraverseDifferentialReq,
} from 'interfaces/imanage';
import { ENSelectedColumnVariables, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { ENReadingReports } from 'interfaces/reading-reports';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';

import { Converter } from './../classes/converter';

@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  private readingReportReq: IReadingReportReq;
  masterReq: IReadingReportReq = {
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  };
  detailsReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  private readingReportGISReq: IReadingReportGISReq;
  private rRTraverseDiffrential: IReadingReportTraverseDifferentialReq;
  private rRAnalyzeReq: IMostReportInput;

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
  getRRAnalyzeReq(): IMostReportInput {
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
    { field: 'standardDeviation', header: 'انحراف از معیار', isSelected: true, readonly: false },
    { field: 'median', header: 'میانه', isSelected: true, readonly: false },
    { field: 'mode', header: 'مٌد', isSelected: true, readonly: false },
    { field: 'duration', header: 'مدت(h)', isSelected: false, readonly: false }
  ];
  private _RRMaster = [
    // { field: 'zoneId', header: 'کد ناحیه', isSelected: true, readonly: false },
    { field: 'zoneTitle', header: 'ناحیه', isSelected: true, readonly: true },
    { field: 'reportTitle', header: 'عنوان گزارش', isSelected: true, readonly: true },
    { field: 'reportId', header: 'گزارش', isSelected: true, readonly: true },
    { field: 'itemCount', header: 'تعداد', isSelected: true, readonly: true }
  ]
  private _RRDetails = [
    { field: 'billId', header: 'ش قبض', isSelected: false, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'radif', header: 'ش.پرونده', isSelected: false, readonly: true },
    { field: 'eshterak', header: 'اشتراک', isSelected: true, readonly: true },
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
    { field: 'billId', header: 'شناسه قبض', isSelected: false, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'radif', header: 'ش.پرونده', isSelected: false, readonly: true },
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
    { field: 'billId', header: 'شناسه قبض', isSelected: false },
    { field: 'radif', header: 'ش.پرونده', isSelected: false },
    { field: 'eshterak', header: 'اشتراک', isSelected: true },
    { field: 'fulName', header: 'نام و نام خانوادگی', isSelected: true },
    { field: 'address', header: 'آدرس', isSelected: false },
    { field: 'offloadDateJalali', header: 'روز', isSelected: true },
    { field: 'description', header: 'توضیحات', isSelected: false, readonly: false },
    { field: 'value', header: 'مقدار قدیم', isSelected: true },
    { field: 'newValue', header: 'مقدار جدید', isSelected: true },
  ]
  private _RRKarkard: IObjectIteratation[] = [
    // { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'zoneTitle', header: 'ناحیه', isSelected: false, isSelectOption: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    // { field: 'fromTime', header: 'از ساعت', isSelected: true, readonly: true },
    // { field: 'toTime', header: 'تا ساعت', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true, ltr: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true, ltr: true },
    { field: 'duration', header: 'مدت(h)', isSelected: false, readonly: true },
    { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
    { field: 'adiCount', header: 'عادی', isSelected: true, readonly: true },
    { field: 'faqedCount', header: 'فاقد', isSelected: true, readonly: true },
    { field: 'maneCount', header: 'مانع', isSelected: true, readonly: true },
    { field: 'xarabCount', header: 'خراب', isSelected: true, readonly: true },
    { field: 'tavizCount', header: 'تعویض', isSelected: true, readonly: true },
    { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true },
  ]
  private _RRKarkardDaily = [
    { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    { field: 'fromTime', header: 'از', isSelected: true, readonly: true },
    { field: 'toTime', header: 'تا', isSelected: true, readonly: true },
    { field: 'duration', header: 'مدت(h)', isSelected: true, readonly: true },
    { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
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
    { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
    { field: '_8To10', header: '8 - 10', isSelected: true, readonly: true },
    { field: '_10To12', header: '10 - 12', isSelected: true, readonly: true },
    { field: '_12To14', header: '12 - 14', isSelected: true, readonly: true },
    { field: '_14To16', header: '14 - 16', isSelected: true, readonly: true },
    { field: '_16To18', header: '16 - 18', isSelected: true, readonly: true },
    { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true, ltr: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true, ltr: true }
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
    private _location: Location,
    private router: Router
  ) { }

  // CALL APIs

  portRRTest = (method: ENInterfaces, val: object): Promise<any> => {
    console.log(method, val);
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).subscribe((res) => {
        if (this.utilsService.isNull(res))
          this.emptyMessage();
        resolve(res)
      })
    });
  }
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
  postRRManagerOnMap = (method: ENInterfaces, val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).subscribe((res) => {
        if (this.utilsService.isNull(res))
          this.emptyMessage();
        resolve(res)
      })
    });
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
  insertToReadingReport = (name: ENReadingReports, val: object) => {
    this[name] = val;
  }
  verificationRRShared = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRTraverseDifferential = (readingReportReq: IReadingReportTraverseDifferentialReq, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    this.rRTraverseDiffrential = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRDisposalHours = (readingReportReq: IReadingReportReq): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    this.readingReportReq = readingReportReq;
    return this.datesValidation(readingReportReq);
  }
  verificationRRGIS = (readingReportGISReq: IReadingReportGISReq, isValidateByDate: boolean): boolean => {
    readingReportGISReq.fromDate = Converter.persianToEngNumbers(readingReportGISReq.fromDate);
    readingReportGISReq.toDate = Converter.persianToEngNumbers(readingReportGISReq.toDate);
    this.readingReportGISReq = readingReportGISReq;
    return isValidateByDate ? this.datesValidation(readingReportGISReq) : this.periodValidationGIS()
  }
  verificationRRAnalyzePerformance = (readingReportReq: IMostReportInput, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    this.rRAnalyzeReq = readingReportReq;
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }

  // 
  // snack bar
  convertDates = () => {
    this.rRAnalyzeReq.fromDate = Converter.persianToEngNumbers(this.rRAnalyzeReq.fromDate);
    this.rRAnalyzeReq.toDate = Converter.persianToEngNumbers(this.rRAnalyzeReq.toDate);
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
  routeToByObject = (router: string, val: object) => {
    this.router.navigate([router, val]);
  }
  backToPreviousPage = () => {
    this._location.back();
  }
  routeToMapGIS = () => {
    this.router.navigate(['/wr', this.readingReportGISReq]);
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
