
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { IOutputManager } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { EN_Routes } from 'interfaces/routes.enum';
import { ProfileService } from 'services/profile.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { MathS } from '../classes/math-s';
import { OffloadModify } from '../classes/offload-modify-type';

import { IOffLoadPerDay, ITracking, ITrackingMasterDto } from '../interfaces/itrackings';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { FollowUpService } from './follow-up.service';
import { UtilsService } from './utils.service';
import { PageSignsService } from './page-signs.service';
import { VerificationService } from './verification.service';

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
    private pageSignsService: PageSignsService,
    public columnManager: ColumnManager,
    public profileService: ProfileService,
    private followUpService: FollowUpService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public verificationService: VerificationService
  ) { }

  // Output manager 
  downloadOutputDBF = (method: ENInterfaces, dbfData: ITracking | IOutputManager): Promise<any> => {
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
  denyTracking = (): boolean => {
    return this.utilsService.getDenyTracking();
  }
  verificationOffloadModify = (object: IOffloadModifyReq): boolean => {
    return this.verificationService.offloadModifyValidation(object);
  }
  verificationTrackNumber = (id: number): boolean => {
    return this.verificationService.followUPValidation(id);
  }
  routeToFollowUp = (row: any) => {
    this.followUpService.setTrackNumber(row.trackNumber);
    this.utilsService.routeToByUrl(EN_Routes.followUp);
  }
  routeToLMPDXY = (trackNumber: number, day: string, distance: number, isPerday: boolean) => {
    this.utilsService.routeToByParams('wr', { trackNumber: trackNumber, day: day, distance: distance, isPerday: isPerday });
  }
  routeToAssessPre = (row: ITracking) => {
    this.pageSignsService.assessPre_pageSign.zoneId = row.zoneId;
    this.pageSignsService.assessPre_pageSign.listNumber = row.listNumber;
    this.pageSignsService.assessPre_pageSign.isFromSource = true;
    this.utilsService.routeToByUrl(EN_Routes.assessPre);
  }
  routeToLMPayDay = (row: ITracking) => {
    this.pageSignsService.perday_pageSign.trackNumber = row.trackNumber;
    this.pageSignsService.perday_pageSign.zone = row.zoneTitle;
    this.utilsService.routeToByUrl(EN_Routes.wrmlpd);
  }
  routeToLMAll = (row: any, whereToBack: EN_Routes) => {
    this.pageSignsService.allLists_pageSign.GUid = row.id;
    this.pageSignsService.allLists_pageSign.listNumber = row.listNumber;
    this.pageSignsService.allLists_pageSign.trackNumber = row.trackNumber;
    this.pageSignsService.allLists_pageSign.zoneTitle = row.zoneTitle;
    this.pageSignsService.allLists_pageSign.zoneId = row.zoneId;
    this.pageSignsService.allLists_pageSign.prePage = whereToBack;
    this.utilsService.routeTo(EN_Routes.wrmlallfalse);
  }
  routeToOffloadModify = (dataSource: ITracking, whereToBack: EN_Routes) => {
    this.pageSignsService.modifyLists_pageSign.GUid = dataSource.id;
    this.pageSignsService.modifyLists_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.modifyLists_pageSign.trackNumber = dataSource.trackNumber;
    this.pageSignsService.modifyLists_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.modifyLists_pageSign.prePage = whereToBack;
    this.utilsService.routeTo(EN_Routes.wrmlalltrue);
  }
  routeToOffloadGeneralModify = (dataSource: ITracking) => {
    this.pageSignsService.generalModifyLists_pageSign.GUid = dataSource.id;
    this.pageSignsService.generalModifyLists_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.generalModifyLists_pageSign.groupId = dataSource.groupId;
    this.pageSignsService.generalModifyLists_pageSign.zoneId = dataSource.zoneId;
    this.pageSignsService.generalModifyLists_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.generalModifyLists_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.wrmlGeneralModify);
  }
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.pageSignsService.offloadedListLazy_pageSign.GUid = dataSource.id;
    this.pageSignsService.offloadedListLazy_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.offloadedListLazy_pageSign.groupId = dataSource.groupId;
    this.pageSignsService.offloadedListLazy_pageSign.zoneId = dataSource.zoneId;
    this.pageSignsService.offloadedListLazy_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.offloadedListLazy_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.listAllLazy);
  }
  routeToMasterByFragmentLazy = (dataSource: ITracking) => {
    this.pageSignsService.masterByFragmentLazy_pageSign.GUid = dataSource.id;
    this.pageSignsService.masterByFragmentLazy_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.masterByFragmentLazy_pageSign.groupId = dataSource.groupId;
    this.pageSignsService.masterByFragmentLazy_pageSign.zoneId = dataSource.zoneId;
    this.pageSignsService.masterByFragmentLazy_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.masterByFragmentLazy_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.simpleMasterByFragmentAllLazy);
  }
  routeToOffloadAllInGroupLazy = (dataSource: ITrackingMasterDto) => {
    this.pageSignsService.offloadedListAllInGroupLazy_pageSign.GUid = dataSource.groupId;
    this.pageSignsService.offloadedListAllInGroupLazy_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.offloadedListAllInGroupLazy_pageSign.groupId = dataSource.groupId;
    this.pageSignsService.offloadedListAllInGroupLazy_pageSign.zoneId = dataSource.zoneId;
    this.pageSignsService.offloadedListAllInGroupLazy_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.offloadedListAllInGroupLazy_pageSign.routeCount = dataSource.routeCount;
    this.utilsService.routeTo(EN_Routes.listAllInGroupLazy);
  }
  routeToMasterByFragmentAllInGroupLazy = (dataSource: ITrackingMasterDto) => {
    this.pageSignsService.masterByFragmentAllInGroupLazy_pageSign.GUid = dataSource.groupId;
    this.pageSignsService.masterByFragmentAllInGroupLazy_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.masterByFragmentAllInGroupLazy_pageSign.groupId = dataSource.groupId;
    this.pageSignsService.masterByFragmentAllInGroupLazy_pageSign.zoneId = dataSource.zoneId;
    this.pageSignsService.masterByFragmentAllInGroupLazy_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.masterByFragmentAllInGroupLazy_pageSign.routeCount = dataSource.routeCount;
    this.utilsService.routeTo(EN_Routes.masterByFragmentAllInGroupLazy);
  }
  routeToOffloadGeneralModifyGrouped = (dataSource: ITracking) => {
    this.pageSignsService.generalModifyListsGrouped_pageSign.GUid = dataSource.id;
    this.pageSignsService.generalModifyListsGrouped_pageSign.listNumber = dataSource.listNumber;
    this.pageSignsService.generalModifyListsGrouped_pageSign.groupId = dataSource.groupId;
    this.pageSignsService.generalModifyListsGrouped_pageSign.zoneId = dataSource.zoneId;
    this.pageSignsService.generalModifyListsGrouped_pageSign.zoneTitle = dataSource.zoneTitle;
    this.pageSignsService.generalModifyListsGrouped_pageSign.trackNumber = dataSource.trackNumber;
    this.utilsService.routeTo(EN_Routes.wrmlGeneralGModify);
  }
  setGetRanges = (dataSource: IOffLoadPerDay) => {
    dataSource.overalDuration = parseFloat(MathS.getRange(dataSource.overalDuration));
    dataSource.overalDistance = parseFloat(MathS.getRange(dataSource.overalDistance));
  }


}
