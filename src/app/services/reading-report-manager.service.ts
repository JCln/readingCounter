import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IMostReportInput } from 'interfaces/imanage';
import { IImportDataResponse } from 'interfaces/import-data';
import { ENSelectedColumnVariables, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportGISReq, IReadingReportReq, IReadingReportTraverseDifferentialReq } from 'interfaces/ireports';
import { ENReadingReports } from 'interfaces/reading-reports';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';

import { Converter } from '../classes/converter';
import { MathS } from '../classes/math-s';
import { ConfirmDialogComponent } from '../frame-work/import-data/import-dynamic/confirm-dialog/confirm-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENReadingReports = ENReadingReports;

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
  disposalhoursReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  karkardReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  lockedReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  preNumberShownReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  karkardOffloadReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  karkardDailyReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  gisReq: IReadingReportGISReq = {
    zoneId: 0,
    isCounterState: true,
    counterStateId: 0,
    isKarbariChange: false,
    isAhadChange: false,
    isForbidden: false,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400,
    isCluster: true
  }
  anlzPrfmReq: IMostReportInput = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400,
    zoneIds: [0]
  }
  trvchReq: IReadingReportTraverseDifferentialReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400,
    traverseType: 0,
    zoneIds: null
  }
  traverseReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  /* GET*/

  receiveFromDateJalali = (variable: ENReadingReports, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENReadingReports, $event: string) => {
    this[variable].toDate = $event;
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
  private _RROffloadedKarkard = [
    // { field: 'zoneId', header: 'ناحیه', isSelected: false, readonly: true },
    { field: 'trackNumber', header: 'ش پیگیری', isSelected: true, readonly: true },
    { field: 'offloadDayalali', header: 'روز', isSelected: true, readonly: true },
    { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
    // { field: 'fromTime', header: 'از', isSelected: true, readonly: true },
    // { field: 'toTime', header: 'تا', isSelected: true, readonly: true },
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
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
    { field: 'zoneTitle', header: 'ناحیه', isSelected: false, readonly: true },
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
  private _RRPreNumberShown: IObjectIteratation[] = [
    { field: 'billId', header: 'شناسه قبض', isSelected: false },
    { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
    { field: 'radif', header: 'ش.پرونده', isSelected: false },
    { field: 'eshterak', header: 'اشتراک', isSelected: true },
    // { field: 'zoneId', header: 'ناحیه', isSelected: false },
    { field: 'qeraatCode', header: 'قرائت', isSelected: false },
    { field: 'firstName', header: 'نام', isSelected: true },
    { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
    { field: 'karbariCode', header: 'کاربری', isSelected: true },
    { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
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
    { field: 'y', header: 'Y', isSelected: false },
    { field: 'x', header: 'X', isSelected: false },
    { field: 'gisAccuracy', header: 'دقت', isSelected: false },
    { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
    { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
    { field: 'masraf', header: 'مصرف', isSelected: false },
    // { field: 'eslahType', header: 'اصلاح', isSelected: false },
    { field: 'excludedForEslah', header: 'اصلاح', isSelected: true, isBoolean: true },
    { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
    { field: 'dateDifference', header: 'طول دوره', isSelected: false },
    { field: 'description', header: 'توضیحات', isSelected: false }
  ]
  private _RRLocked: IObjectIteratation[] = [
    { field: 'billId', header: 'شناسه قبض', isSelected: false },
    { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
    { field: 'radif', header: 'ش.پرونده', isSelected: false },
    { field: 'eshterak', header: 'اشتراک', isSelected: true },
    // { field: 'zoneId', header: 'ناحیه', isSelected: false },
    { field: 'qeraatCode', header: 'قرائت', isSelected: false },
    { field: 'firstName', header: 'نام', isSelected: true },
    { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
    { field: 'karbariCode', header: 'کاربری', isSelected: true },
    { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
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
    { field: 'y', header: 'Y', isSelected: false },
    { field: 'x', header: 'X', isSelected: false },
    { field: 'gisAccuracy', header: 'دقت', isSelected: false },
    { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
    { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
    { field: 'masraf', header: 'مصرف', isSelected: false },
    // { field: 'eslahType', header: 'اصلاح', isSelected: false },
    { field: 'excludedForEslah', header: 'اصلاح', isSelected: true, isBoolean: true },
    { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
    { field: 'dateDifference', header: 'طول دوره', isSelected: false },
    { field: 'description', header: 'توضیحات', isSelected: false }
  ]

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
  columnRRKarkardOffloaded = (): IObjectIteratation[] => {
    return this._RROffloadedKarkard;
  }
  columnRRKarkardDaly = (): IObjectIteratation[] => {
    return this._RRKarkardDaily;
  }
  columnRRLocked = (): IObjectIteratation[] => {
    return this._RRLocked;
  }
  columnRRPreNumberShown = (): IObjectIteratation[] => {
    return this._RRPreNumberShown;
  }
  columnRRDisposalHours = (): IObjectIteratation[] => {
    return this._RRDisposalHours;
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private dialog: MatDialog,
    private _location: Location,
    private router: Router
  ) { }

  // CALL APIs

  getDataSource = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, id).subscribe((res) => {
        resolve(res)
      })
    });
  }
  portRRTest = (method: ENInterfaces, val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).subscribe((res) => {
        if (MathS.isNull(res))
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


  private datesValidation = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('isCounterState')) {
      if (this.gisReq.isCounterState === true) {
        if (MathS.isNull(this.gisReq.counterStateId)) {
          this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
          return false;
        }
      }
    }
    return true;
  }
  private periodValidations = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId'))
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (dataSource.hasOwnProperty('readingPeriodId'))
      if (MathS.isNull(dataSource['readingPeriodId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    if (dataSource.hasOwnProperty('year'))
      if (MathS.isNull(dataSource['year'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    return true;
  }
  private periodValidationGIS = (readingReportGISReq: IReadingReportGISReq): boolean => {
    if (readingReportGISReq.isForbidden === true) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_forbiddenByDate);
      return false;
    }
    if (readingReportGISReq.isCounterState === true) {
      if (MathS.isNull(readingReportGISReq.counterStateId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
        return false;
      }
    }
    return true;
  }

  // VerificationS 
  verificationRRShared = (readingReportReq: any, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRTraverseDifferential = (readingReportReq: IReadingReportTraverseDifferentialReq, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }
  verificationRRDisposalHours = (readingReportReq: IReadingReportReq): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    return this.datesValidation(readingReportReq);
  }
  verificationRRGIS = (readingReportGISReq: IReadingReportGISReq, isValidateByDate: boolean): boolean => {
    readingReportGISReq.fromDate = Converter.persianToEngNumbers(readingReportGISReq.fromDate);
    readingReportGISReq.toDate = Converter.persianToEngNumbers(readingReportGISReq.toDate);
    return isValidateByDate ? this.datesValidation(readingReportGISReq) : this.periodValidationGIS(readingReportGISReq)
  }
  verificationRRAnalyzePerformance = (readingReportReq: IMostReportInput, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }

  // 
  // snack bar
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
  routeToMapGIS = (readingReportGISReq: IReadingReportGISReq) => {
    this.router.navigate(['/wr', readingReportGISReq]);
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
  postById = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
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
  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }


}
