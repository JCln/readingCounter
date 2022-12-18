import { Injectable } from '@angular/core';
import { IAssessPreDisplayDtoSimafa } from 'interfaces/iimports';
import { IImportSimafaReadingProgramsReq } from 'interfaces/import-data';
import { ENEssentialsToSave, ISidebarVals, ITabs } from 'interfaces/ioverall-config';
import { ISearchProReportInput } from 'interfaces/search';
import { UtilsService } from 'services/utils.service';

import { EN_Routes } from '../interfaces/routes.enum';
import { IFileExcelReq } from './../interfaces/import-data';

@Injectable({
  providedIn: 'root'
})
export class CloseTabService {
  constructor(private utilsService: UtilsService) { }
  /* TAB WRAPPER */
  tabs: ITabs[] = [];

  // Formular s 
  saveDataForWaterFormula: any;
  saveDataForBadgetFormula: any;
  saveDataForTabsare2Formula: any;
  saveDataForTabsare3Formula: any;
  // 
  // save data when route change 
  saveDataForAppLevel1: any;
  saveDataForAppLevel2: any;
  saveDataForAppLevel3: any;
  saveDataForAppLevel4: any;

  saveDataForCounterState: any;
  saveDataForImageAttribution: any;
  saveDataForKarbari: any;
  saveDataForReadingConfig: any;
  saveDataForReadingPeriodManager: any;
  saveDataForReadingPeriodKindManager: any;
  saveDataForAPKManager: any;
  saveDataForCounterReport: any;
  saveDataForQotrManager: any;

  // zones
  saveDataForCountry: any;
  saveDataForProvince: any;
  saveDataForRegion: any;
  saveDataForZone: any;
  saveDataForZoneBound: any;

  saveDataForAllUsers: any;
  saveDataForEditUsers: any;
  saveDataForEditUsersGUID: string;
  saveDataForRoleManager: any;
  saveDataForUserLoggins: any;
  saveDataForEditOnRole: any;
  saveDataForAddUsers: any;
  saveDataForUserSearch: any;
  saveDataForUserSearchRes: any;

  // track manager
  saveDataForTrackImported: any;
  saveDataForTrackLoaded: any;
  saveDataForTrackReading: any;
  saveDataForUserKarkard: any;
  saveDataForTrackOffloaded: any;
  saveDataForTrackOffloadedGroup: any;
  saveDataForKarkardAllStates: any;
  offloadedGroupReq = {
    _selectedAggregate: 'listNumber'// Default group by
  }
  saveDataForTrackFinished: any;
  saveDataForLastStates: any;
  saveDataForOffloadModify: any;
  saveDataForFollowUp: any;
  saveDataForFollowUpReq = {
    trackNumber: null,
    canShowGraph: false,
    _isCollapsed: true
  }
  saveDataForFollowUpAUX: any;
  // import dynamic
  saveDataForAutomaticImport: any;
  saveDataForImportDynamic: any;
  saveDataForImportErrors: any;
  saveDataForSimafaBatch: any;
  importSimafaReadingProgramReq: IImportSimafaReadingProgramsReq = {
    zoneId: 0,
    readingPeriodId: 0,
    year: this.utilsService.getFirstYear(),
    kindId: null
  }
  saveDataForImportDataFileExcel: any;
  saveDataForImportDataFileExcelReq: IFileExcelReq = {
    zoneId: 0,
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    skipErrors: false,
    counterReaderId: '',
    readingPeriodId: '',
    listNumber: '',
    description: '',
    year: this.utilsService.getFirstYear(),
    file: File
  }
  saveDataForSimafaReadingPrograms: any;
  saveDataForAssessPreReq: IAssessPreDisplayDtoSimafa = {
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    zoneId: null,
    listNumber: ''
  };
  saveDataForAssessPre: any;
  saveDataForAssessAdd: any;
  // SEARCH
  saveDataForSearchMoshtarakin: any;
  saveDataForSearchMoshtarakinReq: any;
  saveDataForSearchPro: any;
  saveDataForSearchProReq: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
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
  }
  saveDataForSearchSimple: any;
  // list manager
  saveDataForLMPD: any;
  saveDataForLMPDTrackNumber: number;
  saveDataForLMAllReq: any;
  saveDataForLMAll: any;
  saveDataForLMModifyReq: any;
  saveDataForLMModify: any;
  saveDataForLMGeneralModifyReq: any;
  saveDataForLMGeneralModify: any;
  saveDataForLMGeneralGroupModifyReq: any = {
    GUid: '',
    counterStateValue: null
  };
  saveDataForLMGeneralGroupModify: any;
  // dbf output manager
  saveDataForOutputDBF: any;
  // reading reports 
  saveDataForRRTraverse: any;
  saveDataForRRTraverseDifferential: any;
  saveDataForRRKarkard: any;
  saveDataForRROffloadedKarkard: any;
  saveDataForRRFragment: any;
  saveDataForRRkarkardDaily: any;
  saveDataForRRPreNumShown: any;
  saveDataForRRLocked: any;
  saveDataForRRMaster: any;
  saveDataForImageAttrResult: any;
  saveDataForImageAttrAnalyze: any;
  saveDataForRRPerformance: any;
  saveDataForDMAAnalyze: any;
  saveDataForRRDetails: any;
  saveDataForRequestLog: any;
  saveDataForRequestLogReq: any = {
    jalaliDay: '',
    fromTimeH: '',
    fromTimeM: '',
    fromTime: '',
    toTimeH: '',
    toTimeM: '',
    toTime: ''
  }
  saveDataForServerErrors: any;
  saveDataForRRDisposalHours: any;
  saveDataForRRGIS: any;
  saveDataForFragmentNOB: any;
  saveDataForFragmentNOBDetails: any;
  fragmentNOBDetailsGUID: any;

  saveDataForTextOutput: any;
  saveDataForToolsExcelViewer: any;
  saveDataForDynamicReports: any;
  saveDataForPolicies: any;
  saveDataForFNB: any;
  saveDataForProfile: any;
  saveDataForMomentLastRead: any[] = [];
  saveDataForRRGallery: any;
  saveDataForRRGalleryRSFirst: any;
  saveDataForRRGalleryReq: any;
  saveDataForRandomImgs: any;
  saveDataForRandomImgsRSFirst: any;
  saveDataForImgResultDetailsRes: any;
  saveDataForImgResultDetailsResFirst: any;

  private val: ISidebarVals[] = [
    { id: 1, value: ENEssentialsToSave.saveDataForRandomImgs, value_2: ENEssentialsToSave.saveDataForRandomImgsRSFirst, url: EN_Routes.wrtoolsrandomImg },
    { id: 1, value: ENEssentialsToSave.saveDataForImgResultDetailsRes, value_2: ENEssentialsToSave.saveDataForImgResultDetailsResFirst, url: EN_Routes.wrToolsResultDetails },
    { id: 1, value: ENEssentialsToSave.saveDataForToolsExcelViewer, url: EN_Routes.wrrptstoolsexcelviewer },
    { id: 1, value: ENEssentialsToSave.saveDataForMomentLastRead, url: EN_Routes.wrflashlr },
    { id: 1, req: ENEssentialsToSave.saveDataForLMGeneralGroupModifyReq, value: ENEssentialsToSave.saveDataForLMGeneralGroupModify, url: EN_Routes.wrmlGeneralGModify },
    { id: 1, req: ENEssentialsToSave.saveDataForLMGeneralModifyReq, value: ENEssentialsToSave.saveDataForLMGeneralModify, url: EN_Routes.wrmlGeneralModify },
    { id: 1, value: ENEssentialsToSave.saveDataForDynamicReports, url: EN_Routes.wrRptsDynamicReportManager },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttribution, url: EN_Routes.wrmrimgattr },
    { id: 1, value: ENEssentialsToSave.saveDataForUserSearch, value_2: ENEssentialsToSave.saveDataForUserSearchRes, url: EN_Routes.wrmusearch },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttrResult, url: EN_Routes.wrrptsanlzfileresult },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttrAnalyze, url: EN_Routes.wrrptsanlzfileanalyze },
    { id: 1, value: ENEssentialsToSave.saveDataForKarbari, url: EN_Routes.wrmrkar },
    { id: 1, value: ENEssentialsToSave.saveDataForCounterState, url: EN_Routes.wrmrcs },
    { id: 1, value: ENEssentialsToSave.saveDataForQotrManager, url: EN_Routes.wrmrqr },
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
    { id: 1, value: ENEssentialsToSave.saveDataForAllUsers, url: EN_Routes.wrmuall },
    { id: 1, value: ENEssentialsToSave.saveDataForAddUsers, url: EN_Routes.wrmuadd },
    { id: 1, value: ENEssentialsToSave.saveDataForRoleManager, url: EN_Routes.wrmurole },
    { id: 1, value: ENEssentialsToSave.saveDataForEditOnRole, url: EN_Routes.wrmueor },
    { id: 1, value: ENEssentialsToSave.saveDataForCountry, url: EN_Routes.wrmzsc },
    { id: 1, value: ENEssentialsToSave.saveDataForProvince, url: EN_Routes.wrmzsp },
    { id: 1, value: ENEssentialsToSave.saveDataForRegion, url: EN_Routes.wrmzsr },
    { id: 1, value: ENEssentialsToSave.saveDataForZone, url: EN_Routes.wrmzsz },
    { id: 1, value: ENEssentialsToSave.saveDataForZoneBound, url: EN_Routes.wrmzszb },
    { id: 1, value: ENEssentialsToSave.saveDataForImportDynamic, url: EN_Routes.wrimpimd },
    { id: 1, req: ENEssentialsToSave.saveDataForImportDataFileExcelReq, value: ENEssentialsToSave.saveDataForImportDataFileExcel, url: EN_Routes.wrimpFileExcel },
    { id: 1, value: ENEssentialsToSave.saveDataForImportErrors, url: EN_Routes.wrimperr },
    { id: 1, req: ENEssentialsToSave.saveDataForAssessPreReq, value: ENEssentialsToSave.saveDataForAssessPre, url: EN_Routes.wrimpassesspre },
    { id: 1, value: ENEssentialsToSave.saveDataForAssessAdd, url: EN_Routes.wrimpassessadd },
    { id: 1, value: ENEssentialsToSave.saveDataForSimafaBatch, url: EN_Routes.wrimpsimafardpgbatch },
    { id: 1, req: ENEssentialsToSave.importSimafaReadingProgramReq, value: ENEssentialsToSave.saveDataForSimafaReadingPrograms, url: EN_Routes.wrimpsimafardpg },
    { id: 1, value: ENEssentialsToSave.saveDataForPolicies, url: EN_Routes.wrpolicies },
    { id: 1, value: ENEssentialsToSave.saveDataForProfile, url: EN_Routes.wrprofile },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackImported, url: EN_Routes.wrmtrackimported },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackLoaded, url: EN_Routes.wrmtrackloaded },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackReading, url: EN_Routes.wrmtrackreading },
    { id: 1, value: ENEssentialsToSave.saveDataForLastStates, url: EN_Routes.wrmtracklatest },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackOffloaded, url: EN_Routes.wrmtrackoffloaded },
    { id: 1, req: ENEssentialsToSave.offloadedGroupReq, value: ENEssentialsToSave.saveDataForTrackOffloadedGroup, url: EN_Routes.wrmtrackoffloadedGroup },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackFinished, url: EN_Routes.wrmtrackfinished },
    { id: 1, req: ENEssentialsToSave.saveDataForFollowUpReq, value: ENEssentialsToSave.saveDataForFollowUp, value_2: ENEssentialsToSave.saveDataForFollowUpAUX, url: EN_Routes.wrmsfwu },
    { id: 1, req: ENEssentialsToSave.saveDataForSearchProReq, value: ENEssentialsToSave.saveDataForSearchPro, url: EN_Routes.wrmsacme },
    { id: 1, value: ENEssentialsToSave.saveDataForSearchSimple, url: EN_Routes.wrmssimple },
    { id: 1, value: ENEssentialsToSave.saveDataForFNB, url: EN_Routes.wrmfbn },
    { id: 1, req: ENEssentialsToSave.saveDataForLMPDTrackNumber, value: ENEssentialsToSave.saveDataForLMPD, url: EN_Routes.wrmlpd },
    { id: 1, value: ENEssentialsToSave.saveDataForOutputDBF, url: EN_Routes.wrmdbf },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverse, url: EN_Routes.wrrptsmamtrv },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverseDifferential, url: EN_Routes.wrrptsmamtrvch },
    { id: 1, value: ENEssentialsToSave.saveDataForRRDisposalHours, url: EN_Routes.wrrptsmamdh },
    { id: 1, value: ENEssentialsToSave.saveDataForKarkardAllStates, url: EN_Routes.wrrptsmamKarkardAllStates },
    { id: 1, value: ENEssentialsToSave.saveDataForRRKarkard, url: EN_Routes.wrrptsmamkarkard },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPreNumShown, url: EN_Routes.wrrptsmampns },
    { id: 1, value: ENEssentialsToSave.saveDataForRRLocked, url: EN_Routes.wrrptsmamlocked },
    { id: 1, value: ENEssentialsToSave.saveDataForRROffloadedKarkard, url: EN_Routes.wrrptsmamoffkarkard },
    { id: 1, value: ENEssentialsToSave.saveDataForRRFragment, url: EN_Routes.wrRptsMamFragment },
    { id: 1, value: ENEssentialsToSave.saveDataForRRMaster, url: EN_Routes.wrrptsexmmaster },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPerformance, url: EN_Routes.wrrptsanlzprfm },
    { id: 2, req: ENEssentialsToSave.saveDataForRRGalleryReq, value: ENEssentialsToSave.saveDataForRRGallery, value_2: ENEssentialsToSave.saveDataForRRGalleryRSFirst, url: EN_Routes.wrrptsgalleryai },
    { id: 1, value: ENEssentialsToSave.saveDataForDMAAnalyze, url: EN_Routes.wrmdmacranlz },
    { id: 2, value: ENEssentialsToSave.saveDataForRRDetails, url: EN_Routes.wrrptsexmdetails },
    { id: 2, req: ENEssentialsToSave.saveDataForRequestLogReq, value: ENEssentialsToSave.saveDataForRequestLog, url: EN_Routes.wrmRequestLogs },
    { id: 2, value: ENEssentialsToSave.saveDataForServerErrors, url: EN_Routes.wrmmserr },
    { id: 2, value: ENEssentialsToSave.saveDataForUserKarkard, url: EN_Routes.wrrptsexmuserKarkard },
    { id: 2, value: ENEssentialsToSave.saveDataForRRkarkardDaily, url: EN_Routes.wrrptsexmkarkardDaily },
    { id: 2, value: ENEssentialsToSave.saveDataForOffloadModify, url: EN_Routes.wrmtrackoffloadedoffloadMfy },
    { id: 2, value: ENEssentialsToSave.saveDataForRRGIS, url: EN_Routes.wrrptsmamgis },
    { id: 2, value: ENEssentialsToSave.saveDataForOffloadModify, url: EN_Routes.wrmtrackoffloadedoffloadMfy },
    { id: 2, req: ENEssentialsToSave.saveDataForLMAllReq, value: ENEssentialsToSave.saveDataForLMAll, url: EN_Routes.wrmlallfalse },
    { id: 2, req: ENEssentialsToSave.saveDataForLMModifyReq, value: ENEssentialsToSave.saveDataForLMModify, url: EN_Routes.wrmlalltrue },
    { id: 2, req: ENEssentialsToSave.saveDataForEditUsersGUID, value: ENEssentialsToSave.saveDataForEditUsers, url: EN_Routes.wrmuedit },
    { id: 2, value: ENEssentialsToSave.saveDataForUserLoggins, url: EN_Routes.wrmuallloggins },
    { id: 2, req: ENEssentialsToSave.fragmentNOBDetailsGUID, value: ENEssentialsToSave.saveDataForFragmentNOBDetails, url: EN_Routes.wrmrnob },
    { id: 13, req: ENEssentialsToSave.rSearchMoshtarakinReq, value: ENEssentialsToSave.saveDataForSearchMoshtarakin, url: EN_Routes.wrmssearchMosh },
  ]

  cleanArrays = () => {
    this.tabs = [];
  }
  setAll(obj, val) {
    if (obj) {
      if (typeof obj === 'string') {
        obj = '';
      }
      if (typeof obj === 'boolean') {
        obj = false;
      }
      else {
        Object.keys(obj).forEach(function (index) {
          obj[index] = val
        });
      }
    }
  }
  cleanAllData = () => {
    for (let index = 0; index < this.val.length; index++) {
      this[this.val[index].value] = null;
      this[this.val[index].value_2] = null;
      this.setAll(this[this.val[index].req], null);
    }
    // TODO: make null all objects
    this.cleanArrays();
  }
  cleanData = (url: string) => {
    this.val.find(item => {
      if (item.url === url) {
        this[item.value] = '';
        this[item.value_2] = '';
        this.setAll(this[item.req], null);
      }
      else {
        if (url.includes(item.url)) {
          this[item.value] = '';
          this[item.value_2] = '';
          this.setAll(this[item.req], null);
        }
      }
    })
  }

}
