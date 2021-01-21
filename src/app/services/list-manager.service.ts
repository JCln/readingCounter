import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  columnSelectedLMAll = () => {
    return [
      { field: 'billId', header: 'شناسه قبض', isSelected: true },
      { field: 'trackNumber', header: 'شماره پیگیری', isSelected: true },
      { field: 'radif', header: 'ردیف', isSelected: true },
      { field: 'eshterak', header: 'اشتراک', isSelected: true },
      { field: 'qeraatCode', header: 'کد قرائت', isSelected: false },
      { field: 'firstName', header: 'نام', isSelected: true },
      { field: 'sureName', header: 'نام خانوادگی', isSelected: false },
      { field: 'address', header: 'آدرس', isSelected: false },
      { field: 'pelak', header: 'پلاک', isSelected: false },
      { field: 'karbariCode', header: 'کد کاربری', isSelected: true },
      { field: 'ahadMaskooniOrAsli', header: 'آحاد مسکونی/اصلی', isSelected: true },
      { field: 'ahadTejariOrFari', header: 'آحاد تجاری/فصلی', isSelected: false },
      { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
      { field: 'qotrCode', header: 'قطر', isSelected: true },
      { field: 'sifoonQotrCode', header: 'کد قطر سیفون', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: false },
      { field: 'preNumber', header: 'شماره پیشین', isSelected: false },
      { field: 'preDate', header: 'تاریخ پیشین', isSelected: false },
      { field: 'preAverage', header: 'میانگین پیشین', isSelected: false },
      { field: 'preCounterStateCode', header: 'کد وضعیت قرائت پیشین', isSelected: false },
      { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
      { field: 'counterInstallDate', header: 'متن تست', isSelected: false },
      { field: 'tavizDate', header: 'متن تست', isSelected: false },
      { field: 'tavizNumber', header: 'متن تست', isSelected: false },
      { field: 'zarfiat', header: 'متن تست', isSelected: false },
      { field: 'mobile', header: 'متن تست', isSelected: false },
      { field: 'hazf', header: 'متن تست', isSelected: false },
      { field: 'hasError', header: 'متن تست', isSelected: false },
      { field: 'errorDescription', header: 'متن تست', isSelected: false },
      { field: 'zoneId', header: 'متن تست', isSelected: false },
      { field: 'counterNumber', header: 'متن تست', isSelected: false },
      { field: 'counterStateId', header: 'متن تست', isSelected: false },
      { field: 'counterStateCode', header: 'متن تست', isSelected: false },
      { field: 'possibleAddress', header: 'متن تست', isSelected: false },
      { field: 'possibleCounterSerial', header: 'متن تست', isSelected: false },
      { field: 'possibleEshterak', header: 'متن تست', isSelected: false },
      { field: 'possibleMobile', header: 'متن تست', isSelected: false },
      { field: 'possiblePhoneNumber', header: 'متن تست', isSelected: false },
      { field: 'possibleAhadMaskooniOrAsli', header: 'متن تست', isSelected: false },
      { field: 'possibleAhadTejariOrFari', header: 'متن تست', isSelected: false },
      { field: 'possibleAhadSaierOrAbBaha', header: 'متن تست', isSelected: false },
      { field: 'possibleKarbariCode', header: 'متن تست', isSelected: false },
      { field: 'offloadDateJalali', header: 'متن تست', isSelected: false },
      { field: 'offLoadTime', header: 'متن تست', isSelected: false },
      { field: 'y', header: 'متن تست', isSelected: false },
      { field: 'x', header: 'متن تست', isSelected: false },
      { field: 'gisAccuracy', header: 'متن تست', isSelected: false },
      { field: 'imageCount', header: 'متن تست', isSelected: false },
      { field: 'masraf', header: 'متن تست', isSelected: false },
      { field: 'eslahType', header: 'متن تست', isSelected: false },
      { field: 'newRate', header: 'متن تست', isSelected: false },
      { field: 'dateDifference', header: 'متن تست', isSelected: false },
      { field: 'counterNumberShown', header: 'متن تست', isSelected: false },
      { field: 'excludedForBazdid', header: 'متن تست', isSelected: false },
      { field: 'masrafStateId', header: 'متن تست', isSelected: false },
      { field: 'description', header: 'متن تست', isSelected: false },
    ];
  }
  columnSelectedLMPerDay = () => {
    return [
      { field: 'day', header: 'روز', isSelected: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true },
      { field: 'readCount', header: 'تعداد قرائت', isSelected: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: false },
      { field: 'manePercent', header: 'درصد مانع', isSelected: false },
      { field: 'xarabFaqedCount', header: 'تعداد فاقد و خراب', isSelected: false },
      { field: 'xarabFaqedPercent', header: 'درصد فاقد و خراب', isSelected: false },
      { field: 'fromTime', header: 'از زمان', isSelected: true },
      { field: 'toTime', header: 'تا زمان', isSelected: true },
      { field: 'duration', header: 'مدت', isSelected: true },
      { field: 'distance', header: 'فاصله', isSelected: true },
    ];
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  getLMAll = (trackingId: string): Observable<any> => {
    return this.interfaceManagerService.getLMAll(trackingId);
  }
  getLMPD = (trackNumber: string): Observable<any> => {
    return this.interfaceManagerService.getLMPD(trackNumber);
  }
  postLMPDXY = (body: object): Observable<any> => {
    return this.interfaceManagerService.postLMPDXY(body);
  }

}
