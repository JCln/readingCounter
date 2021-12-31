import { Injectable } from '@angular/core';
import { IObjectIteratation } from 'interfaces/ioverall-config';

@Injectable({
    providedIn: 'root'
})
export class ColumnManager {

    private imgattr: IObjectIteratation[] = [
        { field: 'title', header: 'عنوان', isSelected: true },
    ];
    private reading: IObjectIteratation[] = [
        { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
        { field: 'listNumber', header: 'ش لیست', isSelected: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true },
        // { field: 'zoneId', header: 'ناحیه', isSelected: false },
        { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
        // { field: 'year', header: 'سال', isSelected: false },
        { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
        { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, ltr: true },
        { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, ltr: true },
        { field: 'fromDate', header: 'از', isSelected: false },
        { field: 'toDate', header: 'تا', isSelected: false },
        { field: 'insertTime', header: 'زمان ثبت', isSelected: false },
        { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: false, isNumber: true },
        { field: 'imagePercent', header: 'درصد تصویر', isSelected: false, isNumber: true },
        { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
        { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
        { field: 'description', header: 'توضیحات', isSelected: false }

    ];
    private finished: IObjectIteratation[] = [
        { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
        { field: 'listNumber', header: 'ش لیست', isSelected: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true },
        // { field: 'zoneId', header: 'ناحیه', isSelected: false },
        { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
        // { field: 'year', header: 'سال', isSelected: false },
        { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
        { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, ltr: true },
        { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, ltr: true },
        { field: 'fromDate', header: 'از', isSelected: false },
        { field: 'toDate', header: 'تا', isSelected: false },
        { field: 'insertTime', header: 'زمان ثبت', isSelected: false },
        { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: false, isNumber: true },
        { field: 'imagePercent', header: 'درصد تصویر', isSelected: false, isNumber: true },
        { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
        { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
        { field: 'description', header: 'توضیحات', isSelected: false }

    ];
    private loaded: IObjectIteratation[] = [
        { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
        { field: 'listNumber', header: 'ش لیست', isSelected: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true },
        // { field: 'zoneId', header: 'ناحیه', isSelected: false },
        { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
        // { field: 'year', header: 'سال', isSelected: false },
        { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
        { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, ltr: true },
        { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, ltr: true },
        { field: 'fromDate', header: 'از', isSelected: false },
        { field: 'toDate', header: 'تا', isSelected: false },
        { field: 'insertTime', header: 'زمان ثبت', isSelected: false },
        { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: false, isNumber: true },
        { field: 'imagePercent', header: 'درصد تصویر', isSelected: false, isNumber: true },
        { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
        { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
        { field: 'description', header: 'توضیحات', isSelected: false }

    ];
    private offloaded: IObjectIteratation[] = [
        { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
        { field: 'listNumber', header: 'ش لیست', isSelected: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true },
        // { field: 'zoneId', header: 'ناحیه', isSelected: false },
        { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
        // { field: 'year', header: 'سال', isSelected: false },
        { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
        { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, ltr: true },
        { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, ltr: true },
        { field: 'fromDate', header: 'از', isSelected: false },
        { field: 'toDate', header: 'تا', isSelected: false },
        { field: 'insertTime', header: 'زمان ثبت', isSelected: false },
        { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: false, isNumber: true },
        { field: 'imagePercent', header: 'درصد تصویر', isSelected: false, isNumber: true },
        { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
        { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
        { field: 'description', header: 'توضیحات', isSelected: false }

    ];
    private imported: IObjectIteratation[] = [
        { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
        { field: 'listNumber', header: 'ش لیست', isSelected: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true },
        // { field: 'zoneId', header: 'ناحیه', isSelected: false },
        { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
        // { field: 'year', header: 'سال', isSelected: false },
        { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
        { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, ltr: true },
        { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, ltr: true },
        { field: 'fromDate', header: 'از', isSelected: false },
        { field: 'toDate', header: 'تا', isSelected: false },
        { field: 'insertTime', header: 'زمان ثبت', isSelected: false },
        { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: false, isNumber: true },
        { field: 'imagePercent', header: 'درصد تصویر', isSelected: false, isNumber: true },
        { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
        { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
        { field: 'description', header: 'توضیحات', isSelected: false }

    ];
    private _counterState: IObjectIteratation[] = [
        { field: 'moshtarakinId', header: 'کد مشترکین', isSelected: false, isNumber: true },
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'clientOrder', header: 'ترتیب', isSelected: false, isNumber: true },
        { field: 'forProvince', header: 'همه نواحی', isSelected: false, isBoolean: true },
        { field: 'canEnterNumber', header: 'ثبت رقم', isSelected: true, isBoolean: true },
        { field: 'isMane', header: 'مانع', isSelected: true, isBoolean: true },
        { field: 'canNumberBeLessThanPre', header: 'فعلی کمتر از قبلی', isSelected: false, isBoolean: true },
        { field: 'isTavizi', header: 'تعویضی', isSelected: true, isBoolean: true },
        { field: 'shouldEnterNumber', header: 'اجبار رقم', isSelected: true, isBoolean: true },
        { field: 'isXarab', header: 'خراب', isSelected: true, isBoolean: true },
        { field: 'isFaqed', header: 'فاقد', isSelected: true, isBoolean: true }
    ]
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
        // { field: 'reportId', header: 'گزارش', isSelected: true, readonly: true },
        { field: 'itemCount', header: 'تعداد', isSelected: true, readonly: true }
    ]
    private _imageAttrResult = [
        { field: 'zoneTitle', header: 'ناحیه', isSelected: true, readonly: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
        { field: 'itemTitle', header: 'عنوان گزارش', isSelected: true, readonly: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true, readonly: false },
        // { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true },
    ]
    private _imageAttrAnalyze = [
        { field: 'itemTitle', header: 'عنوان گزارش', isSelected: true, readonly: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true, readonly: true },
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
        { field: 'counterReaderName', header: 'مامور', isSelected: true, readonly: true },
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
        { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, readonly: true },
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
        { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
        { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
        { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
        { field: 'address', header: 'آدرس', isSelected: false },
        { field: 'pelak', header: 'پلاک', isSelected: false },
        { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
        { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
        { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
        { field: 'qotrCode', header: 'قطر', isSelected: false },
        // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
        { field: 'postalCode', header: 'کد پستی', isSelected: false },
        { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
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
        { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
        { field: 'masraf', header: 'مصرف', isSelected: true },
        { field: 'y', header: 'Y', isSelected: false },
        { field: 'x', header: 'X', isSelected: false },
        { field: 'gisAccuracy', header: 'دقت', isSelected: false },
        { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
        // { field: 'eslahType', header: 'اصلاح', isSelected: false },
        { field: 'excludedForEslah', header: 'اصلاح', isSelected: true, isBoolean: true },
        { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
        { field: 'offLoadTime', header: 'زمان', isSelected: false },
        { field: 'dateDifference', header: 'مدت', isSelected: false },
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
        { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
        { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
        { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
        { field: 'address', header: 'آدرس', isSelected: false },
        { field: 'pelak', header: 'پلاک', isSelected: false },
        { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
        { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
        { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
        { field: 'qotrCode', header: 'قطر', isSelected: false },
        // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
        { field: 'postalCode', header: 'کد پستی', isSelected: false },
        { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
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
        { field: 'masraf', header: 'مصرف', isSelected: false },
        // { field: 'eslahType', header: 'اصلاح', isSelected: false },
        { field: 'excludedForEslah', header: 'اصلاح', isSelected: true, isBoolean: true },
        { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
        { field: 'offLoadTime', header: 'زمان', isSelected: false },
        { field: 'dateDifference', header: 'مدت', isSelected: false },
        { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
        { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
        { field: 'description', header: 'توضیحات', isSelected: false }
    ]
    private _searchPro: IObjectIteratation[] =
        [
            { field: 'billId', header: 'شناسه قبض', isSelected: false },
            { field: 'counterReaderName', header: 'مامور', isSelected: true },
            { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
            { field: 'radif', header: 'ش.پرونده', isSelected: false },
            { field: 'eshterak', header: 'اشتراک', isSelected: true },
            { field: 'zoneId', header: 'ناحیه', isSelected: false },
            { field: 'qeraatCode', header: 'قرائت', isSelected: false },
            { field: 'firstName', header: 'نام', isSelected: true },
            { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
            { field: 'karbariCode', header: 'کاربری', isSelected: true },
            { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
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
            { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
            { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
            { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
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
            { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
            { field: 'masraf', header: 'مصرف', isSelected: false },
            { field: 'y', header: 'Y', isSelected: false },
            { field: 'x', header: 'X', isSelected: false },
            { field: 'gisAccuracy', header: 'دقت', isSelected: false },
            { field: 'eslahType', header: 'اصلاح', isSelected: false },
            { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
            { field: 'offLoadTime', header: 'زمان', isSelected: false },
            { field: 'dateDifference', header: 'مدت', isSelected: false },
            { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
            { field: 'description', header: 'توضیحات', isSelected: false }
        ];
    private _searchMosh: IObjectIteratation[] =
        [
            { field: 'billId', header: 'شناسه قبض', isSelected: false },
            { field: 'counterReaderName', header: 'مامور', isSelected: true },
            { field: 'trackNumber', header: 'ش پیگیری', isSelected: false },
            { field: 'radif', header: 'ش.پرونده', isSelected: false },
            { field: 'eshterak', header: 'اشتراک', isSelected: true },
            { field: 'zoneId', header: 'ناحیه', isSelected: false },
            { field: 'qeraatCode', header: 'قرائت', isSelected: false },
            { field: 'firstName', header: 'نام', isSelected: true },
            { field: 'sureName', header: 'نام خانوادگی', isSelected: true },
            { field: 'karbariCode', header: 'کاربری', isSelected: true },
            { field: 'possibleKarbariCode', header: 'کاربری پیمایش', isSelected: false },
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
            { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
            { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
            { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
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
            { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
            { field: 'masraf', header: 'مصرف', isSelected: false },
            { field: 'y', header: 'Y', isSelected: false },
            { field: 'x', header: 'X', isSelected: false },
            { field: 'gisAccuracy', header: 'دقت', isSelected: false },
            { field: 'eslahType', header: 'اصلاح', isSelected: false },
            { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
            { field: 'offLoadTime', header: 'زمان', isSelected: false },
            { field: 'dateDifference', header: 'مدت', isSelected: false },
            { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
            { field: 'description', header: 'توضیحات', isSelected: false }
        ];

    private assess_pre: IObjectIteratation[] =
        [
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
            { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
            { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
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
            { field: 'masrafStateId', header: 'وضعیت مصرف', isSelected: true },
            { field: 'masraf', header: 'مصرف', isSelected: true },
            { field: 'y', header: 'Y', isSelected: false },
            { field: 'x', header: 'X', isSelected: false },
            { field: 'gisAccuracy', header: 'دقت', isSelected: false },
            { field: 'eslahType', header: 'اصلاح', isSelected: false },
            { field: 'newRate', header: 'میانگین مصرف جدید', isSelected: false },
            { field: 'offLoadTime', header: 'زمان', isSelected: false },
            { field: 'dateDifference', header: 'مدت', isSelected: false },
            { field: 'imageCount', header: 'تصویر', isSelected: true, isBoolean: true },
            { field: 'description', header: 'توضیحات', isSelected: false },
            { field: 'isSelected', header: 'انتخاب', isSelected: true, isBoolean: true }
        ]

    private _searchSimple: IObjectIteratation[] = [
        // { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackNumber', header: 'شماره پیگیری', isSelected: true, isNumber: true },
        { field: 'itemQuantity', header: 'تعداد', isSelected: true, isNumber: true },
        { field: 'listNumber', header: 'ش لیست', isSelected: true },
        { field: 'isBazdid', header: 'بازدید', isSelected: true, isBoolean: true },
        { field: 'isRoosta', header: 'روستا', isSelected: true, isBoolean: true },
        { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
        { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
        { field: 'fromDate', header: 'از', isSelected: false },
        { field: 'toDate', header: 'تا', isSelected: false },
        { field: 'overallQuantity', header: 'کل تعداد', isSelected: false, isNumber: true },
        { field: 'trackStatusTitle', header: 'وضعیت', isSelected: false }
    ]
    private _auth1: IObjectIteratation[] = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
        { field: 'inSidebar', header: 'سایدبار', isSelected: false, isBoolean: true }
    ];
    private _auth2: IObjectIteratation[] = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'authLevel1Id', header: 'app', isSelected: true, isSelectOption: true },
        { field: 'cssClass', header: 'کلاس css', isSelected: false },
        { field: 'inSidebar', header: 'سایدبار', isSelected: false, isBoolean: true },
        { field: 'logicalOrder', header: 'ترتیب', isSelected: true }
    ];
    private _auth3: IObjectIteratation[] = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'authLevel2Id', header: 'ماژول', isSelected: true, isSelectOption: true },
        { field: 'cssClass', header: 'کلاس css', isSelected: false },
        { field: 'route', header: 'مسیر', isSelected: true, ltr: true },
        { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
        { field: 'inSidebar', header: 'سایدبار', isSelected: false, isBoolean: true },
        { field: 'isClosable', header: 'قابل بستن', isSelected: false, isBoolean: true },
        { field: 'isRefreshable', header: 'قابل refresh', isSelected: false, isBoolean: true }
    ];
    private _auth4: IObjectIteratation[] = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'authLevel3Id', header: 'کنترلر', isSelected: true, isSelectOption: true },
        { field: 'value', header: 'مقدار', isSelected: false, ltr: true },
        { field: 'cssClass', header: 'کلاس css', isSelected: false, ltr: true },
        { field: 'logicalOrder', header: 'ترتیب', isSelected: true },
        { field: 'isSidebar', header: 'در سایدبار', isSelected: false, isBoolean: true }
    ];
    private _DMAnalyses: IObjectIteratation[] = [
        { field: 'counterReader', header: 'مامور', isSelected: true, readonly: true },
        { field: 'overalCount', header: 'تعداد قرائت', isSelected: true, readonly: true },
        { field: 'maxBetweenTwoMinute', header: 'حداکثر زمان بین دو', isSelected: true, readonly: true },
        { field: 'minBetweenTwoMinute', header: 'حداقل زمان بین دو', isSelected: true, readonly: true },
        { field: 'averageBetweenTwoMinute', header: 'میانگین زمان بین دو', isSelected: true, readonly: true },
        { field: 'countSameTime', header: 'تعداد دریافت', isSelected: true, readonly: true },
        { field: 'closedCount', header: 'تعداد بسته', isSelected: true, readonly: true },
        { field: 'closedPercent', header: 'درصد بسته', isSelected: true, readonly: true },
        { field: 'disconnectRate', header: 'نرخ قطعی', isSelected: true, readonly: true },
        { field: 'medianBetweenTwoMinute', header: 'میانه بین دو', isSelected: true, readonly: true },
    ]
    private _forbidden: IObjectIteratation[] = [
        { field: 'zoneId', header: 'ناحیه', isSelected: true },
        { field: 'displayName', header: 'مامور', isSelected: true },
        { field: 'preEshterak', header: 'اشتراک قبلی', isSelected: true },
        { field: 'nextEshterak', header: 'اشتراک بعدی', isSelected: true },
        { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
        { field: 'insertTime', header: 'زمان ثبت', isSelected: true },
        { field: 'tedadVahed', header: 'تعداد واحد', isSelected: true },
        { field: 'imageCount', header: 'تعداد تصاویر', isSelected: false },
        { field: 'postalCode', header: 'کد پستی', isSelected: true },
        { field: 'x', header: 'X', isSelected: false },
        { field: 'y', header: 'Y', isSelected: false },
        { field: 'gisAccuracy', header: 'دقت مکان یابی', isSelected: false },
        { field: 'description', header: 'توضیحات', isSelected: false },
        // { field: 'userId', header: 'کاربری', isSelected: true },    
        // { field: 'insertDateTime', header: 'توضیحات', isSelected: false }    
    ]
    private _abFormulas = [
        { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
        { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
        { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
        { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
        { field: 'abFormula', header: 'فرمول آب', isSelected: false, readonly: true, ltr: true },
        { field: 'fazelabFormula', header: 'فرمول فاضلاب', isSelected: false, readonly: true, ltr: true },
    ]
    private _budgetFormulas: IObjectIteratation[] = [
        { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true },
        { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
        { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
        { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
        { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
        { field: 'formula', header: 'فرمول', isSelected: false, readonly: true, ltr: true }
    ]
    private _tabsare2Formulas = [
        { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'formula', header: 'فرمول', isSelected: true, readonly: true, ltr: true }
    ]
    private _tabsare3Formulas = [
        { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'karbariMoshtarakinCode', header: 'کاربری مشترکین', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'fromDate', header: 'از', isSelected: true, readonly: true },
        { field: 'toDate', header: 'تا', isSelected: true, readonly: true },
        { field: 'fromRate', header: 'از نرخ', isSelected: true, readonly: true },
        { field: 'toRate', header: 'تا نرخ', isSelected: true, readonly: true },
        { field: 'abFormula', header: 'فرمول آب', isSelected: false, readonly: true, ltr: true },
        { field: 'fazelabFormula', header: 'فرمول فاضلاب', isSelected: false, readonly: true, ltr: true },
        { field: 'formula', header: 'فرمول', isSelected: false, readonly: true, ltr: true }
    ]
    private _listManagerAll: IObjectIteratation[] = [
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
        { field: 'preCounterStateCode', header: 'وضعیت قبلی', isSelected: false },
        { field: 'counterStateCode', header: 'وضعیت فعلی(مشترکین)', isSelected: false },
        { field: 'counterStateId', header: 'وضعیت فعلی', isSelected: true },
        { field: 'address', header: 'آدرس', isSelected: false },
        { field: 'pelak', header: 'پلاک', isSelected: false },
        { field: 'ahadMaskooniOrAsli', header: 'مسکونی/اصلی', isSelected: false },
        { field: 'ahadTejariOrFari', header: 'تجاری/فرعی', isSelected: false },
        { field: 'ahadSaierOrAbBaha', header: 'آب بها', isSelected: false },
        { field: 'qotrCode', header: 'قطر', isSelected: false },
        // { field: 'sifoonQotrCode', header: 'قطر سیفون', isSelected: false },
        { field: 'postalCode', header: 'کد پستی', isSelected: false },
        { field: 'preAverage', header: 'میانگین قبلی', isSelected: false },
        { field: 'counterSerial', header: 'سریال کنتور', isSelected: false },
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
        { field: 'offLoadTime', header: 'زمان', isSelected: false },
        { field: 'dateDifference', header: 'مدت', isSelected: false },
        { field: 'description', header: 'توضیحات', isSelected: false }
    ]
    private _counterReport = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'moshtarakinId', header: 'کد مشترکین', isSelected: true },
        { field: 'isAhad', header: 'آحاد', isSelected: true, isBoolean: true },
        { field: 'isKarbari', header: 'کاربری', isSelected: true, isBoolean: true },
        { field: 'canNumberBeLessThanPre', header: 'کمتر از قبلی', isSelected: true, isBoolean: true },
        { field: 'isTavizi', header: 'تعویض', isSelected: true, isBoolean: true },
        { field: 'clientOrder', header: 'ترتیب', isSelected: true }
    ]
    private _readingConfigDefault: IObjectIteratation[] = [
        { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'defaultAlalHesab', header: 'علی‌الحساب', isSelected: true },
        { field: 'minAlalHesab', header: 'علی‌الحساب کمینه', isSelected: false },
        { field: 'maxAlalHesab', header: 'علی‌الحساب بیشینه', isSelected: false },
        { field: 'defaultImagePercent', header: 'درصد پیشفرض عکس', isSelected: true, isNumber: true },
        { field: 'minImagePercent', header: 'درصد عکس کمینه', isSelected: false, isNumber: true },
        { field: 'maxImagePercent', header: 'درصد عکس بیشینه', isSelected: false, isNumber: true },
        // { field: 'defaultHasPreNumber', header: 'ش قبلی پیشفرض', isSelected: false },      
        { field: 'isOnQeraatCode', header: 'کد قرائت باشد', isSelected: false, isBoolean: true },
        { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
        { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
        { field: 'lowConstBoundMaskooni', header: 'ثابت کمینه مسکونی', isSelected: false },
        { field: 'highConstBoundMaskooni', header: 'ثابت بیشینه مسکونی', isSelected: false },
        { field: 'lowPercentBoundMaskooni', header: 'درصد کمینه مسکونی', isSelected: false, isNumber: true },
        { field: 'highPercentBoundMaskooni', header: 'درصد بیشینه مسکونی', isSelected: false, isNumber: true },
        { field: 'lowPercentBoundSaxt', header: 'درصد کمینه ساخت', isSelected: false, isNumber: true },
        { field: 'lowConstBoundSaxt', header: 'ثابت کمینه ساخت', isSelected: false },
        { field: 'highConstBoundSaxt', header: 'ثابت بیشینه ساخت', isSelected: false },
        { field: 'highPercentBoundSaxt', header: 'درصد بیشینه ساخت', isSelected: false, isNumber: true },
        { field: 'lowPercentZarfiatBound', header: 'درصد کمینه ظرفیت', isSelected: false, isNumber: true },
        { field: 'lowConstZarfiatBound', header: 'ثابت کمینه ظرفیت', isSelected: false },
        { field: 'highConstZarfiatBound', header: 'ثابت بیشینه ظرفیت', isSelected: false },
        { field: 'highPercentZarfiatBound', header: 'درصد بیشنه ظرفیت', isSelected: false, isNumber: true },
        { field: 'lowPercentRateBoundNonMaskooni', header: 'درصد low غیر مسکونی', isSelected: false, isNumber: true },
        { field: 'highPercentRateBoundNonMaskooni', header: 'درصد high غیر مسکونی', isSelected: false, isNumber: true }
    ]
    private _readingPeriod = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'readingPeriodKindId', header: 'نوع دوره', isSelected: true, isSelectOption: true },
        { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
        { field: 'moshtarakinId', header: 'کد مشترکین', isSelected: true },
        { field: 'clientOrder', header: 'ترتیب', isSelected: true }
    ]
    private _readingPeriodKind = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'moshtarakinId', header: 'کد مشترکین', isSelected: true },
        { field: 'clientOrder', header: 'ترتیب', isSelected: true },
        { field: 'isEnabled', header: 'فعال', isSelected: true, isBoolean: true },
    ]
    private textOutput: IObjectIteratation[] = [
        { field: 'id', header: 'کد', isSelected: true, isNumber: true },
        { field: 'itemTitle', header: 'عنوان', isSelected: true },
        // { field: 'columnId', header: '', isSelected: true },
        { field: 'zoneId', header: 'ناحیه', isSelected: true, readonly: true, isSelectOption: true },
        { field: 'startIndex', header: 'ابتدا', isSelected: true, isNumber: true },
        { field: 'endIndex', header: 'انتها', isSelected: true, isNumber: true },
        { field: 'length', header: 'طول', isSelected: true, isNumber: true }
    ]
    private _karbari = [
        { field: 'title', header: 'عنوان', isSelected: true },
        { field: 'provinceId', header: 'استان', isSelected: true, isSelectOption: true },
        { field: 'moshtarakinId', header: 'کد مشترکین', isSelected: true },
        { field: 'isMaskooni', header: 'مسکونی', isSelected: true, isBoolean: true },
        { field: 'isTejari', header: 'تجاری', isSelected: true, isBoolean: true },
        { field: 'isSaxt', header: 'ساخت', isSelected: true, isBoolean: true },
        { field: 'hasReadingVibrate', header: 'لرزش', isSelected: true, isBoolean: true }
    ]
    private _usersAll = [
        { field: 'displayName', header: 'نام نمایش', isSelected: true, ltr: false },
        { field: 'username', header: 'نام کاربری', isSelected: true, ltr: false },
        { field: 'userCode', header: 'کد کاربری', isSelected: false, ltr: false },
        { field: 'mobile', header: 'موبایل', isSelected: true, ltr: true },
        { field: 'isActive', header: 'فعال', isSelected: true, ltr: false, isBoolean: true },
        { field: 'isLocked', header: 'قفل', isSelected: true, ltr: false, isBoolean: true }
    ]
    private _errors: IObjectIteratation[] = [
        { field: 'eshterak', header: 'اشتراک', isSelected: true, isNumber: true },
        { field: 'qeraatCode', header: 'کد قرائت', isSelected: false, isNumber: true },
        { field: 'billId', header: 'شناسه قبض', isSelected: true, isNumber: true },
        { field: 'radif', header: 'ش.پرونده', isSelected: true, isNumber: true },
        { field: 'errorDescriptoin', header: 'توضیحات', isSelected: true },
        { field: 'hasError', header: 'خطا', isSelected: true, isBoolean: true }
    ]
    private _apk: IObjectIteratation[] = [
        { field: 'versionName', header: 'نام نسخه', isSelected: true },
        { field: 'versionCode', header: 'نسخه', isSelected: true },
        // { field: 'fileRepositoryId', header: 'دانلود فایل', isSelected: true }
    ]


    columnDefColumns = (): IObjectIteratation[] => [
        { field: 'insertDateJalali', header: 'تاریخ ثبت', isSelected: true },
        { field: 'userDisplayName', header: 'نام کاربر', isSelected: true },
        { field: 'counterReaderName', header: 'مامور', isSelected: true },
        { field: 'trackStatusTitle', header: 'وضعیت', isSelected: true },
        { field: 'seen', header: 'دیده شده', isSelected: true, isBoolean: true },
        // { field: 'inserterCode', header: 'کد کاربر', isSelected: false },    
        // { field: 'hasDetails', header: 'جزئیات' },
    ]
    columnFollowUpView = (): IObjectIteratation[] => {
        return [
            { field: 'trackNumber', header: 'شماره پیگیری ', isSelected: true, readonly: true },
            { field: 'listNumber', header: 'ش لیست', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2' },
            { field: 'zoneTitle', header: 'ناحیه ', isSelected: true, readonly: true },
            { field: 'fromEshterak', header: 'از اشتراک ', isSelected: true, readonly: true },
            { field: 'toEshterak', header: 'تا اشتراک ', isSelected: true, readonly: true },
            { field: 'fromDate', header: 'از ', isSelected: true, readonly: true },
            { field: 'toDate', header: 'تا ', isSelected: true, readonly: true },
            { field: 'overallQuantity', header: 'کل تعداد ', isSelected: true, readonly: true },
            { field: 'itemQuantity', header: 'تعداد ', isSelected: true, readonly: true },
            { field: 'readingPeriodTitle', header: 'دوره قرائت ', isSelected: true, readonly: true },
            { field: 'year', header: 'سال', isSelected: true, readonly: true }
        ];
    }
    columnLastState = (): IObjectIteratation[] => {
        return [
            { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
            { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
            { field: 'counterReaderName', header: 'مامور', isSelected: true },
            { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
            { field: 'listNumber', header: 'ش لیست', isSelected: true },
            { field: 'itemQuantity', header: 'تعداد', isSelected: true },
            { field: 'stateTitle', header: 'مرحله', isSelected: true },
            { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
            // { field: 'zoneId', header: 'ناحیه', isSelected: false },
            // { field: 'year', header: 'سال', isSelected: false },
            { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
            { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, ltr: true },
            { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, ltr: true },
            { field: 'fromDate', header: 'از', isSelected: false },
            { field: 'toDate', header: 'تا', isSelected: false },
            { field: 'insertTime', header: 'زمان ثبت', isSelected: false },
            { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: false },
            { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
            { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: false, isBoolean: true },
            { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: false, isBoolean: true },
            { field: 'description', header: 'توضیحات', isSelected: false }
            // { field: 'hasMap', header: 'نقشه', isSelected: true, isBoolean: true }
        ]
    }
    columnCounterState = (): IObjectIteratation[] => {
        return this._counterState;
    }
    columnImageAttribution = (): IObjectIteratation[] => {
        return this.imgattr;
    }
    columnAPK = (): IObjectIteratation[] => {
        return this._apk;
    }
    columnUserAllUsers = (): IObjectIteratation[] => {
        return this._usersAll;
    }
    columnCounterReport = (): IObjectIteratation[] => {
        return this._counterReport;
    }
    columnReadingConfigDefault = (): IObjectIteratation[] => {
        return this._readingConfigDefault;
    }
    columnReadingPeriod = (): IObjectIteratation[] => {
        return this._readingPeriod;
    }
    columnReadingPeriodKind = (): IObjectIteratation[] => {
        return this._readingPeriodKind;
    }
    columnTextOutput = (): IObjectIteratation[] => {
        console.log(this.textOutput);

        return this.textOutput;
    }
    columnKarbari = (): IObjectIteratation[] => {
        return this._karbari;
    }
    columnLMAll = (): IObjectIteratation[] => {
        return this._listManagerAll;
    }
    columnAbFormulas = (): IObjectIteratation[] => {
        return this._abFormulas;
    }
    columnBudgetFormulas = (): IObjectIteratation[] => {
        return this._budgetFormulas;
    }
    columnTabsare2Formulas = (): IObjectIteratation[] => {
        return this._tabsare2Formulas;
    }
    columnTabsare3Formulas = (): IObjectIteratation[] => {
        return this._tabsare3Formulas;
    }
    columnDataMiningAnalyses = (): IObjectIteratation[] => {
        return this._DMAnalyses;
    }
    columnAuth1 = (): IObjectIteratation[] => {
        return this._auth1;
    }
    columnAuth2 = (): IObjectIteratation[] => {
        return this._auth2;
    }
    columnAuth3 = (): IObjectIteratation[] => {
        return this._auth3;
    }
    columnAuth4 = (): IObjectIteratation[] => {
        return this._auth4;
    }
    columnForbidden = (): IObjectIteratation[] => {
        return this._forbidden;
    }
    columnSearchMoshtarakin = (): IObjectIteratation[] => {
        return this._searchMosh;
    }
    columnSearchSimple = (): IObjectIteratation[] => {
        return this._searchSimple;
    }
    columnSearchPro = (): IObjectIteratation[] => {
        return this._searchPro;
    }
    columnErrors = (): IObjectIteratation[] => {
        return this._errors;
    }
    columnRRAnalyzeByParam = (): IObjectIteratation[] => {
        return this._RRAnalyzeByParam;
    }
    columnRRMaster = (): IObjectIteratation[] => {
        return this._RRMaster;
    }
    columnImgAttrResult = (): IObjectIteratation[] => {
        return this._imageAttrResult;
    }
    columnImgAttrAnalyze = (): IObjectIteratation[] => {
        return this._imageAttrAnalyze;
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
    columnTrackReading = (): IObjectIteratation[] => {
        return this.reading;
    }
    columnTrackOffloaded = (): IObjectIteratation[] => {
        return this.offloaded;
    }
    columnTrackLoaded = (): IObjectIteratation[] => {
        return this.loaded;
    }
    columnTrackImported = (): IObjectIteratation[] => {
        return this.imported;
    }
    columnTrackFinished = (): IObjectIteratation[] => {
        return this.finished;
    }
    columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
        return [
            { field: 'counterReaders', header: 'مامور', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2' },
            { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
            { field: 'overalDistance', header: 'مسافت کل(m)', isSelected: true, readonly: true },
            { field: 'overalDuration', header: 'زمان کل(h)', isSelected: true, readonly: true },
            { field: 'maneCount', header: 'تعداد مانع', isSelected: true, readonly: true },
            { field: 'manePercent', header: 'درصد مانع', isSelected: true, readonly: true },
            { field: 'hasPreNumber', header: 'رقم قبلی', isSelected: true, readonly: true, isBoolean: true },
            { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: true, readonly: true, isBoolean: true },
            { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: true, readonly: true, isBoolean: true },
            { field: 'isBazdid', header: 'بازدید', isSelected: true, readonly: true, isBoolean: true },
            { field: 'isRoosta', header: 'روستا', isSelected: true, readonly: true, isBoolean: true }
        ];
    }
    columnAssessPre = (): IObjectIteratation[] => {
        return this.assess_pre;
    }


    columnSelectedMenus = (name: string): IObjectIteratation[] => {
        switch (name) {
            case 'counterReport':
                return this.columnCounterReport();
            case '_imageAttrResult':
                return this.columnImgAttrResult();
            case '_imageAttrAnalyze':
                return this.columnImgAttrAnalyze();
            case 'assess_pre':
                return this.columnAssessPre();
            case 'imgattr':
                return this.columnImageAttribution();
            case 'readingPeriod':
                return this.columnReadingPeriod();
            case 'readingConfigDefault':
                return this.columnReadingConfigDefault();
            case 'apk':
                return this.columnAPK();
            case 'periodKind':
                return this.columnReadingPeriodKind();
            case 'karbari':
                return this.columnKarbari();
            case 'reading':
                return this.columnTrackReading();
            case 'finished':
                return this.columnTrackFinished();
            case 'lastStates':
                return this.columnLastState();
            case 'loaded':
                return this.columnTrackLoaded();
            case 'offloaded':
                return this.columnTrackOffloaded();
            case 'imported':
                return this.columnTrackImported();
            case 'counterState':
                return this.columnCounterState();
            case 'analysis':
                return this.columnDataMiningAnalyses();
            case 'karkard':
                return this.columnRRKarkard();
            case 'forbidden':
                return this.columnForbidden();
            case 'all-lists':
                return this.columnLMAll();
            case 'Budget':
                return this.columnBudgetFormulas();
            case 'tabsare2':
                return this.columnTabsare2Formulas();
            case 'tabsare3':
                return this.columnTabsare3Formulas();
            case 'abBaha':
                return this.columnAbFormulas();
            case 'textOutput':
                return this.columnTextOutput();
            case 'search-mosh':
                return this.columnSearchMoshtarakin();
            case 'search-pro':
                return this.columnSearchPro();
            case 'simpleSearch':
                return this.columnSearchSimple();
            case 'karkard':
                return this.columnRRKarkard();
            case 'karkardDaily':
                return this.columnRRKarkardDaly();
            case 'master':
                return this.columnRRMaster();
            case 'analyzePrfm':
                return this.columnRRAnalyzeByParam();
            case 'karkard-offload':
                return this.columnRRKarkardOffloaded();
            case 'trv-diff':
                return this.columnRRTraverseDifferential();
            case 'trv':
                return this.columnRRTraverse();
            case 'rr-preNumber':
                return this.columnRRPreNumberShown();
            case 'rr-locked':
                return this.columnRRLocked();
            case 'rr-details':
                return this.columnRRDetails();
            case 'disposalHs':
                return this.columnRRDisposalHours();
            case 'auth1':
                return this.columnAuth1();
            case 'auth2':
                return this.columnAuth2();
            case 'auth3':
                return this.columnAuth3();
            case 'auth4':
                return this.columnAuth4();
            case 'analysis':
                return this.columnDataMiningAnalyses();
            case 'userAll':
                return this.columnUserAllUsers();
            case 'errors':
                return this.columnErrors();

            default:
                break;
        }
    }

    customizeSelectedColumns = (_selectCols: any) => {
        return _selectCols.filter(items => {
            if (items.isSelected)
                return items
        })
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

}
