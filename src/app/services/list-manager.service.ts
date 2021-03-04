import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IObjectIteratation } from '../Interfaces/ioverall-config';



@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  columnSelectedLMAll = (): IObjectIteratation[] => {
    return [
      { field: 'billId', header: 'شناسه قبض', isSelected: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
      { field: 'radif', header: 'ردیف', isSelected: true },
      { field: 'eshterak', header: 'اشتراک', isSelected: true },
      { field: 'qeraatCode', header: 'کد قرائت', isSelected: false },
      { field: 'firstName', header: 'نام', isSelected: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: false },
      { field: 'address', header: 'آدرس', isSelected: false },
      { field: 'pelak', header: 'پلاک', isSelected: false },
      { field: 'karbariCode', header: 'کاربری', isSelected: true },
      { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: true },
      { field: 'ahadTejariOrFari', header: 'تجاری/فصلی', isSelected: false },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
      { field: 'qotrCode', header: 'قطر', isSelected: true },
      { field: 'sifoonQotrCode', header: 'کد قطر سیفون', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: false },
      { field: 'preNumber', header: 'ش پیشین', isSelected: false },
      { field: 'preDate', header: 'تاریخ پیشین', isSelected: false },
      { field: 'preAverage', header: 'میانگین پیشین', isSelected: false },
      { field: 'preCounterStateCode', header: 'وضعیت قرائت', isSelected: false },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
      { field: 'counterInstallDate', header: 'تاریخ نصب', isSelected: false },
      { field: 'tavizDate', header: 'تاریخ تعویض', isSelected: false },
      { field: 'tavizNumber', header: 'ش تعویض', isSelected: false },
      { field: 'zarfiat', header: 'ظرفیت', isSelected: false },
      { field: 'mobile', header: 'موبایل', isSelected: false },
      { field: 'hazf', header: 'حذف', isSelected: false },
      { field: 'hasError', header: 'خطا', isSelected: false },
      { field: 'errorDescription', header: 'توضیح خطا', isSelected: false },
      { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'counterNumber', header: 'ش کنتور', isSelected: false },
      { field: 'possibleAddress', header: 'آدرس پیمایش', isSelected: false },
      { field: 'possibleCounterSerial', header: 'سریال پیمایش', isSelected: false },
      { field: 'possibleEshterak', header: 'اشتراک پیمایش', isSelected: false },
      { field: 'possibleMobile', header: 'موبایل پیمایش', isSelected: false },
      { field: 'possiblePhoneNumber', header: 'تلفن پیمایش', isSelected: false },
      { field: 'possibleAhadMaskooniOrAsli', header: 'مسکونی/اصلی پیمایش', isSelected: false },
      { field: 'possibleAhadTejariOrFari', header: 'تجاری/فرعی پیمایش', isSelected: false },
      { field: 'possibleAhadSaierOrAbBaha', header: 'آحاد/سایر/آبها پیمایش', isSelected: false },
      { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
      { field: 'y', header: 'Y', isSelected: false },
      { field: 'x', header: 'X', isSelected: false },
      { field: 'gisAccuracy', header: 'دقت', isSelected: false },
      { field: 'imageCount', header: 'تعداد تصویر', isSelected: false },
      { field: 'masraf', header: 'مصرف', isSelected: false },
      { field: 'eslahType', header: 'اصلاح', isSelected: false },
      { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
      { field: 'dateDifference', header: 'طول دوره', isSelected: false },
      { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: false },
      { field: 'description', header: 'توضیحات', isSelected: false },
    ];
  }
  columnSelectedLMPerDay = (): IObjectIteratation[] => {
    return [
      { field: 'day', header: 'روز', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true },
      { field: 'readCount', header: 'تعداد قرائت', isSelected: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: false },
      { field: 'manePercent', header: 'درصد مانع', isSelected: false },
      { field: 'xarabFaqedCount', header: 'تعداد فاقد/خراب', isSelected: false },
      { field: 'xarabFaqedPercent', header: 'درصد فاقد/خراب', isSelected: false },
      { field: 'fromTime', header: 'از زمان', isSelected: true },
      { field: 'toTime', header: 'تا زمان', isSelected: true },
      { field: 'duration', header: 'مدت', isSelected: true },
      { field: 'distance', header: 'فاصله', isSelected: true },
    ];
  }
  columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری :', isSelected: true },
      { field: 'listNumber', header: 'ش لیست :', isSelected: true },
      { field: 'counterReaders', header: 'مامور(ها) :', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک :', isSelected: true },
      { field: 'toEshterak', header: 'تا اشتراک :', isSelected: true },
      { field: 'overalCount', header: 'تعداد کل :', isSelected: true },
      { field: 'readCount', header: 'قرائت شده :', isSelected: true },
      { field: 'overalDistance', header: 'مسافت کل :', isSelected: true },
      { field: 'overalDuration', header: 'زمان کل :', isSelected: true }

    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  getLMAll = (trackingId: string): Observable<any> => {
    return this.interfaceManagerService.getLMAll(trackingId);
  }
  getLMAllZoneDictionary = (): Observable<any> => {
    return this.interfaceManagerService.getZoneDictionaryManager();
  }
  getKarbariDictionary = (): Observable<any> => {
    return this.interfaceManagerService.getKarbariDictionary();
  }
  getQotrDictionary = (): Observable<any> => {
    return this.interfaceManagerService.getQotrDictionary();
  }
  getCounterStateDictionary = (): Observable<any> => {
    return this.interfaceManagerService.getCounterStateDictionary();
  }
  getLMPD = (trackNumber: number): Observable<any> => {
    return this.interfaceManagerService.getLMPD(trackNumber);
  }
  postLMPDXY = (body: object): Observable<any> => {
    return this.interfaceManagerService.postLMPDXY(body);
  }

}
