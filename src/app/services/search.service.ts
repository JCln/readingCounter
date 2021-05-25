import { Injectable } from '@angular/core';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { DictionaryWrapperService } from 'src/app/services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { Search } from '../classes/search';
import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IOnOffLoadFlat, ISearchMoshReq } from '../Interfaces/imanage';
import { IDictionaryManager, IObjectIteratation } from '../Interfaces/ioverall-config';
import { ConverterService } from './converter.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private converterService: ConverterService
  ) { }

  /*COLUMNS*/
  columnSearchMoshtarakin = (): IObjectIteratation[] => {
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
      { field: 'hasError', header: 'خطا', isSelected: false },
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
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  /*API CALLS*/
  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getCounterStateByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  getKarbariDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  searchMoshterakin = (body: ISearchMoshReq): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.ListSearchMoshtarak, body).toPromise().then(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  /*VALIDATION*/
  private validationNull = (object: ISearchMoshReq): boolean => {
    if (object.hasOwnProperty('zoneId')) {
      if (this.utilsService.isNull(object.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (object.hasOwnProperty('searchBy')) {
      if (this.utilsService.isNull(object.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
        return false;
      }
    }
    if (object.hasOwnProperty('item')) {
      if (this.utilsService.isNull(object.item)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
        return false;
      }
    }
    return true;
  }
  private validationNumbers = (object: ISearchMoshReq): boolean => {
    if (object.hasOwnProperty('searchBy')) {
      if (this.utilsService.isNaN(object.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
        return false;
      }
    }
    if (object.hasOwnProperty('zoneId')) {
      if (this.utilsService.isNaN(object.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
        return false;
      }
    }
    return true;
  }
  /*VERIFICATION*/
  verificationMosh = (searchReq: ISearchMoshReq): boolean => {
    return this.validationNull(searchReq) && this.validationNumbers(searchReq)
  }

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
