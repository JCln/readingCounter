
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { IOutputManager } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { EN_Routes } from 'interfaces/routes.enum';
import { ProfileService } from 'services/profile.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { Converter } from 'src/app/classes/converter';
import { MathS } from '../classes/math-s';
import { OffloadModify } from '../classes/offload-modify-type';

import { IOffLoadPerDay, ITracking } from '../interfaces/itrackings';
import { AllListsService } from './all-lists.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { FollowUpService } from './follow-up.service';
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
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private allListsService: AllListsService,
    public columnManager: ColumnManager,
    private pageSignsService: PageSignsService,
    private profileService: ProfileService,
    private followUpService: FollowUpService,
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  // Output manager 
  downloadOutputDBF = (method: ENInterfaces, dbfData: ITracking | IOutputManager): Promise<any> => {
    dbfData.fromDate = Converter.persianToEngNumbers(dbfData.fromDate);
    dbfData.toDate = Converter.persianToEngNumbers(dbfData.toDate);
    const a: IOutputManager = {
      zoneId: dbfData.zoneId,
      fromDate: dbfData.fromDate,
      toDate: dbfData.toDate
    }
    return new Promise((resolve) => {
      this.ajaxReqWrapperService.interfaceManagerService.POSTBLOB(method, a).toPromise().then(res => {
        resolve(res);
      }).catch(() => {
        this.utilsService.snackBarMessageFailed(EN_messages.server_noDataFounded);
      })
    });
  }
  downloadOutputDBFEqamatBagh = (method: ENInterfaces, dbfData: any): Promise<any> => {
    return new Promise((resolve) => {
      this.ajaxReqWrapperService.interfaceManagerService.POSTBLOB(method, dbfData).toPromise().then(res => {
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
    return this.ajaxReqWrapperService.postBlobObserve(method, a);
  }
  downloadOutputSingleWithENV = (method: ENInterfaces, single: ITracking, inputData: string): Promise<any> => {
    const a: any = {
      trackingId: single.id,
      description: inputData
    }
    return this.ajaxReqWrapperService.postBlobObserve(method, a);
  }
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  hasNextBazdidConfirmDialog = (message: EN_messages): Promise<any> => {
    const a = {
      messageTitle: message,
      minWidth: '21rem',
      icon: 'pi pi-calendar-times',
      isInput: false,
      isDelete: false,
      isSelectableDate: true,
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  postOffloadModifyEdited = (method: ENInterfaces, body: IOffloadModifyReq): Promise<any> => {
    body.jalaliDay = Converter.persianToEngNumbers(body.jalaliDay);
    return this.ajaxReqWrapperService.postDataSourceByObject(method, body)
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
  showWarnMessage = (message: string) => this.utilsService.snackBarMessageWarn(message);
  isValidationNull = (elem: any): boolean => {
    if (MathS.isNull(elem))
      return true;
    return false;
  }
  denyTracking = (): boolean => {
    return this.utilsService.getDenyTracking();
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
      this.showWarnMessage(EN_messages.insert_counterNumber);
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
    if (!MathS.isLowerThanMinLength(id, ENRandomNumbers.two) || !MathS.isLowerThanMaxLength(id, ENRandomNumbers.ten)) {
      this.showWarnMessage(EN_messages.format_invalid_trackNumbersLength);
      return false;
    }
    return true;
  }
  /* VERIFICATION */
  validationImportedEdited = (dataSource: object): boolean => {
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
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
      if (dataSource.hasOwnProperty('alalHesabPercent')) {
        if (MathS.isNullZero(dataSource['alalHesabPercent'])) {
          this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
          return false;
        }
      }
      if (dataSource.hasOwnProperty('imagePercent')) {
        if (MathS.isNullZero(dataSource['imagePercent'])) {
          this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
          return false;
        }
      }
    }
    return true;
  }
  verificationOffloadModify = (object: IOffloadModifyReq): boolean => {
    return this.offloadModifyValidation(object);
  }
  verificationTrackNumber = (id: number): boolean => {
    return this.followUPValidation(id);
  }
  routeToFollowUp = (row: ITracking) => {
    this.followUpService.setTrackNumber(row.trackNumber);
    this.utilsService.routeToByUrl(EN_Routes.wrmsfwu);
  }
  routeToLMPDXY = (trackNumber: number, day: string, distance: number, isPerday: boolean) => {
    this.utilsService.routeToByParams('wr', { trackNumber: trackNumber, day: day, distance: distance, isPerday: isPerday });
  }
  routeToLMPayDay = (row: ITracking) => {
    this.pageSignsService.perday_pageSign.trackNumber = row.trackNumber;
    this.pageSignsService.perday_pageSign.zone = row.zoneTitle;
    this.utilsService.routeToByUrl(EN_Routes.wrmlpd);
  }
  routeToLMAll = (row: any) => {
    this.allListsService.allLists_pageSign.GUid = row.id;
    this.allListsService.allLists_pageSign.listNumber = row.listNumber;
    this.allListsService.allLists_pageSign.trackNumber = row.trackNumber;
    this.allListsService.allLists_pageSign.zoneTitle = row.zoneTitle;
    this.allListsService.allLists_pageSign.zoneId = row.zoneId;
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
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.allListsService.offloadedListLazy_pageSign.GUid = dataSource.id;
    this.allListsService.offloadedListLazy_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.offloadedListLazy_pageSign.groupId = dataSource.groupId;
    this.allListsService.offloadedListLazy_pageSign.zoneId = dataSource.zoneId;
    this.allListsService.offloadedListLazy_pageSign.zoneTitle = dataSource.zoneTitle;
    this.allListsService.offloadedListLazy_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.listAllLazy);
  }
  routeToOffloadAllInGroupLazy = (dataSource: ITracking) => {
    this.allListsService.offloadedListAllInGroupLazy_pageSign.GUid = dataSource.id;
    this.allListsService.offloadedListAllInGroupLazy_pageSign.listNumber = dataSource.listNumber;
    this.allListsService.offloadedListAllInGroupLazy_pageSign.groupId = dataSource.groupId;
    this.allListsService.offloadedListAllInGroupLazy_pageSign.zoneId = dataSource.zoneId;
    this.allListsService.offloadedListAllInGroupLazy_pageSign.zoneTitle = dataSource.zoneTitle;
    this.allListsService.offloadedListAllInGroupLazy_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.listAllInGroupLazy);
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
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }

}
