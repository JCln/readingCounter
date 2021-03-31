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
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getReadingPeriodKindManagerDictionary().subscribe((res: any) => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
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
  nullThePeriodities = () => {
    this.readingReportReq.readingPeriodId = '';
    this.readingReportReq.year = 0;
  }
  nullTheDates = () => {
    this.readingReportReq.fromDate = '';
    this.readingReportReq.toDate = '';
  }
  datesValidationMaster = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    this.nullThePeriodities();
    return true;
  }
  datesValidationDetails = (): boolean => {
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
    this.nullThePeriodities();
    return true;
  }
  periodValidation = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    this.nullTheDates();
    return true;
  }
  periodValidationDetails = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    this.nullTheDates();
    return true;
  }
  verificationRRMaster = (readingReportReq: IReadingReportReq): boolean | IReadingReportReq => {
    this.readingReportReq = readingReportReq;
    console.log(this.readingReportReq);

    if (this.utilsService.isNull(readingReportReq.readingPeriodId)) {
      console.log(this.readingReportReq);
      return this.datesValidationMaster();
    }
    if (!this.periodValidation()) {
      console.log(this.readingReportReq);
      return false;
    }
    console.log(this.readingReportReq);
    return this.readingReportReq;
  }
  verificationRRDetails = (readingReportReq: IReadingReportReq): boolean | IReadingReportReq => {
    this.readingReportReq = readingReportReq;
    if (this.utilsService.isNull(readingReportReq.readingPeriodId)) {
      return this.datesValidationDetails();
    }
    if (!this.periodValidationDetails())
      return false;
    return this.readingReportReq;
  }

  datesValidationTraverse = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    this.nullThePeriodities();
    return true;
  }
  datesValidationKarkard = (): boolean => {
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
    this.nullThePeriodities();
    return true;
  }
  periodValidationTraverse = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    this.nullTheDates();
    return true;
  }
  periodValidationKarkard = (): boolean => {
    if (this.utilsService.isNull(this.readingReportReq.year)) {
      this.utilsService.snackBarMessageWarn('سالی وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.readingReportReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    this.nullTheDates();
    return true;
  }
  verificationRRTraverse = (readingReportReq: IReadingReportReq): boolean | IReadingReportReq => {
    this.readingReportReq = readingReportReq;
    console.log(this.readingReportReq);

    if (this.utilsService.isNull(readingReportReq.readingPeriodId)) {
      console.log(this.readingReportReq);
      return this.datesValidationMaster();
    }
    if (!this.periodValidation()) {
      console.log(this.readingReportReq);
      return false;
    }
    console.log(this.readingReportReq);
    return this.readingReportReq;
  }
  verificationRRKarkard = (readingReportReq: IReadingReportReq): boolean | IReadingReportReq => {
    this.readingReportReq = readingReportReq;
    if (this.utilsService.isNull(readingReportReq.readingPeriodId)) {
      return this.datesValidationDetails();
    }
    if (!this.periodValidationDetails())
      return false;
    return this.readingReportReq;
  }
}
