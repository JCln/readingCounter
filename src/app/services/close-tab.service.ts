import { Injectable } from '@angular/core';
import { IReadingTimeRes } from 'interfaces/data-mining';
import { IAuthLevel2, IAuthLevel3, IAuthLevel4, IAuthLevels } from 'interfaces/iauth-levels';
import { IAnalyzeRes } from 'interfaces/idashboard-map';
import { IAssessPreDisplayDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import { ILatestReads } from 'interfaces/imoment';
import {
  IFileExcelReq,
  IImportDynamicDefault,
  IImportErrors,
  IImportSimafaBatchReq,
  IImportSimafaReadingProgramsReq,
  IImportSimafaSingleReq,
  IReadingProgramRes,
} from 'interfaces/import-data';
import { IAPK, IOffloadModifyReq } from 'interfaces/inon-manage';
import { ISearchInOrderTo, ISidebarVals, ITabs, ITitleValue } from 'interfaces/ioverall-config';
import {
  IAbBahaFormula,
  IAutomaticImport,
  ICounterReport,
  ICounterState,
  IDynamicTraverse,
  IFragmentDetails,
  IFragmentMaster,
  IGuild,
  IImageAttribution,
  IKarbari,
  IReadingPeriod,
  IReadingPeriodKind,
  ITabsare2Formula,
  ITextOutput,
} from 'interfaces/ireads-manager';
import {
  IDynamicReportsRes,
  IImageAttributionAnalyze,
  IImageAttributionResult,
  IImageUrlAndInfos,
  IKarkardAllStatesDto,
  IRRChartResWrapper,
  IReadingGuildReportOutput,
  IReadingReportDetails,
  IReadingReportKarkard,
  IReadingReportMaster,
  IReadingReportTraverse,
  IReadingReportTraverseDifferentialRes,
  IUserKarkard,
} from 'interfaces/ireports';
import { IFollowUp } from 'interfaces/isearchs';
import { IDynamicExcelReq } from 'interfaces/itools';
import { IOffLoadPerDay, IOnOffLoad, ITracking, ITrackingMasterDto, ITrackingSearchDto } from 'interfaces/itrackings';
import { IAddUserInfos, IRoleManager, IUserCompareManager, IUserManager, IUserOnlines } from 'interfaces/iuser-manager';
import { ICountryManager, IProvinceManager, IRegionManager, IZoneBoundManager, IZoneManager } from 'interfaces/izones';
import { EN_Routes } from 'interfaces/routes.enum';
import { ISearchMoshReq, ISearchProReportInput, ISearchSimpleOutput, ISearchSimpleReq } from 'interfaces/search';
import { UtilsService } from 'services/utils.service';
import { IPolicies, IRoleHistory, IUsersLoginBriefInfo } from './DI/privacies';
import { ENReadingReports } from 'interfaces/reading-reports';
import { IForbiddenManager, IListLatestInfoReq, IMostReportInput, IOnOffLoadFlat, IOnOffLoadFlatLazy } from 'interfaces/imanage';
import { IFeedbackList, IFeedbackListReq, IFeedbackType } from 'interfaces/imobile-manager';
import { IRequestLog, IRequestLogInput, IServerOSInfo, IManageDrivesInfo, IManageServerErrorsRes, IUserActivation, IUserActivationREQ, IBlockOrSafeIp, IGetBlocked, IGetBlockedCompareVals, IIOPolicy, IIOPolicyHistory, IIOAttemptsLog, ILogMemoryStatus, IServerAuthenticityBrief, IServerGetAuthenticity, IAuthenticityAttempts } from 'interfaces/iserver-manager';
import { IWaterMarkConfig, ILicenseInfo, INotificationMessage } from 'interfaces/isettings';
import { ENEssentialsToSave, ENRandomNumbers, ITimesType } from 'interfaces/enums.enum';
import { MathS } from '../classes/math-s';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ProfileService } from './profile.service';
import { Search } from '../classes/search';

@Injectable({
  providedIn: 'root'
})
export class CloseTabService {
  _isOrderByDate: boolean = false;//TODO: Show order by date in order to personal config
  ENReadingReports = ENReadingReports;

  constructor(
    public utilsService: UtilsService,
    public profileService: ProfileService
  ) {
  }
  /* TAB WRAPPER */
  readonly _rowsPerPage: number[] = [10, 20, 50, 100];
  tabs: ITabs[] = [];
  years: ITitleValue[] = this.utilsService.getYears();
  // Formular s 
  saveDataForWaterFormula: IAbBahaFormula[];
  saveDataForBadgetFormula: IAbBahaFormula[];
  saveDataForTabsare2Formula: ITabsare2Formula[];
  saveDataForTabsare3Formula: IAbBahaFormula[];
  // 
  // save data when route change 
  saveDataForAppLevel1: IAuthLevels[];
  saveDataForAppLevel2: IAuthLevel2[];
  saveDataForAppLevel3: IAuthLevel3[];
  saveDataForAppLevel4: IAuthLevel4[];

  saveDataForCounterState: ICounterState[];
  saveDataForImageAttribution: IImageAttribution[];
  saveDataForGuild: IGuild[];

  ipFilterHistory: IGetBlockedCompareVals[] = [];
  getIpFilterHisotry = async (canRefresh: boolean): Promise<any> => {
    if (!MathS.isNull(this.ipFilterHistory) && !canRefresh)
      return this.ipFilterHistory;
    this.ipFilterHistory = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIpFilterHistory);
  }
  trackingOffloadedDetails: ITracking[] = [];
  trackingOffloadedMaster: ITrackingMasterDto[] = [];
  getTrackingOffloadedMaster = async (canRefresh: boolean): Promise<any> => {
    if (!MathS.isNull(this.trackingOffloadedMaster) && !canRefresh)
      return this.trackingOffloadedMaster;
    this.trackingOffloadedMaster = await this.utilsService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingOffloadedMaster);
    return this.trackingOffloadedMaster;
  }
  simpleMasterByFragmentDetails: ITracking[] = [];
  simpleMasterByFragment: ITrackingMasterDto[] = [];
  simpleMasterByFragmentAllLazy: IOnOffLoadFlatLazy = {
    data: [],
    totalRecords: 0
  };
  simpleMasterByFragmentReq = {
    zoneId: null,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    readingPeriodId: null,
    _selectedKindId: '',
    year: this.utilsService.getFirstYear(),
    isCollapsed: false
  }
  insertToTimes = (): ITimesType => {
    let temp = this.utilsService.dateJalaliService.getCurrentTime();
    const hour = temp.split(':').shift();
    const minute = temp.split(':').pop();
    const fromTimeM = minute;
    let fromTimeH: any = hour - 1;
    const toTimeM = minute;
    let toTimeH: any = hour;
    // add zero before single digits even if it is zero
    if (fromTimeH < ENRandomNumbers.ten) {
      fromTimeH = '0'.concat(fromTimeH.toString());
    }
    if (hour == '24') {
      toTimeH = '00';
    }
    return {
      jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
      fromTimeM: fromTimeM,
      fromTimeH: fromTimeH,
      toTimeM: toTimeM,
      toTimeH: toTimeH,
      fromTime: fromTimeH + ':' + fromTimeM,
      toTime: toTimeH + ':' + toTimeM
    }
  }

  saveDataForOffloadedAllLazyReq = {
    counterStateValue: null,
    multiSelectCounterStateId: [],
    multiSelectPreCounterStateCode: [],
    multiSelectkarbariCode: [],
    multiSelectMasrafStateId: [],//وضعیت مصرف
    multiSelectHazf: []// 
  };
  masterByFragmentLazyReq = {
    counterStateValue: null,
    multiSelectCounterStateId: [],
    multiSelectPreCounterStateCode: [],
    multiSelectkarbariCode: [],
    multiSelectMasrafStateId: [],//وضعیت مصرف
    multiSelectHazf: []// 
  };
  offloadedAllLazy: IOnOffLoadFlatLazy = {
    data: [],
    totalRecords: 0
  };
  allInGroupLazyReq = {
    counterStateValue: null,
    multiSelectCounterStateId: [],
    multiSelectPreCounterStateCode: [],
    multiSelectkarbariCode: [],
    multiSelectMasrafStateId: [],//وضعیت مصرف
    multiSelectHazf: []// 
  };
  offloadedAllInGroupLazy: IOnOffLoadFlatLazy = {
    data: [],
    totalRecords: 0
  };
  masterByFragmentallInGroupLazyReq = {
    counterStateValue: null,
    multiSelectCounterStateId: [],
    multiSelectPreCounterStateCode: [],
    multiSelectkarbariCode: [],
    multiSelectMasrafStateId: [],//وضعیت مصرف
    multiSelectHazf: []// 
  };
  masterByFragmentAllInGroupLazy: IOnOffLoadFlatLazy = {
    data: [],
    totalRecords: 0
  };
  IOPolicyHistory: IIOPolicyHistory[] = [];
  iOPolicy: IIOPolicy = {
    id: null,
    inputExtensions: '',
    contentType: '',
    inputMaxSizeKb: null,
    inputMaxCountPerUser: null,
    inputMaxCountPerDay: null,
    outputMaxCountPerUser: null,
    outputMaxCountPerDay: null,
  };
  ipFilterRes: IBlockOrSafeIp[];
  saveDataForDynamicTraverse: IDynamicTraverse[];
  saveDataForKarbari: IKarbari[];
  saveDataForReadingConfig: IReadingConfigDefault[];
  saveDataForReadingPeriodManager: IReadingPeriod[];
  saveDataForReadingPeriodKindManager: IReadingPeriodKind[];
  saveDataForAPKManager: IAPK[];
  saveDataForCounterReport: ICounterReport[];
  saveDataForQotrManager: any;

  // zones
  saveDataForCountry: ICountryManager[];
  saveDataForProvince: IProvinceManager[];
  saveDataForRegion: IRegionManager[];
  saveDataForZone: IZoneManager[];
  saveDataForZoneBound: IZoneBoundManager[];

  saveDataForUserMasterHistory: IRoleHistory[] = [];
  saveDataForUserDetailsHistory: any = [];
  userCompare: IUserCompareManager = {
    previous:
    {
      provinceItems: [
        {
          title: '',
          logicalOrder: null,
          regionItems: [
            {
              title: '',
              logicalOrder: null,
              zoneItems: [
                {
                  title: '',
                  logicalOrder: null,
                  id: null,
                  isMetro: true,
                  isSelected: true
                }
              ],
              isSelected: true
            }
          ],
          isSelected: true
        }
      ],
      appItems: [
        {
          title: '',
          cssClass: '',
          logicalOrder: null,
          moduleItems: [
            {
              title: '',
              cssClass: '',
              logicalOrder: null,
              controllerItems: [
                {
                  title: '',
                  cssClass: '',
                  logicalOrder: null,
                  actionItems: [
                    {
                      title: '',
                      cssClass: '',
                      logicalOrder: null,
                      value: '',
                      isSelected: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      changeOrInsertLogId: '',
      description: '',
      insertDateTime: '',
      insertDateJalali: '',
      insertTime: '',
      ip: '',
      browserVersion: '',
      browserTitle: '',
      browserShortTitle: '',
      browserEngine: '',
      browserType: '',
      osVersion: '',
      osTitle: '',
      osPlatform: '',
      osShortTitle: '',
      userAgent: '',
      userDisplayName: ''
    },
    this:
    {
      provinceItems: [
        {
          title: '',
          logicalOrder: null,
          regionItems: [
            {
              title: '',
              logicalOrder: null,
              zoneItems: [
                {
                  title: '',
                  logicalOrder: null,
                  id: null,
                  isMetro: true,
                  isSelected: true
                }
              ],
              isSelected: true
            }
          ],
          isSelected: true
        }
      ],
      appItems: [
        {
          title: '',
          cssClass: '',
          logicalOrder: null,
          moduleItems: [
            {
              title: '',
              cssClass: '',
              logicalOrder: null,
              controllerItems: [
                {
                  title: '',
                  cssClass: '',
                  logicalOrder: null,
                  actionItems: [
                    {
                      title: '',
                      cssClass: '',
                      logicalOrder: null,
                      value: '',
                      isSelected: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      changeOrInsertLogId: '',
      description: '',
      insertDateTime: '',
      insertDateJalali: '',
      insertTime: '',
      ip: '',
      browserVersion: '',
      browserTitle: '',
      browserShortTitle: '',
      browserEngine: '',
      browserType: '',
      osVersion: '',
      osTitle: '',
      osPlatform: '',
      osShortTitle: '',
      userAgent: '',
      userDisplayName: ''
    }
  };
  saveDataForUserMasterDetailsHistoryReq = {
    id: ''
  };
  saveDataForUserCompareReq = {
    id: ''
  };

  saveDataForUserRoleHistory: IRoleHistory[] = [];
  saveDataForUserRoleHistorySumReq = {
    id: ''
  };
  _userAddUserInfos: IAddUserInfos = {
    userCode: null,
    username: null,
    password: null,
    confirmPassword: null,
    firstName: '',
    sureName: '',
    email: '',
    mobile: '',
    displayMobile: false,
    displayName: '',
    isActive: true,
    deviceId: ''
  };
  saveDataForAllUsers: IUserManager[] = [];
  saveDataForUserOnlines: IUserOnlines[];
  saveDataForEditUsers: any;
  saveDataForEditUsersGUID: string;
  saveDataForRoleManager: IRoleManager[];
  saveDataForUserLoggins: any;
  saveDataForEditOnRole: any;
  saveDataForRoleHistory: IRoleHistory[] = [];
  saveDataForAddUsers: any;
  saveDataForUserSearch: any;
  saveDataForUserSearchRes: any;
  usersLogins: IUsersLoginBriefInfo[] = [];
  usersLoginsReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
  }
  ipFilterBlockedUsers: IGetBlocked[] = [];
  reqLogUserActivationByUserId: IUserActivation[] = [];
  authenticityAttempts: IAuthenticityAttempts[] = [];
  authenticityAttemptsReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
  }
  ipFilterGetBlocked: IGetBlocked[] = [];
  ipFilterGetBlockedReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
  }
  ipFilterGetInvalidTime: IGetBlocked[] = [];
  ipFilterGetInvalidTimeReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
  }
  offlineSingleReadingCounterReq = {
    searchBy: 1,
    item: '',
    searchType: [],
    _isCollapsed: false
  }
  offlineSingleReadingCounter: IOnOffLoadFlat[];
  // track manager
  saveDataForTrackImported: ITracking[] = [];
  saveDataForTrackLoaded: ITracking[] = [];
  saveDataForTrackReading: ITracking[] = [];
  importedEditedRes: ITracking[] = [];
  importedEditedReq: ITrackingSearchDto = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    zoneId: null,
    imagePercent: null,
    alalHesabPercent: null,
    isRoosta: false,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
  }
  saveDataForUserKarkard: IUserKarkard[];
  saveDataForTrackOffloaded: ITracking[] = [];
  saveDataForUserKarkardSummaryReq = {
    zoneId: null,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    _isCollapsed: false
  };
  saveDataForUserKarkardSummary: any;
  saveDataForUserKarkardSummaryTwo: any;
  saveDataForTrackOffloadedGroup: ITracking[] = [];
  saveDataForKarkardAllStates: IKarkardAllStatesDto[];
  saveDataForKarkardAllStatesTWO: any;
  offloadedGroupReq = {
    _selectedAggregate: 'listNumber'// Default group by
  }
  saveDataForTrackFinished: ITracking[] = [];
  saveDataForLastStates: ITracking[] = [];
  saveDataForFollowUp: IFollowUp;
  saveDataForFollowUpReq = {
    trackNumber: null,
    canShowGraph: false,
    _isCollapsed: false
  }
  saveDataForFollowUpAUX: any;
  // import dynamic
  saveDataForAutomaticImport: IAutomaticImport[];
  importDynamicReq: IImportDynamicDefault = {
    fromEshterak: '',
    toEshterak: '',
    zoneId: null,
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    counterReaderId: '',
    readingPeriodId: null,
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
  }
  saveDataForImportDynamic: any;
  saveDataForImportErrors: IImportErrors[] = [];
  saveDataForImportErrorsByTrackNumber = [];
  saveDataForImportErrorsByTrackNumberReq = {
    trackNumber: null,
    _isCollapsed: false
  }
  simafaSingleReq: IImportSimafaSingleReq = {
    zoneId: 0,
    alalHesabPercent: null,
    imagePercent: null,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
    counterReaderId: '',
    readingPeriodId: null,
    year: this.utilsService.getFirstYear(),
    readingProgramId: ''
  }
  saveDataForSimafaBatch: IFragmentDetails[] = [];
  saveDataForSimafaBatchReq = {
    GUid: ''
  }
  importSimafaReadingProgramReq: IImportSimafaReadingProgramsReq = {
    zoneId: 0,
    readingPeriodId: 0,
    year: this.utilsService.getFirstYear(),
    kindId: null,
    _isCollapsed: false
  }
  saveDataForImportDataFileExcel: any;
  saveDataForImportDataFileExcelReq: IFileExcelReq = {
    zoneId: 0,
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
    skipErrors: false,
    counterReaderId: '',
    readingPeriodId: '',
    listNumber: '',
    description: '',
    year: this.utilsService.getFirstYear(),
    file: File
  }
  saveDataForSimafaReadingPrograms: IReadingProgramRes[] = [];
  saveDataForAssessPreReq: IAssessPreDisplayDtoSimafa = {
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    zoneId: null,
    listNumber: '',
    noImages: false
  };
  saveDataForAssessPre: IOnOffLoadFlat[];
  saveDataForAssessAdd: any;
  // SEARCH
  searchReqMosh: ISearchMoshReq = {
    zoneId: null,
    searchBy: 1,
    item: null,
    similar: false,
    showAll: false
  }
  _searchSimpleReq: ISearchSimpleReq = {
    zoneId: null,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    readingPeriodId: null,
    _selectedKindId: '',
    year: this.utilsService.getFirstYear(),
    isCollapsed: false
  }
  saveDataForSearchMoshtarakin: IOnOffLoadFlat[] = [];
  saveDataForSearchPro: IOnOffLoadFlat[] = [];
  saveDataForSearchProReq: ISearchProReportInput = {
    zoneId: null,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    readingPeriodId: null,
    zoneIds: [],
    year: this.utilsService.getFirstYear(),
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: [],
    _selectedKindId: '',
    searchByText: '',
    showAll: false
  }
  saveDataForSearchSimple: ISearchSimpleOutput[] = [];
  // list manager
  saveDataForLMPD: IOffLoadPerDay;
  saveDataForLMPDTrackNumber: number;
  saveDataForLMAllReq = {
    GUID: ''
  };
  saveDataForLMAll: IOnOffLoadFlat[] = [];
  saveDataForLMModifyReq: any;
  saveDataForLMModify: IOnOffLoadFlat[];
  saveDataForLMGeneralModifyReq = {
    GUid: '',
    groupId: '',
    counterStateValue: null,
    multiSelectCounterStateId: [],
    multiSelectPreCounterStateCode: []
  };
  saveDataForLMGeneralModify: IOnOffLoadFlat[];
  saveDataForLMGeneralGroupModifyReq = {
    GUid: '',
    groupId: '',
    counterStateValue: null,
    multiSelectCounterStateId: [],
    multiSelectPreCounterStateCode: []
  };
  saveDataForLMGeneralGroupModify: IOnOffLoadFlat[] = [];
  AUXSaveDataForLMGeneralGroupModify: IOnOffLoadFlat[] = [];
  // dbf output manager
  saveDataForOutputDBF: any;
  saveDataForOutputDBFEqamatBagh: any;
  // reading reports 
  saveDataForRRTraverse: IReadingReportTraverse[];
  saveDataForRRTraverseDifferential: IReadingReportTraverseDifferentialRes[];
  saveDataForRRKarkard: IReadingReportKarkard[];
  saveDataForRROffloadedKarkard: IReadingReportKarkard[];
  saveDataForRRFragment: IReadingReportKarkard[];
  saveDataForRRkarkardDaily: IReadingReportKarkard[];
  saveDataForRRPreNumShown: IOnOffLoadFlat[] = [];
  saveDataForRRLocked: IOnOffLoadFlat[] = [];
  saveDataForRRMaster: IReadingReportMaster[];
  saveDataForImageAttrResult: IImageAttributionResult[];
  saveDataForImageAttrAnalyze: IImageAttributionAnalyze[] = [];
  saveDataForRRPerformance: IAnalyzeRes[];
  saveDataForDMAAnalyze: IReadingTimeRes[];
  saveDataForRRDetails: IReadingReportDetails[];
  RRGuildsWithParam: IReadingGuildReportOutput[];
  saveDataForRequestLogListUser: IRequestLog[];
  saveDataForRequestLogAnonymous: IRequestLog[] = [];
  requestLogUnAuthorized: IRequestLog[] = [];
  saveDataForRequestLogListUserReq: IRequestLogInput = {
    jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
    fromTimeH: this.insertToTimes().fromTimeH,
    fromTimeM: this.insertToTimes().fromTimeM,
    toTimeH: this.insertToTimes().toTimeH,
    toTimeM: this.insertToTimes().toTimeM,
    fromTime: this.insertToTimes().fromTime,
    toTime: this.insertToTimes().toTime
  }
  saveDataForRequestLogAnonymousReq: IRequestLogInput = {
    jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
    fromTimeH: this.insertToTimes().fromTimeH,
    fromTimeM: this.insertToTimes().fromTimeM,
    toTimeH: this.insertToTimes().toTimeH,
    toTimeM: this.insertToTimes().toTimeM,
    fromTime: this.insertToTimes().fromTime,
    toTime: this.insertToTimes().toTime
  }
  requestLogUnAuthorizedReq: IRequestLogInput = {
    jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
    fromTimeH: this.insertToTimes().fromTimeH,
    fromTimeM: this.insertToTimes().fromTimeM,
    toTimeH: this.insertToTimes().toTimeH,
    toTimeM: this.insertToTimes().toTimeM,
    fromTime: this.insertToTimes().fromTime,
    toTime: this.insertToTimes().toTime
  }
  saveDataForWaterMark: IWaterMarkConfig = {
    id: '',
    r: 255,
    g: 255,
    b: 255,
    a: 1,
    fontSize: 16,
    x: 0,
    y: 0,
    userDisplayName: '',
    insertDateTime: ''
  }
  saveDataForOSInfo: IServerOSInfo = {
    cpuCoreCount: null,
    version: '',
    servicePack: '',
    elapsedDateTime: '',
    isOs64: true,
    systemDateTime: '',
  }
  saveDataForMsDriveInfo: IManageDrivesInfo[];
  serverGetAuthenticity: IServerGetAuthenticity[] = [];
  serverAuthenticityBrief: IServerAuthenticityBrief[] = [];
  saveDataForServerErrors: IManageServerErrorsRes[] = [];
  serverErrorsSelectedErrors: any[] = [];
  saveDataForServerUserActivation: IUserActivation[] = [];
  saveDataForServerUserActivationReq: IUserActivationREQ = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    userActivationLogTypes: []
  };
  saveDataForIpSpecialRules: any;
  // saveDataForIpSpecialRules: IIpRules[];
  license: ILicenseInfo;
  notificationMessages: INotificationMessage[] = [] = [];
  notificationMessagesReq = {
    messageType: -1,
    userInputType: -1
  }
  notificationListByDate: INotificationMessage[] = [];
  notificationListByDateReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate()
  }
  getUploaded: IOnOffLoad[] = [];
  getUploadedReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate()
  };
  downloadAttempts: IIOAttemptsLog[] = [];
  downloadAttemptsReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate()
  };
  uploadAttempts: IIOAttemptsLog[] = [];
  uploadAttemptsReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate()
  }
  logMemoryStatus: ILogMemoryStatus = {
    maxLogCount: 0,
    logCount: 0,
    remainedCount: 0,
    systemDateTime: ''
  };
  saveDataForRRDisposalHours: IRRChartResWrapper[];
  saveDataForRRGIS: any;
  saveDataForFragmentNOB: IFragmentMaster[];
  saveDataForFragmentNOBDetails: IFragmentDetails[];
  fragmentNOBDetailsGUID: any;

  saveDataForTextOutput: ITextOutput[];
  saveDataForToolsExcelViewer: IDynamicExcelReq[];
  saveDataForDynamicReports: IDynamicReportsRes[];
  saveDataForPoliciesHistory: IPolicies[] = [];
  saveDataForPolicies: IPolicies = {
    id: null,
    enableValidIpCaptcha: false,
    requireCaptchaInvalidAttempts: 0,
    enableValidIpRecaptcha: false,
    requireRecaptchaInvalidAttempts: 0,
    lockInvalidAttempts: 0,
    lockMin: 0,
    minPasswordLength: 0,
    passwordContainsNumber: false,
    passwordContainsLowercase: false,
    passwordContainsUppercase: false,
    passwordContainsNonAlphaNumeric: false,
    canUpdateDeviceId: false,
    userDisplayName: '',
    ip: '',
    browserVersion: '',
    browserTitle: '',
    browserShortTitle: '',
    browserEngine: '',
    browserType: '',
    osVersion: '',
    osTitle: '',
    osPlatform: '',
    osShortTitle: '',
    userAgent: '',
    fromTime: '',
    toTime: '',
    maxLogRecords: 0,
    deactiveTerminationMinutes: 0
  };
  editModifyReq: IOffloadModifyReq = {
    id: '',
    modifyType: null,
    checkedItems: [],
    counterStateId: null,
    counterNumber: null,
    jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
    description: ''
  };
  listLatestInfoReq: IListLatestInfoReq = {
    searchBy: Search.eshterak.id,
    item: '',
  }
  listLatestInfo: any = {
    id: '',
    trackNumber: null,
    billId: '',
    radif: null,
    eshterak: '',
    qeraatCode: '',
    firstName: '',
    sureName: '',
    address: '',
    pelak: '',
    karbariCode: null,
    ahadMaskooniOrAsli: null,
    ahadTejariOrFari: null,
    ahadSaierOrAbBaha: null,
    qotrCode: null,
    sifoonQotrCode: null,
    fatherName: '',
    oldRadif: '',
    oldEshterak: '',
    postalCode: '',
    preNumber: null,
    preDate: '',
    preAverage: null,
    preCounterStateCode: null,
    preCounterStateTitle: '',
    counterSerial: '',
    counterInstallDate: '',
    tavizDate: '',
    tavizNumber: null,
    zarfiat: null,
    mobile: '',
    hazf: null,
    hasError: false,
    errorDescription: '',
    zoneId: null,
    counterNumber: null,
    counterStateId: '',
    tempCounterState: null,
    counterStateCode: null,
    possibleAddress: '',
    possibleCounterSerial: '',
    possibleEshterak: '',
    possibleMobile: '',
    possiblePhoneNumber: '',
    possibleAhadMaskooniOrAsli: null,
    possibleAhadTejariOrFari: null,
    possibleAhadSaierOrAbBaha: null,
    possibleKarbariCode: null,
    offloadDateJalali: '',
    offLoadTime: '',
    y: '',
    x: '',
    d1: '',
    d2: '',
    counterStatePosition: null,
    attemptCount: null,
    isLocked: false,
    gisAccuracy: '',
    imageCount: false,
    masraf: null,
    eslahType: null,
    newRate: null,
    newRateDaily: null,
    reteDifference: null,
    dateDifference: null,
    counterNumberShown: false,
    excludedForBazdid: false,
    masrafStateId: null,
    description: '',
    isSelected: false,
    zoneTitle: '',
    readingReportTitles: '',
    mobiles: '',
    balance: null,
    locationDateTime: '',
    phoneDateTime: '',
    modifyType: '',
    modify: '',
    isResponseHasError: false,
    editedErrorDescription: '',
    fileRepositoryId: '',
  };
  forbiddenReq: IMostReportInput = {
    zoneId: 0,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    zoneIds: [0]
  }
  saveDataForFNB: IForbiddenManager[] = [];
  saveDataForProfile: any;
  saveDataForMomentLastRead: ILatestReads[] = [];
  saveDataForRRGallery = [];
  saveDataForRRGalleryRSFirst: any;
  saveDataForRRGalleryReq: any;
  saveDataForRandomImgs = [];
  saveDataForImgResultDetailsGridBased: IImageUrlAndInfos[];
  saveDataForRandomImgsRSFirst: any;
  saveDataForImgResultDetailsRes = [];
  saveDataForImgResultDetailsResFirst: any;

  mobileManagerFeedbackTypeIsComplaint: IFeedbackType[] = [];
  mobileManagerFeedbackTypeIsNotComplaint: IFeedbackType[] = [];
  mobileManagerFeedbackAllC: IFeedbackList[] = [];
  mobileManagerFeedbackAllCReq: IFeedbackListReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate()
  };
  mobileManagerFeedbackAllSReq: IFeedbackListReq = {
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate()
  };
  mobileManagerFeedbackAllS: IFeedbackList[] = [];
  mobileManagerforbiddenTypeReq: IMostReportInput = {
    zoneId: 0,
    fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
    toDate: this.utilsService.dateJalaliService.getCurrentDate(),
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    zoneIds: [0]
  }
  mobileManagerforbiddenType: IForbiddenManager[];

  private val: ISidebarVals[] = [
    { id: 1, value: ENEssentialsToSave.mobileManagerFeedbackTypeIsComplaint, url: EN_Routes.mobileFeedbackComplaint },
    { id: 1, value: ENEssentialsToSave.mobileManagerFeedbackTypeIsNotComplaint, url: EN_Routes.mobileFeedbackSuggest },
    {
      id: 1, req: ENEssentialsToSave.mobileManagerFeedbackAllCReq, value: ENEssentialsToSave.mobileManagerFeedbackAllC, url: EN_Routes.mobileFeedbackAllC, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    {
      id: 1, req: ENEssentialsToSave.mobileManagerFeedbackAllSReq, value: ENEssentialsToSave.mobileManagerFeedbackAllS, url: EN_Routes.mobileFeedbackAllS, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    { id: 1, req: ENEssentialsToSave.mobileManagerforbiddenTypeReq, value: ENEssentialsToSave.mobileManagerforbiddenType, url: EN_Routes.mobileForbiddenType },
    { id: 1, value: ENEssentialsToSave.logMemoryStatus, url: EN_Routes.reqLogMemoryStatus },
    {
      id: 1, req: ENEssentialsToSave.downloadAttemptsReq, value: ENEssentialsToSave.downloadAttempts, url: EN_Routes.reqLogDownloadAttempts, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    {
      id: 1, req: ENEssentialsToSave.uploadAttemptsReq, value: ENEssentialsToSave.uploadAttempts, url: EN_Routes.reqLogUploadAttempts, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate()
      },
      defaultValue: []
    },
    {
      id: 1, req: ENEssentialsToSave.getUploadedReq, value: ENEssentialsToSave.getUploaded, url: EN_Routes.reqLogGetUploaded, defaultReq:
      {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    { id: 1, value: ENEssentialsToSave.saveDataForRandomImgs, value_2: ENEssentialsToSave.saveDataForRandomImgsRSFirst, defaultValue_2: '', url: EN_Routes.wrtoolsrandomImg },
    { id: 1, value: ENEssentialsToSave.saveDataForImgResultDetailsRes, value_2: ENEssentialsToSave.saveDataForImgResultDetailsResFirst, defaultValue_2: '', url: EN_Routes.wrToolsResultDetails },
    { id: 1, value: ENEssentialsToSave.saveDataForImgResultDetailsGridBased, url: EN_Routes.toolsResultDetailsGridBased },
    { id: 1, value: ENEssentialsToSave.saveDataForToolsExcelViewer, url: EN_Routes.wrExcelviewer },
    { id: 1, value: ENEssentialsToSave.saveDataForWaterMark, url: EN_Routes.wrSettingsWaterMark },
    { id: 1, value: ENEssentialsToSave.saveDataForMomentLastRead, url: EN_Routes.wrflashlr, defaultValue: [] },
    { id: 1, req: ENEssentialsToSave.saveDataForLMGeneralGroupModifyReq, value: ENEssentialsToSave.saveDataForLMGeneralGroupModify, value_2: ENEssentialsToSave.AUXSaveDataForLMGeneralGroupModify, defaultValue_2: [], url: EN_Routes.wrmlGeneralGModify },
    { id: 1, req: ENEssentialsToSave.saveDataForLMGeneralModifyReq, value: ENEssentialsToSave.saveDataForLMGeneralModify, url: EN_Routes.wrmlGeneralModify },
    { id: 1, value: ENEssentialsToSave.saveDataForDynamicReports, url: EN_Routes.wrRptsDynamic },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttribution, url: EN_Routes.wrmrimgattr },
    { id: 1, value: ENEssentialsToSave.saveDataForGuild, url: EN_Routes.guild },
    { id: 1, value: ENEssentialsToSave.ipFilterRes, url: EN_Routes.ipFilter },
    { id: 1, value: ENEssentialsToSave.saveDataForDynamicTraverse, url: EN_Routes.dynamicTraverse },
    { id: 1, value: ENEssentialsToSave.saveDataForUserSearch, value_2: ENEssentialsToSave.saveDataForUserSearchRes, defaultValue_2: '', url: EN_Routes.wrmusearch },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttrResult, url: EN_Routes.wrrptsanlzfileresult },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttrAnalyze, url: EN_Routes.wrrptsanlzfileanalyze },
    { id: 1, value: ENEssentialsToSave.saveDataForKarbari, url: EN_Routes.wrmrkar },
    { id: 1, value: ENEssentialsToSave.saveDataForCounterState, url: EN_Routes.wrmrcs },
    { id: 1, value: ENEssentialsToSave.saveDataForQotrManager, url: EN_Routes.wrmrqtr },
    { id: 1, value: ENEssentialsToSave.saveDataForCounterReport, url: EN_Routes.wrmrrpt },
    { id: 1, value: ENEssentialsToSave.saveDataForFragmentNOB, url: EN_Routes.wrmrnob },
    { id: 1, value: ENEssentialsToSave.saveDataForAutomaticImport, url: EN_Routes.wrmrnobautoImport },
    { id: 1, value: ENEssentialsToSave.saveDataForTextOutput, url: EN_Routes.wrmrtxtout },
    { id: 1, value: ENEssentialsToSave.saveDataForAPKManager, url: EN_Routes.wrmrapk },
    { id: 1, value: ENEssentialsToSave.saveDataForReadingConfig, url: EN_Routes.wrmrrcd },
    { id: 1, value: ENEssentialsToSave.saveDataForReadingPeriodKindManager, url: EN_Routes.wrmrrpkm },
    { id: 1, value: ENEssentialsToSave.saveDataForWaterFormula, url: EN_Routes.wrmrformulaab },
    { id: 1, value: ENEssentialsToSave.saveDataForBadgetFormula, url: EN_Routes.wrmrformulabudget },
    { id: 1, value: ENEssentialsToSave.saveDataForTabsare2Formula, url: EN_Routes.wrmrformulatabsare2 },
    { id: 1, value: ENEssentialsToSave.saveDataForTabsare3Formula, url: EN_Routes.wrmrformulatabsare3 },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel1, url: EN_Routes.wrmalap },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel2, url: EN_Routes.wrmalme },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel3, url: EN_Routes.wrmalcr },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel4, url: EN_Routes.wrmalac },
    { id: 1, value: ENEssentialsToSave.saveDataForAllUsers, url: EN_Routes.wrmuall, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForAllUsers, url: EN_Routes.userRoleHistory, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForUserRoleHistory, url: EN_Routes.userRoleHistoryDetails },
    { id: 1, value: ENEssentialsToSave.saveDataForUserMasterHistory, url: EN_Routes.userMasterHistory },
    { id: 1, value: ENEssentialsToSave.saveDataForUserDetailsHistory, url: EN_Routes.userDetailsHistory },
    { id: 1, value: ENEssentialsToSave.userCompare, url: EN_Routes.userCompare },
    { id: 1, value: ENEssentialsToSave.saveDataForUserOnlines, url: EN_Routes.userOnlines },
    {
      id: 1, req: ENEssentialsToSave._userAddUserInfos, value: ENEssentialsToSave.saveDataForAddUsers, url: EN_Routes.wrmuadd, defaultReq: {
        userCode: null,
        username: null,
        password: null,
        confirmPassword: null,
        firstName: '',
        sureName: '',
        email: '',
        mobile: '',
        displayMobile: false,
        displayName: '',
        isActive: true,
        deviceId: ''
      }
    },
    { id: 1, value: ENEssentialsToSave.saveDataForRoleManager, url: EN_Routes.wrmurole },
    { id: 1, value: ENEssentialsToSave.saveDataForEditOnRole, url: EN_Routes.wrmueor },
    { id: 1, value: ENEssentialsToSave.saveDataForRoleHistory, url: EN_Routes.roleHistory },
    { id: 1, value: ENEssentialsToSave.saveDataForCountry, url: EN_Routes.wrmzsc },
    { id: 1, value: ENEssentialsToSave.saveDataForProvince, url: EN_Routes.wrmzsp },
    { id: 1, value: ENEssentialsToSave.saveDataForRegion, url: EN_Routes.wrmzsr },
    { id: 1, value: ENEssentialsToSave.saveDataForZone, url: EN_Routes.wrmzsz },
    { id: 1, value: ENEssentialsToSave.saveDataForZoneBound, url: EN_Routes.wrmzszb },
    {
      id: 1, req: ENEssentialsToSave.importDynamicReq, value: ENEssentialsToSave.saveDataForImportDynamic, url: EN_Routes.wrimpimd, defaultReq: {
        fromEshterak: '',
        toEshterak: '',
        zoneId: null,
        alalHesabPercent: 0,
        imagePercent: 0,
        hasPreNumber: false,
        displayBillId: false,
        displayRadif: false,
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        counterReaderId: '',
        readingPeriodId: null,
        displayPreDate: false,
        displayMobile: false,
        hasImage: false,
        displayDebt: false,
        displayIcons: false,
      }
    },
    {
      id: 1, req: ENEssentialsToSave.saveDataForImportDataFileExcelReq, value: ENEssentialsToSave.saveDataForImportDataFileExcel, url: EN_Routes.wrimpFileExcel,
      defaultReq: {
        zoneId: 0,
        alalHesabPercent: 0,
        imagePercent: 0,
        hasPreNumber: false,
        displayBillId: false,
        displayRadif: false,
        displayPreDate: false,
        displayMobile: false,
        hasImage: false,
        displayDebt: false,
        displayIcons: false,
        skipErrors: false,
        counterReaderId: '',
        readingPeriodId: '',
        listNumber: '',
        description: '',
        year: this.utilsService.getFirstYear(),
        file: File
      }
    },
    { id: 1, value: ENEssentialsToSave.saveDataForImportErrors, url: EN_Routes.wrimperr, defaultValue: [] },
    {
      id: 1, req: ENEssentialsToSave.saveDataForImportErrorsByTrackNumberReq, value: ENEssentialsToSave.saveDataForImportErrorsByTrackNumber, url: EN_Routes.wrImportErrByTrackNumber, defaultReq: {
        trackNumber: null,
        _isCollapsed: false
      },
      defaultValue: []
    },
    { id: 1, req: ENEssentialsToSave.saveDataForAssessPreReq, value: ENEssentialsToSave.saveDataForAssessPre, url: EN_Routes.wrimpassesspre },
    { id: 1, value: ENEssentialsToSave.saveDataForAssessAdd, url: EN_Routes.wrimpassessadd },
    {
      id: 1, req: ENEssentialsToSave.simafaSingleReq, value: null, url: EN_Routes.wrimpsimafardpgsingle, defaultReq: {
        zoneId: 0,
        alalHesabPercent: null,
        imagePercent: null,
        hasPreNumber: false,
        displayBillId: false,
        displayRadif: false,
        displayPreDate: false,
        displayMobile: false,
        hasImage: false,
        displayDebt: false,
        displayIcons: false,
        counterReaderId: '',
        readingPeriodId: null,
        year: this.utilsService.getFirstYear(),
        readingProgramId: ''
      }
    },
    { id: 1, value: ENEssentialsToSave.saveDataForSimafaBatch, url: EN_Routes.wrimpsimafardpgbatch, defaultValue: [] },
    {
      id: 1, req: ENEssentialsToSave.importSimafaReadingProgramReq, value: ENEssentialsToSave.saveDataForSimafaReadingPrograms, url: EN_Routes.wrimpsimafardpg, defaultValue: [], defaultReq: {
        zoneId: null,
        readingPeriodId: null,
        year: this.utilsService.getFirstYear(),
        kindId: null,
        _isCollapsed: false
      }
    },
    { id: 1, value: ENEssentialsToSave.saveDataForPolicies, url: EN_Routes.wrpolicies },
    { id: 1, value: ENEssentialsToSave.listLatestInfo, url: EN_Routes.listLatestInfo },
    { id: 1, value: ENEssentialsToSave.saveDataForPoliciesHistory, url: EN_Routes.policyHistory },
    { id: 1, value: ENEssentialsToSave.saveDataForProfile, url: EN_Routes.wrprofile },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackImported, url: EN_Routes.wrmtrackimported, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackLoaded, url: EN_Routes.wrmtrackloaded, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackReading, url: EN_Routes.wrmtrackreading, defaultValue: [] },
    {
      id: 1, req: ENEssentialsToSave.importedEditedReq, value: ENEssentialsToSave.importedEditedRes, url: EN_Routes.importedEdited, defaultValue: [], defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        zoneId: null,
        imagePercent: null,
        alalHesabPercent: null,
        isRoosta: false,
        hasPreNumber: false,
        displayBillId: false,
        displayRadif: false,
        displayPreDate: false,
        displayMobile: false,
        hasImage: false,
        displayDebt: false,
        displayIcons: false,
      }
    },
    { id: 1, value: ENEssentialsToSave.saveDataForLastStates, url: EN_Routes.wrmtracklatest, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackOffloaded, url: EN_Routes.wrmtrackoffloaded, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackOffloadedGroup, url: EN_Routes.wrmtrackoffloadedGroup, defaultValue: [] },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackFinished, url: EN_Routes.wrmtrackfinished, defaultValue: [] },
    {
      id: 1, req: ENEssentialsToSave.saveDataForFollowUpReq, value: ENEssentialsToSave.saveDataForFollowUp, value_2: ENEssentialsToSave.saveDataForFollowUpAUX, defaultValue_2: '', url: EN_Routes.followUp, defaultReq: {
        trackNumber: null,
        canShowGraph: false,
        _isCollapsed: false
      }
    },
    {
      id: 1, req: ENEssentialsToSave.saveDataForSearchProReq, value: ENEssentialsToSave.saveDataForSearchPro, url: EN_Routes.wrmsacme, defaultReq: {
        zoneId: null,
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        readingPeriodId: null,
        zoneIds: [],
        year: this.utilsService.getFirstYear(),
        reportIds: [],
        counterStateIds: [],
        masrafStates: [],
        karbariCodes: [],
        fragmentMasterIds: [],
        _selectedKindId: '',
        searchByText: '',
        showAll: false
      },
      defaultValue: []
    },
    {
      id: 1, req: ENEssentialsToSave._searchSimpleReq, value: ENEssentialsToSave.saveDataForSearchSimple, url: EN_Routes.wrmssimple, defaultValue: [], defaultReq: {
        zoneId: null,
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        readingPeriodId: null,
        _selectedKindId: '',
        year: this.utilsService.getFirstYear(),
        isCollapsed: false
      }
    },
    {
      id: 1, value: ENEssentialsToSave.saveDataForFNB, url: EN_Routes.wrmfbn, defaultReq: {
        zoneId: 0,
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        counterReaderId: '',
        readingPeriodId: null,
        reportCode: 0,
        year: this.utilsService.getFirstYear(),
        zoneIds: [0]
      },
      defaultValue: []
    },
    { id: 1, req: ENEssentialsToSave.saveDataForLMPDTrackNumber, value: ENEssentialsToSave.saveDataForLMPD, url: EN_Routes.wrmlpd },
    { id: 1, value: ENEssentialsToSave.saveDataForOutputDBF, url: EN_Routes.wrmdbf },
    { id: 1, value: ENEssentialsToSave.saveDataForOutputDBFEqamatBagh, url: EN_Routes.wrDbfEqamatBagh },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverse, url: EN_Routes.wrrptsmamtrv },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverseDifferential, url: EN_Routes.wrrptsmamtrvch },
    { id: 1, value: ENEssentialsToSave.saveDataForRRDisposalHours, url: EN_Routes.wrrptsmamdh },
    { id: 1, value: ENEssentialsToSave.saveDataForKarkardAllStates, value_2: ENEssentialsToSave.saveDataForKarkardAllStatesTWO, defaultValue_2: '', url: EN_Routes.wrrptsmamKarkardAllStates },
    { id: 1, value: ENEssentialsToSave.saveDataForRRKarkard, url: EN_Routes.wrrptsmamkarkard },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPreNumShown, url: EN_Routes.wrrptsmampns },
    { id: 1, value: ENEssentialsToSave.saveDataForRRLocked, url: EN_Routes.wrrptsmamlocked },
    { id: 1, value: ENEssentialsToSave.saveDataForRROffloadedKarkard, url: EN_Routes.wrrptsmamoffkarkard },
    { id: 1, value: ENEssentialsToSave.saveDataForRRFragment, url: EN_Routes.wrRptsMamFragment },
    { id: 2, value: ENEssentialsToSave.notificationMessages, url: EN_Routes.NotificationMessages },
    { id: 1, value: ENEssentialsToSave.saveDataForRRMaster, url: EN_Routes.wrrptsexmmaster },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPerformance, url: EN_Routes.wrrptsanlzprfm },
    { id: 2, req: ENEssentialsToSave.saveDataForRRGalleryReq, value: ENEssentialsToSave.saveDataForRRGallery, value_2: ENEssentialsToSave.saveDataForRRGalleryRSFirst, defaultValue_2: null, url: EN_Routes.wrrptsgalleryai },
    {
      id: 2, req: ENEssentialsToSave.notificationListByDateReq, value: ENEssentialsToSave.notificationListByDate, url: EN_Routes.NotificationListByUrl, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate()
      },
      defaultValue: []
    },
    { id: 1, value: ENEssentialsToSave.saveDataForDMAAnalyze, url: EN_Routes.wrmdmacranlz },
    { id: 2, value: ENEssentialsToSave.saveDataForRRDetails, url: EN_Routes.wrrptsexmdetails },
    { id: 2, value: ENEssentialsToSave.RRGuildsWithParam, url: EN_Routes.guildsWithParam },
    { id: 2, value: ENEssentialsToSave.ipfilterHistory, url: EN_Routes.ipFilterHistory, defaultValue: [] },
    {
      id: 2, req: ENEssentialsToSave.saveDataForOffloadedAllLazyReq, value: ENEssentialsToSave.offloadedAllLazy, url: EN_Routes.listAllLazy, defaultValue: { data: [], totalRecords: 0 }, defaultReq: {
        counterStateValue: null,
        multiSelectCounterStateId: [],
        multiSelectPreCounterStateCode: [],
        multiSelectkarbariCode: [],
        multiSelectMasrafStateId: [],//وضعیت مصرف
        multiSelectHazf: []// 
      }
    },
    { id: 2, value: ENEssentialsToSave.simpleMasterByFragmentAllLazy, url: EN_Routes.simpleMasterByFragmentAllLazy, defaultValue: { data: [], totalRecords: 0 } },
    {
      id: 2, req: ENEssentialsToSave.masterByFragmentallInGroupLazyReq, value: ENEssentialsToSave.masterByFragmentAllInGroupLazy, url: EN_Routes.masterByFragmentAllInGroupLazy, defaultValue: { data: [], totalRecords: 0 }, defaultReq: {
        counterStateValue: null,
        multiSelectCounterStateId: [],
        multiSelectPreCounterStateCode: [],
        multiSelectkarbariCode: [],
        multiSelectMasrafStateId: [],//وضعیت مصرف
        multiSelectHazf: []// 
      }
    },
    {
      id: 2, req: ENEssentialsToSave.allInGroupLazyReq, value: ENEssentialsToSave.offloadedAllInGroupLazy, url: EN_Routes.listAllInGroupLazy, defaultValue: { data: [], totalRecords: 0 }, defaultReq: {
        counterStateValue: null,
        multiSelectCounterStateId: [],
        multiSelectPreCounterStateCode: [],
        multiSelectkarbariCode: [],
        multiSelectMasrafStateId: [],//وضعیت مصرف
        multiSelectHazf: []// 
      }
    },
    { id: 2, value: ENEssentialsToSave.trackingOffloadedMaster, value_2: ENEssentialsToSave.trackingOffloadedDetails, url: EN_Routes.trackOffloadedMaster, defaultValue: [], defaultValue_2: [] },
    {
      id: 2, req: ENEssentialsToSave.simpleMasterByFragmentReq, value: ENEssentialsToSave.simpleMasterByFragment, value_2: ENEssentialsToSave.simpleMasterByFragmentDetails, url: EN_Routes.simpleMasterByFragment, defaultValue: [], defaultValue_2: [], defaultReq: {
        zoneId: null,
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        readingPeriodId: null,
        _selectedKindId: '',
        year: this.utilsService.getFirstYear(),
        isCollapsed: false
      }
    },
    { id: 2, value: ENEssentialsToSave.IOPolicyHistory, url: EN_Routes.IOPolicyHistory, defaultValue: [] },
    { id: 2, value: ENEssentialsToSave.iOPolicy, url: EN_Routes.IOPolicy },
    {
      id: 2, req: ENEssentialsToSave.authenticityAttemptsReq, value: ENEssentialsToSave.authenticityAttempts, url: EN_Routes.requestLogsAuthenticityAttempts, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    {
      id: 2, req: ENEssentialsToSave.ipFilterGetBlockedReq, value: ENEssentialsToSave.ipFilterGetBlocked, url: EN_Routes.requestLogsGetBlocked, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    {
      id: 2, req: ENEssentialsToSave.ipFilterGetInvalidTimeReq, value: ENEssentialsToSave.ipFilterGetInvalidTime, url: EN_Routes.requestLogsGetInvalidTime, defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    { id: 2, value: ENEssentialsToSave.ipFilterBlockedUsers, url: EN_Routes.reqLogBlockedUsers },
    { id: 2, value: ENEssentialsToSave.reqLogUserActivationByUserId, url: EN_Routes.userActivationByuserId },
    {
      id: 2, req: ENEssentialsToSave.usersLoginsReq, value: ENEssentialsToSave.usersLogins, url: EN_Routes.reqLogUsersLogins, defaultReq:
      {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
      },
      defaultValue: []
    },
    {
      id: 2, req: ENEssentialsToSave.saveDataForRequestLogListUserReq, value: ENEssentialsToSave.saveDataForRequestLogListUser, defaultValue: [], url: EN_Routes.wrmRequestLogsUser, defaultReq: {
        jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
        fromTimeH: this.insertToTimes().fromTimeH,
        fromTimeM: this.insertToTimes().fromTimeM,
        toTimeH: this.insertToTimes().toTimeH,
        toTimeM: this.insertToTimes().toTimeM,
        fromTime: this.insertToTimes().fromTime,
        toTime: this.insertToTimes().toTime
      }
    },
    {
      id: 2, req: ENEssentialsToSave.saveDataForRequestLogAnonymousReq, value: ENEssentialsToSave.saveDataForRequestLogAnonymous, url: EN_Routes.wrmRequestLogsAnonymous, defaultReq:
      {
        jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
        fromTimeH: this.insertToTimes().fromTimeH,
        fromTimeM: this.insertToTimes().fromTimeM,
        toTimeH: this.insertToTimes().toTimeH,
        toTimeM: this.insertToTimes().toTimeM,
        fromTime: this.insertToTimes().fromTime,
        toTime: this.insertToTimes().toTime
      },
      defaultValue: []
    },
    {
      id: 2, req: ENEssentialsToSave.requestLogUnAuthorizedReq, value: ENEssentialsToSave.requestLogUnAuthorized, url: EN_Routes.requestLogsUnAuthorized, defaultReq: {
        jalaliDay: this.utilsService.dateJalaliService.getCurrentDate(),
        fromTimeH: this.insertToTimes().fromTimeH,
        fromTimeM: this.insertToTimes().fromTimeM,
        toTimeH: this.insertToTimes().toTimeH,
        toTimeM: this.insertToTimes().toTimeM,
        fromTime: this.insertToTimes().fromTime,
        toTime: this.insertToTimes().toTime
      },
      defaultValue: []
    },
    { id: 2, req: ENEssentialsToSave.serverErrorsSelectedErrors, value: ENEssentialsToSave.saveDataForServerErrors, url: EN_Routes.wrmmserr, defaultValue: [], defaultReq: [] },
    {
      id: 2, req: ENEssentialsToSave.saveDataForServerUserActivationReq, value: ENEssentialsToSave.saveDataForServerUserActivation, url: EN_Routes.userActivation, defaultValue: [], defaultReq: {
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        userActivationLogTypes: []
      }
    },
    { id: 2, value: ENEssentialsToSave.saveDataForIpSpecialRules, url: EN_Routes.wr },
    { id: 2, value: ENEssentialsToSave.saveDataForOSInfo, url: EN_Routes.serverOSInfo },
    { id: 13, req: ENEssentialsToSave.offlineSingleReadingCounterReq, value: ENEssentialsToSave.offlineSingleReadingCounter, url: EN_Routes.offlineSingleReading },
    { id: 2, value: ENEssentialsToSave.license, url: EN_Routes.wrLicense },
    { id: 2, value: ENEssentialsToSave.saveDataForMsDriveInfo, url: EN_Routes.driveInfo },
    { id: 2, value: ENEssentialsToSave.serverGetAuthenticity, url: EN_Routes.serverGetAuthenticity },
    { id: 2, value: ENEssentialsToSave.serverAuthenticityBrief, url: EN_Routes.serverAuthenticityBrief },
    { id: 2, value: ENEssentialsToSave.saveDataForUserKarkard, url: EN_Routes.wrrptsexmuserKarkard },
    {
      id: 2, req: ENEssentialsToSave.saveDataForUserKarkardSummaryReq, value: ENEssentialsToSave.saveDataForUserKarkardSummary, defaultValue: null, value_2: ENEssentialsToSave.saveDataForUserKarkardSummaryTwo, defaultValue_2: null, url: EN_Routes.userKarkardSummary, defaultReq: {
        zoneId: null,
        fromDate: this.utilsService.dateJalaliService.getCurrentDate(),
        toDate: this.utilsService.dateJalaliService.getCurrentDate(),
        _isCollapsed: false
      }
    },
    { id: 2, value: ENEssentialsToSave.saveDataForRRkarkardDaily, url: EN_Routes.rptskarkardDaily },
    { id: 2, value: ENEssentialsToSave.saveDataForRRGIS, url: EN_Routes.wrrptsmamgis },
    {
      id: 2, req: ENEssentialsToSave.saveDataForLMAllReq, value: ENEssentialsToSave.saveDataForLMAll, url: EN_Routes.wrmlallfalse, defaultValue: [], defaultReq: {
        GUID: ''
      }
    },
    { id: 2, req: ENEssentialsToSave.saveDataForLMModifyReq, value: ENEssentialsToSave.saveDataForLMModify, url: EN_Routes.wrmlalltrue },
    { id: 2, req: ENEssentialsToSave.saveDataForEditUsersGUID, value: ENEssentialsToSave.saveDataForEditUsers, url: EN_Routes.wrmuedit },
    { id: 2, value: ENEssentialsToSave.saveDataForUserLoggins, url: EN_Routes.userLoggins },
    { id: 2, req: ENEssentialsToSave.fragmentNOBDetailsGUID, value: ENEssentialsToSave.saveDataForFragmentNOBDetails, url: EN_Routes.wrmrnob },
    {
      id: 13, req: ENEssentialsToSave.searchReqMosh, value: ENEssentialsToSave.saveDataForSearchMoshtarakin, url: EN_Routes.wrmssearchMosh, defaultValue: [], defaultReq: {
        zoneId: null,
        searchBy: 1,
        item: null,
        similar: false,
        showAll: false
      }
    },
  ]

  cleanArrays = () => {
    this.tabs = [];
    this.ipFilterHistory = [];
  }
  cleanAllData = () => {
    for (let index = 0; index < this.val.length; index++) {
      this[this.val[index].req] = this.val[index]?.defaultReq ? this.val[index].defaultReq : null;
      this[this.val[index].value] = this.val[index]?.defaultValue ? this.val[index].defaultValue : null;
      this[this.val[index].value_2] = this.val[index]?.defaultValue_2 ? this.val[index].defaultValue_2 : null;
      /* commented due to unValid values after refresh page
      /////// for assign default value to values, every value should have default value at the object 
      TODO body request vals have to back to defualt values after refresh page happended
       */
    }
    this.cleanArrays();
  }
  cleanData = (url: string) => {
    this.val.find(item => {
      if (item.url === url) {
        this[item.req] = item?.defaultReq ? item.defaultReq : null;
        this[item.value] = item?.defaultValue ? item.defaultValue : '';
        this[item.value_2] = item?.defaultValue_2 ? item.defaultValue_2 : '';
      }
    })
  }
  receiveDateJalali = (variable: ENReadingReports, $event: string) => {//just JalaliDay
    this[variable].jalaliDay = $event;
  }
  receiveFromDateJalali = (variable: ENReadingReports, $event: string) => {//just from date
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENReadingReports, $event: string) => {//just to date
    this[variable].toDate = $event;
  }
  getSearchInOrderTo = (): ISearchInOrderTo[] => {
    if (this.profileService.getLocalValue()) {
      this._isOrderByDate = false;
      return this.utilsService.getSearchInOrderToReverse;
    }
    else {
      this._isOrderByDate = true;
      return this.utilsService.getSearchInOrderTo;
    }
  }

}
