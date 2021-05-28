import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { EN_messages } from 'src/app/Interfaces/enums.enum';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { InterfaceService } from 'src/app/services/interface.service';

import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IObjectIteratation, IResponses } from '../Interfaces/ioverall-config';
import { OffloadModify } from './../classes/offload-modify-type';
import { IEditTracking, IOutputManager, ITracking } from './../Interfaces/imanage';
import { IOffloadModifyReq } from './../Interfaces/inon-manage';
import { ENTrackingMessage } from './../Interfaces/ioverall-config';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  columnSelectedMenuDefault = (): IObjectIteratation[] => {
    return [
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true, isSelectOption: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      { field: 'counterReaderName', header: 'مامور', isSelected: true },
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: true },
      // { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
      { field: 'year', header: 'سال', isSelected: false },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
      { field: 'fromDate', header: 'از', isSelected: false },
      { field: 'toDate', header: 'تا', isSelected: false },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: false },
      { field: 'displayRadif', header: 'ش.پرونده', isSelected: false }
    ];
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
      { field: 'year', header: 'سال', isSelected: false, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, readonly: true },
      { field: 'fromDate', header: 'از', isSelected: false, readonly: true },
      { field: 'toDate', header: 'تا', isSelected: false, readonly: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: false, readonly: true },
      { field: 'newCounterReaderName', header: 'مامور جدید', isSelected: false, readonly: false, borderize: true },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: true, readonly: false },
      { field: 'displayRadif', header: 'ش.پرونده', isSelected: true, readonly: false },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, readonly: true, isBoolean: true },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, readonly: true, isBoolean: true }
    ];
  }
  columnlastStates = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true },
      { field: 'counterReaderName', header: 'مامور', isSelected: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      { field: 'itemQuantity', header: 'تعداد', isSelected: true },
      // { field: 'zoneId', header: 'ناحیه', isSelected: false },
      { field: 'zoneTitle', header: 'ناحیه', isSelected: true },
      { field: 'stateTitle', header: 'مرحله', isSelected: true },
      { field: 'isBazdid', header: 'بازدید', isSelected: false, isBoolean: true },
      { field: 'year', header: 'سال', isSelected: false },
      { field: 'isRoosta', header: 'روستایی', isSelected: false, isBoolean: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: false },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: false },
      { field: 'fromDate', header: 'از', isSelected: false },
      { field: 'toDate', header: 'تا', isSelected: false },
      { field: 'alalHesabPercent', header: 'درصد علی الحساب', isSelected: false },
      { field: 'imagePercent', header: 'درصد تصویر', isSelected: false },
      { field: 'displayBillId', header: 'شناسه قبض', isSelected: false },
      { field: 'displayRadif', header: 'ش.پرونده', isSelected: false }
    ];
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
    private interfaceService: InterfaceService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private _location: Location,
    private dialog: MatDialog
  ) { }

  getImportedDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.trackingIMPORTED).subscribe(res => {
          resolve(res);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  getLoadedDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.trackingLOADED).subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      })
    } catch (error) {
      console.error(e => e);
    }

  }
  getReadingDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.trackingREADING).subscribe(res => {
          resolve(res);
        });
      });
    } catch (error) {
      console.error(error);

    }
  }
  getOffloadedDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.trackingOFFLOADED).subscribe(res => {
          resolve(res);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
  getFinishedDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.trackingFINISHED).subscribe(res => {
          resolve(res);
        });
      });
    } catch (error) {
      console.error(error);

    }
  }
  getLastStatesDataSource = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GET(ENInterfaces.trackingLASTSTATES).subscribe((res: any) => {
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
        this.interfaceManagerService.GETByQuote(ENInterfaces.trackingFOLLOWUP, trackNumber).subscribe(res => {
          if (res) {
            resolve(res);
          }
        })
      }).catch(i => {
        console.log(i); console.log('wrong');
      }
      )
    } catch {
      console.error(e => e);
    }

  }
  getCounterReaders = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).subscribe(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postEditingTrack = (rowData: ITracking) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.trackingEDIT, this.selectSpecialParameters(rowData)).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message);
    });
  }
  removeTrackingId = (trackNumber: string, desc: string): Observable<any> => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.trackingREMOVE, { trackingId: trackNumber, description: desc });
  }
  finishReading = (trackNumber: string, desc: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.trackingFinishReadiED, { trackingId: trackNumber, description: desc }).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  // Output manager 
  downloadOutputDBF = (dbfData: ITracking | IOutputManager): any => {
    const a: IOutputManager = {
      zoneId: dbfData.zoneId,
      fromDate: dbfData.fromDate,
      toDate: dbfData.toDate
    }
    return this.interfaceManagerService.POSTBLOB(ENInterfaces.OutputDBF, a);
  }
  downloadOutputSingle = (single: ITracking): Promise<any> => {
    const a: any = {
      trackingId: single.id
    }
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOB(ENInterfaces.OutputSINGLE, a).toPromise().then(res => {
        resolve(res);
      })

    });
  }
  // 
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  migrateDataRowToImported = (trackingId: string, desc: string): Observable<any> => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.trackingToIMPORTED, { trackingId: trackingId, description: desc });
  }
  migrateDataRowToReading = (trackingId: string, desc: string) => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.trackingToREADING, { trackingId: trackingId, description: desc }).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message)
    });
  }
  migrateDataRowToOffloaded = (trackingId: string, desc: string): Observable<any> => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.trackingToOFFLOADED, { trackingId: trackingId, description: desc });
  }
  private migrateToPreState = (trackingId: string, desc: string) => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.trackingPRE, { trackingId: trackingId, description: desc }).subscribe((res: IResponses) => {
      if (res)
        this.successSnackMessage(res.message);
    })
  }
  backToConfirmDialog = (trackNumber: string) => {
    const title = EN_messages.reason_backToPrev;
    return new Promise(() => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: title,
          isInput: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.migrateToPreState(trackNumber, desc);
        }
      })
    })
  }
  TESTbackToConfirmDialog = (trackNumber: string, message: ENTrackingMessage): Promise<any> => {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        data: {
          title: message,
          isInput: true
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          this.migrateDataRowToReading(trackNumber, desc);
          resolve(true);
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
    console.log(body);

    this.interfaceService.postOffloadModify(body).toPromise().then(res => {
      this.successSnackMessage(res);
    })
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
    this.utilsService.routeTo('/wr/m/s/fwu');
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

  /*VALIDATION */
  private showWarnMessage = (message: string) => this.utilsService.snackBarMessageWarn(message);
  private isValidationNull = (elem: any): boolean => {
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
      this.showWarnMessage('شماره پیگیری را وارد نمایید');
      return false;
    }
    if (this.validationIsNAN(id)) {
      this.showWarnMessage('فرمت شماره پیگیری اشتباه است');
      return false;
    }
    if (!this.utilsService.isLowerThanMinLength(id, 2) || !this.utilsService.isLowerThanMaxLength(id, 10)) {
      this.showWarnMessage('تعداد ارقام شماره پیگیری اشتباه است');
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

}
