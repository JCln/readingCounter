import { Injectable } from '@angular/core';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IReadingReportReq } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  private readingReportReq: IReadingReportReq;

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
      { field: 'counterReaderName', header: 'مامور قرائت', isSelected: true, readonly: true },
      { field: 'offloadDateJalali', header: 'تاریخ بارگذاری', isSelected: true, readonly: true },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
      { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false, readonly: true }
    ];
  }
  columnSelectedRRTraverse = (): IObjectIteratation[] => {
    return [
      { field: 'billId', header: 'شناسه قبض', isSelected: true, readonly: true },
      { field: 'radif', header: 'ردیف', isSelected: true, readonly: true },
      { field: 'eshterak', header: 'اشتراک', isSelected: true, readonly: false },
      { field: 'fulName', header: 'نام نام خانوادگی', isSelected: true, readonly: true },
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
      { field: 'counterReaderName', header: 'مامور قرائت', isSelected: false, readonly: true },
      { field: 'offloadDateJalali', header: 'تاریخ بارگذاری', isSelected: false, readonly: true },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false, readonly: true },
      { field: 'possibleCounterSerial', header: 'سریال کنتور پیمایش', isSelected: false, readonly: false },
      { field: 'mobile', header: 'موبایل', isSelected: false, readonly: true },
      { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false, readonly: true },
      { field: 'possibleEmpty', header: 'خالی پیمایش', isSelected: false, readonly: true }
    ];
  }
  columnSelectedRRKarkard = (): IObjectIteratation[] => {
    return [
      { field: '', header: 'ش قبض', isSelected: true, readonly: true },
      { field: '', header: 'ردیف', isSelected: false, readonly: true },
      { field: '', header: 'اشتراک', isSelected: false, readonly: true },
      { field: '', header: 'نام و نام خانوادگی', isSelected: true, readonly: true },
      { field: '', header: 'نشانی', isSelected: false, readonly: true },
      { field: '', header: 'کاربری', isSelected: false, readonly: true },
      { field: '', header: 'کاربری پیمایش', isSelected: false, readonly: true },
      { field: '', header: 'آحاد مسکونی/اصلی', isSelected: true, readonly: true },
      { field: '', header: 'مسکونی/اصلی پیمایش', isSelected: false, readonly: true },
      { field: '', header: 'آحاد تجاری/فصلی', isSelected: false, readonly: true },
      { field: '', header: 'تجاری/فصلی پیمایش', isSelected: false, readonly: true },
      { field: '', header: 'آحاد سایر/آبها', isSelected: false, readonly: true },
      { field: '', header: 'سایر/آبها پیمایش', isSelected: false, readonly: true },
      { field: '', header: 'گزارش', isSelected: true, readonly: true },
      { field: '', header: 'مامور قرائت', isSelected: true, readonly: true },
      { field: '', header: 'تاریخ بارگذاری', isSelected: true, readonly: true },
      { field: '', header: 'سریال کنتور', isSelected: false, readonly: true },
      { field: '', header: 'سریال پیمایش', isSelected: false, readonly: true }
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService
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
  getCounterStateDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getCounterStateDictionary());
    });
  }
  //
  private nullTheDates = (): boolean => {
    this.readingReportReq.fromDate = '';
    this.readingReportReq.toDate = '';
    return;
  }
  private nullTheReadingPeriodId = (): boolean => {
    this.readingReportReq.readingPeriodId = null;
    this.readingReportReq.year = 0;
    return;
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

  // VerificationS
  verificationRRTraverse = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return (isValidateByDate ? (this.datesValidationTraverse() || this.nullTheReadingPeriodId()) : (this.periodValidationTraverse() || this.nullTheDates()))
  }
  verificationRRKarkard = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return (isValidateByDate ? (this.datesValidationKarkard() || this.nullTheReadingPeriodId()) : (this.periodValidationKarkard() || this.nullTheDates()))
  }
  verificationRRMaster = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return (isValidateByDate ? (this.datesValidationMaster() || this.nullTheReadingPeriodId()) : (this.periodValidationMaster() || this.nullTheDates()))
  }
  verificationRRDetails = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    this.readingReportReq = readingReportReq;
    return (isValidateByDate ? (this.datesValidationDetails() || this.nullTheReadingPeriodId()) : (this.periodValidationDetails() || this.nullTheDates()))
  }
  // 
  // snack bar
  emptyMessage = () => {
    this.utilsService.snackBarMessageFailed('موردی یافت نشد');
  }
  // 
}
