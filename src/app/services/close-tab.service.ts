import { Injectable } from '@angular/core';
import { IAssessPreDisplayDtoSimafa } from 'interfaces/iimports';
import { IImportSimafaReadingProgramsReq } from 'interfaces/import-data';
import { ENEssentialsToSave, ISidebarVals, ITabs } from 'interfaces/ioverall-config';
import { ISearchProReportInput } from 'interfaces/search';

import { EN_Routes } from '../Interfaces/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class CloseTabService {
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
  saveDataForTrackOffloaded: any;
  saveDataForTrackOffloadedGroup: any;
  offloadedGroupReq = {
    _selectedAggregate: ''
  }
  saveDataForTrackFinished: any;
  saveDataForLastStates: any;
  saveDataForOffloadModify: any;
  saveDataForFollowUp: any;
  saveDataForFollowUpReq = {
    trackNumber: null,
    canShowGraph: false,
    _isCollapsed: false
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
    year: 1401,
    kindId: null
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
  saveDataForSearchProReq: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    zoneIds: [],
    year: 1401,
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: []
  }
  saveDataForSearchPro: any;
  saveDataForSearchSimple: any;
  // list manager
  saveDataForLMPD: any;
  saveDataForLMAllReq: any;
  saveDataForLMAll: any;
  saveDataForLMModifyReq: any;
  saveDataForLMModify: any;
  saveDataForLMGeneralModifyReq: any;
  saveDataForLMGeneralModify: any;
  saveDataForLMGeneralGroupModifyReq: any;
  saveDataForLMGeneralGroupModify: any;
  // WOUI manager
  saveDataForWOUI: any;
  // dbf output manager
  saveDataForOutputDBF: any;
  // reading reports 
  saveDataForRRTraverse: any;
  saveDataForRRTraverseDifferential: any;
  saveDataForRRKarkard: any;
  saveDataForRROffloadedKarkard: any;
  saveDataForRRkarkardDaily: any;
  saveDataForRRPreNumShown: any;
  saveDataForRRLocked: any;
  saveDataForRRMaster: any;
  saveDataForImageAttrResult: any;
  saveDataForImageAttrAnalyze: any;
  saveDataForRRPerformance: any;
  saveDataForDMAAnalyze: any;
  saveDataForRRDetails: any;
  saveDataForRRDisposalHours: any;
  saveDataForRRGIS: any;
  saveDataForFragmentNOB: any;
  saveDataForFragmentNOBDetails: any;

  saveDataForTextOutput: any;
  saveDataForToolsExcelViewer: any;
  saveDataForDynamicReports: any;
  saveDataForPolicies: any;
  saveDataForFNB: any;
  saveDataForProfile: any;
  saveDataForRRGallery: any;
  saveDataForMomentLastRead: any[] = [];
  saveDataForRRGalleryReq: any;

  private val: ISidebarVals[] = [
    { id: 1, value: ENEssentialsToSave.saveDataForToolsExcelViewer, url: EN_Routes.wrrptstoolsexcelviewer },
    { id: 1, value: ENEssentialsToSave.saveDataForMomentLastRead, url: EN_Routes.wrflashlr },
    { id: 1, req: ENEssentialsToSave.saveDataForLMGeneralModifyReq, value: ENEssentialsToSave.saveDataForLMGeneralModify, url: EN_Routes.wrmlGeneralGModify },
    { id: 1, req: ENEssentialsToSave.saveDataForLMGeneralGroupModifyReq, value: ENEssentialsToSave.saveDataForLMGeneralGroupModify, url: EN_Routes.wrmlGeneralModify },
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
    { id: 1, req: ENEssentialsToSave.offloadedGroupReq, value: ENEssentialsToSave.saveDataForTrackOffloadedGroup, url: EN_Routes.wrmtrackoffloaded },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackFinished, url: EN_Routes.wrmtrackfinished },
    { id: 1, req: ENEssentialsToSave.saveDataForFollowUpReq, value: ENEssentialsToSave.saveDataForFollowUp, value_2: ENEssentialsToSave.saveDataForFollowUpAUX, url: EN_Routes.wrmsfwu },
    { id: 1, req: ENEssentialsToSave.saveDataForSearchProReq, value: ENEssentialsToSave.saveDataForSearchPro, url: EN_Routes.wrmsacme },
    { id: 1, value: ENEssentialsToSave.saveDataForSearchSimple, url: EN_Routes.wrmssimple },
    { id: 1, value: ENEssentialsToSave.saveDataForFNB, url: EN_Routes.wrmfbn },
    { id: 1, value: ENEssentialsToSave.saveDataForLMPD, url: EN_Routes.wrmlpd },
    { id: 1, value: ENEssentialsToSave.saveDataForOutputDBF, url: EN_Routes.wrmdbf },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverse, url: EN_Routes.wrrptsmamtrv },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverseDifferential, url: EN_Routes.wrrptsmamtrvch },
    { id: 1, value: ENEssentialsToSave.saveDataForRRDisposalHours, url: EN_Routes.wrrptsmamdh },
    { id: 1, value: ENEssentialsToSave.saveDataForRRKarkard, url: EN_Routes.wrrptsmamkarkard },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPreNumShown, url: EN_Routes.wrrptsmampns },
    { id: 1, value: ENEssentialsToSave.saveDataForRRLocked, url: EN_Routes.wrrptsmamlocked },
    { id: 1, value: ENEssentialsToSave.saveDataForRROffloadedKarkard, url: EN_Routes.wrrptsmamoffkarkard },
    { id: 1, value: ENEssentialsToSave.saveDataForRRMaster, url: EN_Routes.wrrptsexmmaster },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPerformance, url: EN_Routes.wrrptsanlzprfm },
    { id: 2, req: ENEssentialsToSave.saveDataForRRGalleryReq, value: ENEssentialsToSave.saveDataForRRGallery, url: EN_Routes.wrrptsgalleryai },
    { id: 1, value: ENEssentialsToSave.saveDataForDMAAnalyze, url: EN_Routes.wrmdmacranlz },
    { id: 2, value: ENEssentialsToSave.saveDataForRRDetails, url: EN_Routes.wrrptsexmdetails },
    { id: 2, value: ENEssentialsToSave.saveDataForRRkarkardDaily, url: EN_Routes.wrrptsexmkarkardDaily },
    { id: 2, value: ENEssentialsToSave.saveDataForOffloadModify, url: EN_Routes.wrmtrackoffloadedoffloadMfy },
    { id: 2, value: ENEssentialsToSave.saveDataForRRGIS, url: EN_Routes.wrrptsmamgis },
    { id: 2, value: ENEssentialsToSave.saveDataForOffloadModify, url: EN_Routes.wrmtrackoffloadedoffloadMfy },
    { id: 2, value: ENEssentialsToSave.saveDataForLMPD, url: EN_Routes['wrmlpd/'] },
    { id: 2, req: ENEssentialsToSave.saveDataForLMAllReq, value: ENEssentialsToSave.saveDataForLMAll, url: EN_Routes['wrmlall/'] },
    { id: 2, req: ENEssentialsToSave.saveDataForLMModifyReq, value: ENEssentialsToSave.saveDataForLMModify, url: EN_Routes.wrmlalltrue },
    { id: 2, value: ENEssentialsToSave.saveDataForEditUsers, url: EN_Routes.wrmuedit },
    { id: 2, value: ENEssentialsToSave.saveDataForWOUI, url: EN_Routes.wrmtrackwoui },
    { id: 2, value: ENEssentialsToSave.saveDataForUserLoggins, url: EN_Routes.wrmuallloggins },
    { id: 2, value: ENEssentialsToSave.saveDataForFragmentNOBDetails, url: EN_Routes.wrmrnob },
    { id: 13, req: ENEssentialsToSave.rSearchMoshtarakinReq, value: ENEssentialsToSave.saveDataForSearchMoshtarakin, url: EN_Routes.wrmssearchMosh },
  ]

  cleanArrays = () => {
    this.tabs = [];
  }
  cleanAllData = () => {
    for (let index = 0; index < this.val.length; index++) {
      this[this.val[index].value] = '';
      this[this.val[index].value_2] = '';
      this[this.val[index].req] = '';
    }
    this.cleanArrays();
  }
  cleanData = (url: string) => {
    this.val.find(item => {
      if (item.url === url) {
        this[item.value] = '';
        this[item.req] = '';
        this[item.value_2] = '';
      }
      else {
        if (url.includes(item.url)) {
          this[item.value] = '';
          this[item.req] = '';
          this[item.value_2] = '';
        }
      }
    })
  }
  cleanById = (id: number) => {
    this.val.find(item => {
      if (item.id == id) {
        item.req = null;
        item.value = null;
        item.value_2 = null
      }
    })
  }
}
