import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IOnOffLoadFlat } from '../Interfaces/imanage';
import { IDictionaryManager, IObjectIteratation } from '../Interfaces/ioverall-config';
import { CloseTabService } from './close-tab.service';
import { ConverterService } from './converter.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  private readingListGUID: string;
  private readingListGUID_extra: string;
  private saveTo: number = 0;

  columnSelectedLMAll = (): IObjectIteratation[] => {
    return [
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
      { field: 'counterStateCode', header: 'وضعیت کنتور', isSelected: true },
      { field: 'address', header: 'آدرس', isSelected: false },
      { field: 'pelak', header: 'پلاک', isSelected: false },
      { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
      { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
      { field: 'qotrCode', header: 'قطر', isSelected: false },
      // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: false },
      { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
      { field: 'preCounterStateCode', header: 'وضعیت قرائت قبلی', isSelected: false },
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
      { field: 'imageCount', header: 'تعداد تصویر', isSelected: false },
      { field: 'masraf', header: 'مصرف', isSelected: false },
      { field: 'eslahType', header: 'اصلاح', isSelected: false },
      { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
      { field: 'dateDifference', header: 'طول دوره', isSelected: false },
      { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
      { field: 'description', header: 'توضیحات', isSelected: false }
    ];
  }
  columnSelectedLMPerDay = (): IObjectIteratation[] => {
    return [
      { field: 'day', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true },
      { field: 'readCount', header: 'تعداد قرائت', isSelected: true, readonly: true },
      { field: 'fromTime', header: 'از ساعت', isSelected: true, readonly: true },
      { field: 'toTime', header: 'تا ساعت', isSelected: true, readonly: true },
      { field: 'duration', header: 'مدت', isSelected: true, readonly: true },
      { field: 'distance', header: 'فاصله', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: false, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: false, readonly: true },
      { field: 'xarabFaqedCount', header: 'تعداد فاقد/خراب', isSelected: false, readonly: true },
      { field: 'xarabFaqedPercent', header: 'درصد فاقد/خراب', isSelected: false, readonly: true }
    ];
  }
  columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true, readonly: true },
      { field: 'counterReaders', header: 'مامور(ها)', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
      { field: 'overalDistance', header: 'مسافت کل', isSelected: true, readonly: true },
      { field: 'overalDuration', header: 'زمان کل', isSelected: true, readonly: true }

    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private closeTabService: CloseTabService,
    private utilsService: UtilsService,
    private converterService: ConverterService
  ) { }

  whereToSave = (): number => {
    return this.saveTo == 0 ? this.saveTo = 1 : this.saveTo = 0
  }
  nullSavedAllLMSource = () => {
    this.saveTo === 0 ? this.closeTabService.saveDataForLMAll = null : this.closeTabService.saveDataForLMAll_extra = null
  }
  getLMAll = (trackingId: string): Promise<any> | IOnOffLoadFlat[] => {
    // console.log(this.closeTabService.saveDataForLMAll);
    // if (!this.utilsService.isNull(this.closeTabService.saveDataForLMAll))
    //   return this.closeTabService.saveDataForLMAll;
    if (this.readingListGUID === trackingId && !this.utilsService.isNull(this.closeTabService.saveDataForLMAll))
      return this.closeTabService.saveDataForLMAll;
    if (this.readingListGUID_extra === trackingId && !this.utilsService.isNull(this.closeTabService.saveDataForLMAll))
      return this.closeTabService.saveDataForLMAll_extra;

    if (this.whereToSave() == 0) {
      this.readingListGUID = trackingId;
      return this.getLMAllFirst(trackingId);
    }
    else {
      this.readingListGUID_extra = trackingId;
      return this.getLMAllExtra(trackingId);
    }
  }
  getLMAllFirst = (trackingId: string): Promise<any> | IOnOffLoadFlat[] => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.ListOffloadedALL, trackingId).subscribe(res => {
          this.closeTabService.saveDataForLMAll = res;
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getLMAllExtra = (trackingId: string): Promise<any> | IOnOffLoadFlat[] => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.ListOffloadedALL, trackingId).subscribe(res => {
          this.closeTabService.saveDataForLMAll_extra = res;
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getLMAllZoneDictionary = () => {
    return this.dictionaryWrapperService.getZoneDictionary();
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
  getLMPD = (trackNumber: number): Observable<any> => {
    return this.interfaceManagerService.GETByQuote(ENInterfaces.ListOffloadedPERDAY, trackNumber);
  }
  postLMPDXY = (body: object): Observable<any> => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.ListPerDayXY, body);
  }
  /*OTHER */
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(this.utilsService.getRange(item.newRate))
      if (item.gisAccuracy)
        item.gisAccuracy = this.utilsService.getRange(item.gisAccuracy)
    })
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }
}
