import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { IObjectIteratation, IResponses } from '../Interfaces/ioverall-config';
import { OffloadModify } from './../classes/offload-modify-type';
import { IEditTracking, IOutputManager, ITracking } from './../Interfaces/imanage';
import { ENTrackingMessage } from './../Interfaces/ioverall-config';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  columnSelectedMenuDefault = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      // { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false },
      { field: 'year', header: 'سال', isSelected: false },
      { field: 'isRoosta', header: 'روستایی', isSelected: false },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
      { field: 'fromDate', header: 'از', isSelected: false },
      { field: 'toDate', header: 'تا', isSelected: false },
      { field: 'itemQuantity', header: 'تعداد', isSelected: true },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: false },
      { field: 'displayRadif', header: 'ردیف', isSelected: false },
      { field: 'counterReaderName', header: 'مامور', isSelected: false }
    ];
  }
  columnSelectedImportedList = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: false, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: false, readonly: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: false, readonly: true },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: false, readonly: true },
      { field: 'year', header: 'سال', isSelected: false, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
      { field: 'fromDate', header: 'از', isSelected: false, readonly: true },
      { field: 'toDate', header: 'تا', isSelected: false, readonly: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: false, readonly: true },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: true, readonly: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: true, readonly: false },
      { field: 'counterReaderName', header: 'مامور فعلی', isSelected: true, readonly: true },
      { field: 'newCounterReaderName', header: 'مامور جدید', isSelected: false, readonly: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: true, readonly: false },
      { field: 'displayRadif', header: 'ردیف', isSelected: true, readonly: false },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, readonly: true },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, readonly: true }
    ];
  }
  columnlastStates = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      // { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true },
      { field: 'stateTitle', header: 'منطقه', isSelected: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false },
      { field: 'year', header: 'سال', isSelected: false },
      { field: 'isRoosta', header: 'روستایی', isSelected: false },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
      { field: 'fromDate', header: 'از', isSelected: false },
      { field: 'toDate', header: 'تا', isSelected: false },
      { field: 'itemQuantity', header: 'تعداد', isSelected: true },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: false },
      { field: 'displayRadif', header: 'ردیف', isSelected: false },
      { field: 'counterReaderName', header: 'مامور', isSelected: false }
    ];
  }
  getOffloadModifyType = (): OffloadModify[] => {
    return [
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading
    ]
  }
  getOffloadLowQualityPicture = (): OffloadModify[] => {
    return [
      OffloadModify.blueScreenLight,
      OffloadModify.longDistance,
      OffloadModify.intenseLight
    ]
  }
  getOffloadHighQualityPicture = (): OffloadModify[] => {
    return [
      OffloadModify.counterStatesNotMatch,
      OffloadModify.wrongReading
    ]
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private _location: Location,
    private dialog: MatDialog
  ) { }

  getImportedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackImported();
  }
  getLoadedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackLoaded();
  }
  getReadingDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackReading();
  }
  getOffloadedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackOffloaded();
  }
  getFinishedDataSource = (): Observable<any> => {
    return this.interfaceManagerService.getTrackFinished();
  }
  getLastStatesDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getTrackLastStates().subscribe((res: any) => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getFollowUpSource = (trackNumber: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getTrackFollowUp(trackNumber).subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      })
    } catch {
      console.error(e => e);
    }

  }
  getCounterReaders = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.getCounterReadersByZoneId(zoneId).subscribe(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postEditingTrack = (rowData: ITracking) => {
    this.interfaceManagerService.postTrackingEdit(this.selectSpecialParameters(rowData)).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message);
    });
  }
  removeTrackingId = (trackNumber: string, desc: string): Observable<any> => {
    return this.interfaceManagerService.removeTrackingId({ trackingId: trackNumber, description: desc });
  }
  // Output manager 
  downloadOutputDBF = (dbfData: ITracking | IOutputManager): any => {
    const a: IOutputManager = {
      zoneId: dbfData.zoneId,
      fromDate: dbfData.fromDate,
      toDate: dbfData.toDate
    }
    return this.interfaceManagerService.postOutputManager(a);
  }
  // 
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  migrateDataRowToImported = (trackingId: string, desc: string): Observable<any> => {
    return this.interfaceManagerService.toImported({ trackingId: trackingId, description: desc });
  }
  migrateDataRowToReading = (trackingId: string, desc: string) => {
    this.interfaceManagerService.toReading({ trackingId: trackingId, description: desc }).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message)
    });
  }
  migrateDataRowToOffloaded = (trackingId: string, desc: string): Observable<any> => {
    return this.interfaceManagerService.toOffloaded({ trackingId: trackingId, description: desc });
  }
  private migrateToPreState = (trackingId: string, desc: string) => {
    return this.interfaceManagerService.toPre({ trackingId: trackingId, description: desc }).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message);
    })
  }
  backToConfirmDialog = (trackNumber: string) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: 'علت بازگشت به مرحله قبلی'
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.migrateToPreState(trackNumber, desc);
        }
      })
    })
  }
  TESTbackToConfirmDialog = (trackNumber: string, message: ENTrackingMessage) => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: message
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.migrateDataRowToReading(trackNumber, desc);
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

  // imported service control
  private selectSpecialParameters = (rowData: ITracking): IEditTracking => {
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
  backToPreviousPage = () => {
    this._location.back();
  }
  backToParent = () => {
    this.utilsService.routeTo('/wr/m/track/fwu');
  }
  routeTo = (route: string, UUID: string) => {
    this.utilsService.routeToByParams(route, UUID);
  }
  selectedItems = (_selectors: any[]): any[] => {
    const a = [];
    _selectors.filter(items => {
      if (items.isSelected)
        a.push(items.id)
    })
    return a;
  }

}
