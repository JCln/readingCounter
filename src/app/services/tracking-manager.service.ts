import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOutputManager } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { ENSelectedColumnVariables, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { SortEvent } from 'primeng/api/sortevent';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { ProfileService } from 'services/profile.service';
import { AuthService } from 'src/app/auth/auth.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { ConfirmTextDialogComponent } from '../frame-work/manage/tracking/confirm-text-dialog/confirm-text-dialog.component';
import { IEditTracking, IOffLoadPerDay, ITracking } from '../interfaces/itrackings';
import { OffloadModify } from './../classes/offload-modify-type';
import { AllListsService } from './all-lists.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { EnvService } from './env.service';
import { PageSignsService } from './page-signs.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  dbfOutput: IOutputManager = {
    zoneId: 0,
    fromDate: null,
    toDate: null
  };
  dbfOutputEqamatBagh = {
    zoneId: 0
  };

  getColumnDefColumns = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('defColumns');
  }
  getFollowUpView = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('followUpView');
  }
  getImportedListDetails = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('importedListDetails');
  }
  getLMPerDayFollowUpPositions = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('LMPerDayFollowUpPositions');
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
  get getDBFOutPut(): IOutputManager {
    return this.dbfOutput;
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private dialog: MatDialog,
    private allListsService: AllListsService,
    private envService: EnvService,
    private jwtService: JwtService,
    private columnManager: ColumnManager,
    private pageSignsService: PageSignsService,
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  firstConfirmDialog = (message: EN_messages, isInput: boolean, isDelete: boolean): Promise<any> => {
    const a = {
      messageTitle: message,
      minWidth: '19rem',
      isInput: isInput,
      isDelete: isDelete
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  getApiUrl = (): string => {
    return this.envService.API_URL;
  }
  getAuthToken = (): string => {
    return this.jwtService.getAuthorizationToken();
  }

  getDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe(res => {
        resolve(res);
      });
    });
  }
  getDataSourceByQuote = (method: ENInterfaces, insertedInput: number | string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, insertedInput).subscribe(res => {
        resolve(res)
      })
    });
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
  postBody = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise(resolve => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then((res: IResponses) => {
        resolve(res);
      })
    });
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
  downloadOutputDBFEqamatBagh = (method: ENInterfaces, dbfData: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOB(method, dbfData).toPromise().then(res => {
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
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  /*VALIDATION */
  showWarnMessage = (message: string) => this.utilsService.snackBarMessageWarn(message);
  isValidationNull = (elem: any): boolean => {
    if (MathS.isNull(elem))
      return true;
    return false;
  }
  denyTracking = (): boolean => {
    const jwtRole = this.authService.getAuthUser();
    return jwtRole.roles.toString().includes('denytracking') ? true : false;
  }
  checkVertificationDBF = (dataSource: IOutputManager): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(dataSource.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }
  checkVertificationDBFEqamatBagh = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    return true;
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
  verificationTrackNumber = (id: number): boolean => {
    return this.followUPValidation(id);
  }
  routeToLMPDXY = (trackNumber: number, day: string, distance: number, isPerday: boolean) => {
    this.utilsService.routeToByParams('wr', { trackNumber: trackNumber, day: day, distance: distance, isPerday: isPerday });
  }
  routeToLMPayDay = (row: ITracking) => {
    this.pageSignsService.perday_pageSign.trackNumber = row.trackNumber;
    this.utilsService.routeToByUrl(EN_Routes.wrmlpd);
  }
  routeToLMAll = (row: any) => {
    this.allListsService.allLists_pageSign.GUid = row.id;
    this.allListsService.allLists_pageSign.listNumber = row.listNumber;
    this.allListsService.allLists_pageSign.trackNumber = row.trackNumber;
    this.allListsService.allLists_pageSign.zoneTitle = row.zoneTitle;
    this.utilsService.routeTo(EN_Routes.wrmlallfalse);
  }
  routeToOffloadModify = (dataSource: ITracking) => {
    this.allListsService.modifyLists_pageSign.GUid = dataSource.id;
    this.allListsService.modifyLists_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.modifyLists_pageSign.trackNumber = dataSource.trackNumber;
    this.allListsService.modifyLists_pageSign.zoneTitle = dataSource.zoneTitle;
    this.utilsService.routeTo(EN_Routes.wrmlalltrue);
  }
  routeToOffloadGeneralModify = (dataSource: ITracking) => {
    this.allListsService.generalModifyLists_pageSign.GUid = dataSource.id;
    this.allListsService.generalModifyLists_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.generalModifyLists_pageSign.groupId = dataSource.groupId;
    this.allListsService.generalModifyLists_pageSign.zoneId = dataSource.zoneId;
    this.allListsService.generalModifyLists_pageSign.zoneTitle = dataSource.zoneTitle;
    this.allListsService.generalModifyLists_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.wrmlGeneralModify);
  }
  routeToAssessPre = () => {
    this.utilsService.routeTo(EN_Routes.wrimpassesspre);
  }
  routeToOffloadGeneralModifyGrouped = (dataSource: ITracking) => {
    this.allListsService.generalModifyListsGrouped_pageSign.GUid = dataSource.id;
    this.allListsService.generalModifyListsGrouped_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.generalModifyListsGrouped_pageSign.groupId = dataSource.groupId;
    this.allListsService.generalModifyListsGrouped_pageSign.zoneId = dataSource.zoneId;
    this.allListsService.generalModifyListsGrouped_pageSign.zoneTitle = dataSource.zoneTitle;
    this.allListsService.generalModifyListsGrouped_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.wrmlGeneralGModify);
  }
  routeTo = (route: string, UUID: string) => {
    this.utilsService.routeToByParams(route, UUID);
  }
  setGetRanges = (dataSource: IOffLoadPerDay) => {
    dataSource.overalDuration = parseFloat(MathS.getRange(dataSource.overalDuration));
    dataSource.overalDistance = parseFloat(MathS.getRange(dataSource.overalDistance));
  }
  userKarkardValidation = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['zoneId'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource['fromDate'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(dataSource['toDate'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }
  getLocalResizable = (): boolean => {
    return this.profileService.getLocalResizable();
  }
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }

}
