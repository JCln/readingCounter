import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IReadingReportGISReq, IReadingReportReq } from './../Interfaces/imanage';
import { ITitleValue } from './../Interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  private readingReportReq: IReadingReportReq;
  private readingReportGISReq: IReadingReportGISReq;

  columnSelectedRRMaster = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'کد ناحیه', isSelected: true, readonly: false },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true, readonly: true },
      { field: 'reportId', header: 'گزارش', isSelected: true, readonly: true },
      { field: 'reportTitle', header: 'عنوان گزارش', isSelected: true, readonly: true },
      { field: 'itemCount', header: 'تعداد', isSelected: true, readonly: true }
    ];
  }
  columnSelectedRRDetails = (): IObjectIteratation[] => {
    return [
      { field: 'billId', header: 'ش قبض', isSelected: true, readonly: true },
      { field: 'radif', header: 'ردیف', isSelected: false, readonly: true },
      { field: 'eshterak', header: 'اشتراک', isSelected: false, readonly: true },
      { field: 'fulName', header: 'نام و نام خانوادگی', isSelected: true, readonly: true },
      { field: 'address', header: 'نشانی', isSelected: false, readonly: true },
      { field: 'karbariCode', header: 'کاربری', isSelected: false, readonly: true },
      { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false, readonly: true },
      { field: 'ahadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی', isSelected: true, readonly: true },
      { field: 'possibleAhadMaskooniOrAsli', header: 'مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
      { field: 'ahadTejariOrFari', header: 'آحاد تجاری/فصلی', isSelected: false, readonly: true },
      { field: 'possibleAhadTejariOrFari', header: 'تجاری/فصلی پیمایش', isSelected: false, readonly: true },
      { field: 'ahadSaierOrAbBaha', header: 'آحاد سایر/آبها', isSelected: false, readonly: true },
      { field: 'possibleSaierOrAbBaha', header: 'سایر/آبها پیمایش', isSelected: false, readonly: true },
      { field: 'reportTitle', header: 'گزارش', isSelected: true, readonly: true },
      { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
      { field: 'offloadDateJalali', header: 'روز', isSelected: true, readonly: true },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
      { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false, readonly: true }
    ];
  }
  columnSelectedRRTraverse = (): IObjectIteratation[] => {
    return [
      { field: 'billId', header: 'شناسه قبض', isSelected: true, readonly: true },
      { field: 'radif', header: 'ردیف', isSelected: true, readonly: true },
      { field: 'eshterak', header: 'اشتراک', isSelected: true, readonly: false },
      { field: 'fulName', header: 'نام و نام خانوادگی', isSelected: true, readonly: true },
      { field: 'address', header: 'نشانی', isSelected: true, readonly: true },
      { field: 'possibleAddress', header: 'نشانی پیمایش', isSelected: false, readonly: true },
      { field: 'karbariCode', header: 'کد کاربری', isSelected: false, readonly: false },
      { field: 'possibleKarbariCode', header: 'کد کاربری پیمایش', isSelected: true, readonly: true },
      { field: 'ahadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی', isSelected: false, readonly: true },
      { field: 'possibleAhadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
      { field: 'ahadTejariOrFari', header: 'آحاد تجاری/فصلی', isSelected: false, readonly: false },
      { field: 'possibleAhadTejariOrFari', header: 'آحاد تجاری/فصلی پیمایش', isSelected: false, readonly: true },
      { field: 'ahadSaierOrAbBaha', header: 'آحاد سایر/آبها', isSelected: false, readonly: true },
      { field: 'possibleSaierOrAbBaha', header: 'سایر/آبها پیمایش', isSelected: false, readonly: false },
      { field: 'counterReaderName', header: 'مامور', isSelected: false, readonly: true },
      { field: 'offloadDateJalali', header: 'روز', isSelected: false, readonly: true },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
      { field: 'possibleCounterSerial', header: 'سریال کنتور پیمایش', isSelected: false, readonly: false },
      { field: 'mobile', header: 'موبایل', isSelected: false, readonly: true },
      { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false, readonly: true },
      { field: 'possibleEmpty', header: 'خالی پیمایش', isSelected: false, readonly: true }
    ];
  }
  columnSelectedRRKarkard = (): IObjectIteratation[] => {
    return [
      { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
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
      { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true }
    ];
  }
  columnSelectedRRKarkardDaly = (): IObjectIteratation[] => {
    return [
      { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
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
      { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true }
    ];
  }
  columnSelectedRRDisposalHours = (): IObjectIteratation[] => {
    return [
      { field: 'dayJalali', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
      { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
      { field: 'overalCount', header: 'تعداد', isSelected: true, readonly: true },
      { field: '_8To10', header: '8 - 10', isSelected: true, readonly: true },
      { field: '_10To12', header: '10 - 12', isSelected: true, readonly: true },
      { field: '_12To14', header: '12 - 14', isSelected: true, readonly: true },
      { field: '_14To16', header: '14 - 16', isSelected: true, readonly: true },
      { field: '_16To18', header: '16 - 18', isSelected: true, readonly: true },
      { field: 'saierCount', header: 'سایر', isSelected: true, readonly: true },
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private _location: Location
  ) { }

  // call APIs
  postRRMasterManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRMasterManager(this.readingReportReq).subscribe((res) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }

  }
  postRRTraverseManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRTraverseManager(this.readingReportReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postRRKarkardManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRKarkardManager(this.readingReportReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postRRKarkardChartManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRKarkardChartManager(this.readingReportReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postRRKarkardDailyManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRKarkardDailyManager(this.readingReportReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postRRGISManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRGISManager(this.readingReportGISReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postRRDisposalHoursManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRDisposalHoursanager(this.readingReportReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postRRDetailsManager = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postRRDetailsManager(this.readingReportReq).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodByKindManagerDictionary(kindId).subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getPeriodKindDictionary());
    });
  }
  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }
  getKarbariDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getKarbariDictionary());
    });
  }
  getCounterStateByZoneIdDictionary = (zoneId: number): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId));
    });
  }


  private datesValidationMaster = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }
  private periodValidationMaster = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn('دوره قرائتی وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    return true;
  }

  private datesValidationDetails = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }
  private periodValidationDetails = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn('دوره قرائت را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    return true;
  }

  private datesValidationTraverse = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }
  private periodValidationTraverse = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn('دوره قرائت را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    return true;
  }

  private datesValidationKarkard = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }
  private periodValidationKarkard = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn('دوره قرائت را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    return true;
  }

  private datesValidationKarkardDaily = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }
  private periodValidationKarkardDaily = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn('دوره قرائت را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    return true;
  }

  private datesValidationDisposalHours = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }

  private datesValidationGIS = (): boolean => {
    if (this.readingReportGISReq.isCounterState === true) {
      if (this.utilsService.isNull(this.readingReportGISReq.counterStateId)) {
        this.utilsService.snackBarMessageWarn('وضعیت کنتور را مشخص نمایید');
        return false;
      }
    }
    if (this.utilsService.isNull(this.readingReportGISReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportGISReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportGISReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }
  private periodValidationGIS = (): boolean => {
    if (this.readingReportGISReq.isForbidden === true) {
      this.utilsService.snackBarMessageWarn('مشاهده غیر مجاز تنها با تاریخ امکان پذیر است');
      return false;
    }
    if (this.readingReportGISReq.isCounterState === true) {
      if (this.utilsService.isNull(this.readingReportGISReq.counterStateId)) {
        this.utilsService.snackBarMessageWarn('وضعیت کنتور را مشخص نمایید');
        return false;
      }
    }
    if (this.utilsService.isNull(this.readingReportGISReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportGISReq.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn('دوره قرائت را وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportGISReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    return true;
  }

  // VerificationS
  verificationRRTraverse = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidationTraverse() : this.periodValidationTraverse()
  }
  verificationRRKarkard = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidationKarkard() : this.periodValidationKarkard()
  }
  verificationRRKarkardDaily = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidationKarkardDaily() : this.periodValidationKarkardDaily()
  }
  verificationRRMaster = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidationMaster() : this.periodValidationMaster()
  }
  verificationRRDetails = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return isValidateByDate ? this.datesValidationDetails() : this.periodValidationDetails()
  }
  verificationRRDisposalHours = (readingReportReq: IReadingReportReq): boolean => {
    this.readingReportReq = readingReportReq;
    return this.datesValidationDisposalHours();
  }
  verificationRRGIS = (readingReportGISReq: IReadingReportGISReq, isValidateByDate: boolean): boolean => {
    this.readingReportGISReq = readingReportGISReq;
    return isValidateByDate ? this.datesValidationGIS() : this.periodValidationGIS()
  }
  // 
  // snack bar
  emptyMessage = () => {
    this.utilsService.snackBarMessageFailed('موردی یافت نشد');
  }
  getYears = (): ITitleValue[] => {
    return [
      { title: '1400', value: 1400 },
      { title: '1399', value: 1399 },
      { title: '1398', value: 1398 },
      { title: '1397', value: 1397 },
      { title: '1396', value: 1396 },
      { title: '1395', value: 1395 }
    ];
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
}
