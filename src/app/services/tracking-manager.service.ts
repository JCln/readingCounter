import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOutputManager } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { ENSelectedColumnVariables, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { IEditTracking, IOffLoadPerDay, ITracking } from '../Interfaces/itrackings';
import { EN_Routes } from '../Interfaces/routes.enum';
import { OffloadModify } from './../classes/offload-modify-type';
import { AllListsService } from './all-lists.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

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

  columnSelectedImportedList = (): IObjectIteratation[] => {
    return [
      { field: 'isBazdid', header: 'بازدید', isSelected: false, readonly: true, isBoolean: true },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, readonly: true, isBoolean: true },
      { field: 'counterReaderName', header: 'مامور فعلی', isSelected: true, readonly: true },
      { field: 'newCounterReaderName', header: 'مامور جدید', isSelected: false, isSelectOption: true, readonly: false, borderize: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: false, readonly: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: false, readonly: true },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: false, readonly: true },
      // { field: 'year', header: 'سال', isSelected: false, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true, ltr: true },
      { field: 'fromDate', header: 'از', isSelected: false, readonly: true },
      { field: 'toDate', header: 'تا', isSelected: false, readonly: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: false, readonly: true },
      { field: 'alalHesabPercent', header: 'درصد علی‌الحساب', isSelected: true, readonly: false, borderize: true },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: true, readonly: false, borderize: true },
      { field: 'displayRadif', header: 'نمایش ش.پرونده', isSelected: true, readonly: false, isBoolean: true },
      { field: 'displayBillId', header: 'نمایش شناسه قبض', isSelected: true, readonly: false, isBoolean: true },
      { field: 'hasPreNumber', header: 'رقم قبلی', isSelected: true, isBoolean: true },
    ];
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
  getOffloadModifyType = (): OffloadModify[] => {
    return [
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading,
      OffloadModify.bazresi
    ]
  }
  getOffloadItems = (): OffloadModify[] => {
    return [
      OffloadModify.blueScreenLight,
      OffloadModify.longDistance,
      OffloadModify.intenseLight,
      OffloadModify.counterStatesNotMatch,
      OffloadModify.occasion,
      OffloadModify.inappropriate,
      OffloadModify.doorPicture,
      OffloadModify.counterHumidity,
      OffloadModify.others
    ]
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private _location: Location,
    private dialog: MatDialog,
    private allListsService: AllListsService,
    private router: Router
  ) { }

  firstConfirmDialog = (message: EN_messages, isInput: boolean, isDelete: boolean): Promise<any> => {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: message,
          isInput: isInput,
          isDelete: isDelete
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }


  getDataSource = (method: ENInterfaces): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(method).subscribe(res => {
          resolve(res);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  getDataSourceByQuote = (method: ENInterfaces, insertedInput: number | string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(method, insertedInput).subscribe(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postEditingTrack = (rowData: IEditTracking) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.trackingEDIT, this.selectSpecialParameters(rowData)).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message);
    });
  }
  getLMPD = (trackNumber: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.ListOffloadedPERDAY, trackNumber).subscribe(res => {
        resolve(res);
      })
    })
  }
  migrateOrRemoveTask = (method: ENInterfaces, trackNumber: string, desc: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, { trackingId: trackNumber, description: desc }).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  postEditState = (method: ENInterfaces, val: object) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  // Output manager 
  downloadOutputDBF = (dbfData: ITracking | IOutputManager): Promise<any> => {
    dbfData.fromDate = Converter.persianToEngNumbers(dbfData.fromDate);
    dbfData.toDate = Converter.persianToEngNumbers(dbfData.toDate);
    const a: IOutputManager = {
      zoneId: dbfData.zoneId,
      fromDate: dbfData.fromDate,
      toDate: dbfData.toDate
    }
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOB(ENInterfaces.OutputDBF, a).toPromise().then(res => {
        resolve(res);
      }).catch(() => {
        this.utilsService.snackBarMessageFailed(EN_messages.server_noDataFounded);
      })
    });
  }
  downloadOutputWithoutDESC = (method: ENInterfaces, single: ITracking): Promise<any> => {
    const a: any = {
      trackingId: single.id
    }
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOBOBSERVE(method, a).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  downloadOutputSingleWithENV = (method: ENInterfaces, single: ITracking, inputData: string): Promise<any> => {
    const a: any = {
      trackingId: single.id,
      description: inputData
    }
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOBOBSERVE(method, a).subscribe(res => {
        resolve(res)
      })
    })
  }
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  backToConfirmDialog = (trackNumber: string) => {
    const title = EN_messages.reason_backToPrev;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: title,
          isInput: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.migrateOrRemoveTask(ENInterfaces.trackingPRE, trackNumber, desc);
        }
      })
    })
  }
  hasNextBazdidConfirmDialog = (message: EN_messages): Promise<any> => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '21rem',
        data: {
          title: message,
          isSelectableDate: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
      })
    })
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getCounterStateByIdDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  postOffloadModifyEdited = (body: IOffloadModifyReq) => {
    body.jalaliDay = Converter.persianToEngNumbers(body.jalaliDay);

    this.interfaceManagerService.POSTBODY(ENInterfaces.trackingPostOffloadModify, body).toPromise().then((res: IResponses) => {
      this.successSnackMessage(res.message);
    })
  }

  // imported service control
  private selectSpecialParameters = (rowData: IEditTracking): IEditTracking => {
    const a: IEditTracking = {
      id: rowData.id,
      alalHesabPercent: rowData.alalHesabPercent,
      imagePercent: rowData.imagePercent,
      hasPreNumber: rowData.hasPreNumber,
      displayBillId: rowData.displayBillId,
      displayRadif: rowData.displayRadif,
      counterReaderId: rowData.counterReaderId
    }
    return a;
  }
  //  
  selectedItems = (_selectors: any[]): any[] => {
    const a = [];
    _selectors.filter(items => {
      if (items.isSelected)
        a.push(items.id)
    })
    return a;
  }

  /*VALIDATION */
  showWarnMessage = (message: string) => this.utilsService.snackBarMessageWarn(message);
  isValidationNull = (elem: any): boolean => {
    if (MathS.isNull(elem))
      return true;
    return false;
  }
  private offloadModifyValidation = (object: IOffloadModifyReq): boolean => {
    if (this.isValidationNull(object.id)) {
      this.showWarnMessage(EN_messages.call_supportGroup);
      return false;
    }
    if (this.isValidationNull(object.jalaliDay)) {
      this.showWarnMessage(EN_messages.insert_date);
      return false;
    }
    if (MathS.isNullZero(object.modifyType)) {
      this.showWarnMessage(EN_messages.insert_modify_type);
      return false;
    }
    if (this.isValidationNull(object.counterNumber)) {
      this.showWarnMessage(EN_messages.format_invalid_counterNumber);
      return false;
    }
    if (!MathS.lengthControl(object.counterNumber, object.counterNumber, 1, 7)) {
      this.showWarnMessage(EN_messages.format_invalid_counterNumberTimes);
      return false;
    }
    return true;
  }
  private followUPValidation = (id: number): boolean => {
    if (this.isValidationNull(id)) {
      this.showWarnMessage(EN_messages.insert_trackNumber);
      return false;
    }
    if (MathS.isNaN(id)) {
      this.showWarnMessage(EN_messages.format_invalid_trackNumber);
      return false;
    }
    if (!MathS.isLowerThanMinLength(id, 2) || !MathS.isLowerThanMaxLength(id, 10)) {
      this.showWarnMessage(EN_messages.format_invalid_trackNumbersLength);
      return false;
    }
    return true;
  }

  /* VERIFICATION */
  verificationOffloadModify = (object: IOffloadModifyReq): boolean => {
    return this.offloadModifyValidation(object);
  }
  verificationFollowUPTrackNumber = (id: number): boolean => {
    return this.followUPValidation(id);
  }
  routeToLMPDXY = (trackNumber: number, day: string, distance: number, isPerday: boolean) => {
    this.utilsService.routeToByParams('wr', { trackNumber: trackNumber, day: day, distance: distance, isPerday: isPerday });
  }
  routeToLMPayDay = (row: ITracking) => {
    this.utilsService.routeToByParams(EN_Routes.wrmlpd, row.trackNumber);
  }
  routeToLMAll = (row: any) => {
    this.allListsService.allLists_pageSign.GUid = row.id;
    this.allListsService.allLists_pageSign.listNumber = row.listNumber;
    this.allListsService.allLists_pageSign.trackNumber = row.trackNumber;
    this.router.navigate([EN_Routes.wrmlallfalse]);
  }
  routeToOffloadModify = (dataSource: ITracking) => {
    this.allListsService.modifyLists_pageSign.GUid = dataSource.id;
    this.allListsService.modifyLists_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.modifyLists_pageSign.trackNumber = dataSource.trackNumber;
    this.router.navigate([EN_Routes.wrmlalltrue]);
  }
  routeToOffloadGeneralModify = (dataSource: ITracking) => {
    this.allListsService.generalModifyLists_pageSign.GUid = dataSource.id;
    this.allListsService.generalModifyLists_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.generalModifyLists_pageSign.groupId = dataSource.groupId;
    this.allListsService.generalModifyLists_pageSign.zoneId = dataSource.zoneId;
    this.allListsService.generalModifyLists_pageSign.trackNumber = dataSource.trackNumber;
    this.router.navigate([EN_Routes.wrmlGeneralModify]);
  }
  routeTo = (route: string, UUID: string) => {
    this.utilsService.routeToByParams(route, UUID);
  }
  backToPreviousPage = () => {
    this._location.back();
  }
  backToParent = () => {
    this.utilsService.routeTo(EN_Routes.wrmsfwu);
  }
  setGetRanges = (dataSource: IOffLoadPerDay) => {
    dataSource.overalDuration = parseFloat(MathS.getRange(dataSource.overalDuration));
    dataSource.overalDistance = parseFloat(MathS.getRange(dataSource.overalDistance));
  }

}
