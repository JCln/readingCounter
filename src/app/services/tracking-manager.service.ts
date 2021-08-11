import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IEditTracking, IListManagerPD, IOutputManager, ITracking } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { ENSelectedColumnVariables, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { Converter } from 'src/app/classes/converter';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { OffloadModify } from './../classes/offload-modify-type';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  private menuDefault: IObjectIteratation[] = [
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
    { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
    { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
    { field: 'displayBillId', header: 'شناسه قبض', isSelected: false, isBoolean: true },
    { field: 'displayRadif', header: 'ش.پرونده', isSelected: false, isBoolean: true }
  ];
  private lastStates: IObjectIteratation[] = [
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
    { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
    { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
    { field: 'displayBillId', header: 'شناسه قبض', isSelected: false, isBoolean: true },
    { field: 'displayRadif', header: 'ش.پرونده', isSelected: false, isBoolean: true }
    // { field: 'hasMap', header: 'نقشه', isSelected: true, isBoolean: true }
  ]
  columnSelectedMenuDefault = (): IObjectIteratation[] => {
    return this.menuDefault;
  }
  columnSelectedImportedList = (): IObjectIteratation[] => {
    return [
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: true, readonly: false, borderize: true },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: true, readonly: false, borderize: true },
      { field: 'counterReaderName', header: 'مامور فعلی', isSelected: true, readonly: true },
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
      { field: 'newCounterReaderName', header: 'مامور جدید', isSelected: false, readonly: false, borderize: true },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: true, readonly: false, isBoolean: true },
      { field: 'displayRadif', header: 'ش.پرونده', isSelected: true, readonly: false, isBoolean: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, readonly: true, isBoolean: true },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, readonly: true, isBoolean: true }
    ];
  }
  columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
    return [
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
      { field: 'overalDistance', header: 'مسافت کل', isSelected: true, readonly: true },
      { field: 'overalDuration', header: 'زمان کل', isSelected: true, readonly: true }

    ];
  }
  columnlastStates = (): IObjectIteratation[] => {
    return this.lastStates;
  }
  getOffloadModifyType = (): OffloadModify[] => {
    return [
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading
    ]
  }
  getOffloadItems = (): OffloadModify[] => {
    return [
      OffloadModify.blueScreenLight,
      OffloadModify.longDistance,
      OffloadModify.intenseLight,
      OffloadModify.counterStatesNotMatch,
      OffloadModify.wrongReading,
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
    private router: Router
  ) { }

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
      this.interfaceManagerService.POSTBLOB(ENInterfaces.OutputDBF, a).subscribe(res => {
        resolve(res);
      });
    });
  }
  downloadOutputSingle = (single: ITracking): Promise<any> => {
    const a: any = {
      trackingId: single.id
    }
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOBOBSERVE(ENInterfaces.OutputSINGLE, a).subscribe(res => {
        resolve(res);
      })

    });
  }
  downloadOutputSingleWithENV = (single: ITracking, date: string): Promise<any> => {
    const a: any = {
      trackingId: single.id,
      description: date
    }
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOBOBSERVE(ENInterfaces.OutputSINGLE, a).subscribe(res => {
        resolve(res);
      })
    });
  }
  // 
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
  TESTbackToConfirmDialog = (trackNumber: string, message: EN_messages): Promise<any> => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: '19rem',
        data: {
          title: message,
          isInput: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.migrateOrRemoveTask(ENInterfaces.trackingToREADING, trackNumber, desc);
          resolve(true);
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
  getCounterStatesDictionary = (zoneId: number): Promise<any> => {
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
  private showWarnMessage = (message: string) => this.utilsService.snackBarMessageWarn(message);
  isValidationNull = (elem: any): boolean => {
    if (this.utilsService.isNull(elem))
      return true;
    return false;
  }
  private validationIsNAN = (elem: any): boolean => {
    if (this.utilsService.isNaN(elem))
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
    if (this.utilsService.isNullZero(object.modifyType)) {
      this.showWarnMessage(EN_messages.insert_modify_type);
      return false;
    }
    if (this.validationIsNAN(object.counterNumber)) {
      this.showWarnMessage(EN_messages.format_invalid_counterNumber);
      return false;
    }
    if (!this.utilsService.lengthControl(object.counterNumber, object.counterNumber, 1, 7)) {
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
    if (this.validationIsNAN(id)) {
      this.showWarnMessage(EN_messages.format_invalid_trackNumber);
      return false;
    }
    if (!this.utilsService.isLowerThanMinLength(id, 2) || !this.utilsService.isLowerThanMaxLength(id, 10)) {
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
  /* OTHER */
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
  routeToLMPDXY = (trackNumber: number, day: string) => {
    this.utilsService.routeToByParams('wr', { trackNumber: trackNumber, day: day });
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  routeToLMAll = (row: ITracking) => {
    this.router.navigate(['wr/m/l/all', false, row.id]);
  }
  routeToOffloadModify = (dataSource: ITracking) => {
    this.router.navigate(['wr/m/l/all', true, dataSource.id]);
  }
  routeTo = (route: string, UUID: string) => {
    this.utilsService.routeToByParams(route, UUID);
  }
  backToPreviousPage = () => {
    this._location.back();
  }
  backToParent = () => {
    this.utilsService.routeTo('/wr/m/s/fwu');
  }
  setGetRanges = (dataSource: IListManagerPD) => {
    dataSource.overalDuration = parseFloat(this.utilsService.getRange(dataSource.overalDuration));
    dataSource.overalDistance = parseFloat(this.utilsService.getRange(dataSource.overalDistance));
  }
}
