import { Injectable } from '@angular/core';
import { ENEssentialsToSave, ISidebarVals, ITabs } from 'interfaces/ioverall-config';

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

  // track manager
  saveDataForTrackImported: any;
  saveDataForTrackLoaded: any;
  saveDataForTrackReading: any;
  saveDataForTrackOffloaded: any;
  saveDataForTrackFinished: any;
  saveDataForLastStates: any;
  saveDataForOffloadModify: any;
  saveDataForFollowUp: any;
  saveDataForFollowUpAUX: any;
  // import dynamic
  saveDataForAutomaticImport: any;
  saveDataForImportDynamic: any;
  saveDataForImportErrors: any;
  saveDataForSimafaBatch: any;
  saveDataForSimafaReadingPrograms: any;
  saveDataForAssessPre: any;
  saveDataForAssessAdd: any;
  // SEARCH
  saveDataForSearchMoshtarakin: any;
  saveDataForSearchMoshtarakinReq: any;
  saveDataForSearchPro: any;
  saveDataForSearchSimple: any;
  // list manager
  saveDataForLMPD: any;
  saveDataForLMAll: any;
  saveDataForLMAll_extra: any;
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
  saveDataForPolicies: any;
  saveDataForFNB: any;
  saveDataForProfile: any;
  saveDataForRRGallery: any;
  saveDataForRRGalleryReq: any;

  private val: ISidebarVals[] = [
    { id: 1, value: ENEssentialsToSave.saveDataForToolsExcelViewer, url: '/wr/rpts/tools/excelviewer' },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttribution, url: '/wr/m/r/imgattr' },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttrResult, url: '/wr/rpts/anlzfile/result' },
    { id: 1, value: ENEssentialsToSave.saveDataForImageAttrAnalyze, url: '/wr/rpts/anlzfile/analyze' },
    { id: 1, value: ENEssentialsToSave.saveDataForKarbari, url: '/wr/m/r/kar' },
    { id: 1, value: ENEssentialsToSave.saveDataForCounterState, url: '/wr/m/r/cs' },
    { id: 1, value: ENEssentialsToSave.saveDataForQotrManager, url: '/wr/m/r/qr' },
    { id: 1, value: ENEssentialsToSave.saveDataForCounterReport, url: '/wr/m/r/rpt' },
    { id: 1, value: ENEssentialsToSave.saveDataForFragmentNOB, url: '/wr/m/r/nob' },
    { id: 1, value: ENEssentialsToSave.saveDataForAutomaticImport, url: '/wr/m/r/nob/autoImport' },
    { id: 1, value: ENEssentialsToSave.saveDataForTextOutput, url: '/wr/m/r/txt/out' },
    { id: 1, value: ENEssentialsToSave.saveDataForAPKManager, url: '/wr/m/r/apk' },
    { id: 1, value: ENEssentialsToSave.saveDataForReadingConfig, url: '/wr/m/r/rcd' },
    { id: 1, value: ENEssentialsToSave.saveDataForReadingPeriodKindManager, url: '/wr/m/r/rpkm' },
    { id: 1, value: ENEssentialsToSave.saveDataForWaterFormula, url: '/wr/m/r/formula/ab' },
    { id: 1, value: ENEssentialsToSave.saveDataForBadgetFormula, url: '/wr/m/r/formula/budget' },
    { id: 1, value: ENEssentialsToSave.saveDataForTabsare2Formula, url: '/wr/m/r/formula/tabsare2' },
    { id: 1, value: ENEssentialsToSave.saveDataForTabsare3Formula, url: '/wr/m/r/formula/tabsare3' },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel1, url: '/wr/m/al/ap' },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel2, url: '/wr/m/al/me' },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel3, url: '/wr/m/al/cr' },
    { id: 1, value: ENEssentialsToSave.saveDataForAppLevel4, url: '/wr/m/al/ac' },
    { id: 1, value: ENEssentialsToSave.saveDataForAllUsers, url: '/wr/mu/all' },
    { id: 1, value: ENEssentialsToSave.saveDataForAddUsers, url: '/wr/mu/add' },
    { id: 1, value: ENEssentialsToSave.saveDataForRoleManager, url: '/wr/mu/role' },
    { id: 1, value: ENEssentialsToSave.saveDataForEditOnRole, url: '/wr/mu/eor' },
    { id: 1, value: ENEssentialsToSave.saveDataForCountry, url: '/wr/m/zs/c' },
    { id: 1, value: ENEssentialsToSave.saveDataForProvince, url: '/wr/m/zs/p' },
    { id: 1, value: ENEssentialsToSave.saveDataForRegion, url: '/wr/m/zs/r' },
    { id: 1, value: ENEssentialsToSave.saveDataForZone, url: '/wr/m/zs/z' },
    { id: 1, value: ENEssentialsToSave.saveDataForZoneBound, url: '/wr/m/zs/zb' },
    { id: 1, value: ENEssentialsToSave.saveDataForImportDynamic, url: '/wr/imp/imd' },
    { id: 1, value: ENEssentialsToSave.saveDataForImportErrors, url: '/wr/imp/err' },
    { id: 1, value: ENEssentialsToSave.saveDataForAssessPre, url: '/wr/imp/assesspre' },
    { id: 1, value: ENEssentialsToSave.saveDataForAssessAdd, url: '/wr/imp/assessadd' },
    { id: 1, value: ENEssentialsToSave.saveDataForSimafaReadingPrograms, url: '/wr/imp/simafa/rdpg' },
    { id: 1, value: ENEssentialsToSave.saveDataForSimafaBatch, url: '/wr/imp/simafa/batch' },
    { id: 1, value: ENEssentialsToSave.saveDataForPolicies, url: '/wr/policies' },
    { id: 1, value: ENEssentialsToSave.saveDataForProfile, url: '/wr/profile' },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackImported, url: '/wr/m/track/imported' },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackLoaded, url: '/wr/m/track/loaded' },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackReading, url: '/wr/m/track/reading' },
    { id: 1, value: ENEssentialsToSave.saveDataForLastStates, url: '/wr/m/track/latest' },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackOffloaded, url: '/wr/m/track/offloaded' },
    { id: 1, value: ENEssentialsToSave.saveDataForTrackFinished, url: '/wr/m/track/finished' },
    { id: 1, value: ENEssentialsToSave.saveDataForFollowUp, value_2: ENEssentialsToSave.saveDataForFollowUpAUX, url: '/wr/m/s/fwu' },
    { id: 1, value: ENEssentialsToSave.saveDataForSearchPro, url: '/wr/m/s/acme' },
    { id: 1, value: ENEssentialsToSave.saveDataForSearchSimple, url: '/wr/m/s/simple' },
    { id: 1, value: ENEssentialsToSave.saveDataForFNB, url: '/wr/m/fbn' },
    { id: 1, value: ENEssentialsToSave.saveDataForLMPD, url: '/wr/m/l/pd' },
    { id: 1, value: ENEssentialsToSave.saveDataForOutputDBF, url: '/wr/m/dbf' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverse, url: '/wr/rpts/mam/trv' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRTraverseDifferential, url: '/wr/rpts/mam/trvch' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRDisposalHours, url: '/wr/rpts/mam/dh' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRKarkard, url: '/wr/rpts/mam/karkard' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPreNumShown, url: '/wr/rpts/mam/pns' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRLocked, url: '/wr/rpts/mam/locked' },
    { id: 1, value: ENEssentialsToSave.saveDataForRROffloadedKarkard, url: '/wr/rpts/mam/offkarkard' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRMaster, url: '/wr/rpts/exm/master' },
    { id: 1, value: ENEssentialsToSave.saveDataForRRPerformance, url: '/wr/rpts/anlz/prfm' },
    { id: 2, req: ENEssentialsToSave.saveDataForRRGalleryReq, value: ENEssentialsToSave.saveDataForRRGallery, url: '/wr/rpts/gallery/ai' },
    { id: 1, value: ENEssentialsToSave.saveDataForDMAAnalyze, url: '/wr/m/dma/cranlz' },
    { id: 2, value: ENEssentialsToSave.saveDataForRRDetails, url: '/wr/rpts/exm/details' },
    { id: 2, value: ENEssentialsToSave.saveDataForRRkarkardDaily, url: '/wr/rpts/exm/karkardDaily' },
    { id: 2, value: ENEssentialsToSave.saveDataForRRGIS, url: '/wr/rpts/mam/gis' },
    { id: 2, value: ENEssentialsToSave.saveDataForOffloadModify, url: '/wr/m/track/offloaded/offloadMfy/' },
    { id: 2, value: ENEssentialsToSave.saveDataForLMPD, url: '/wr/m/l/pd/' },
    { id: 2, value: ENEssentialsToSave.saveDataForLMAll, url: '/wr/m/l/all/' },
    { id: 2, value: ENEssentialsToSave.saveDataForLMAll_extra, url: '/wr/m/l/all/' },
    { id: 2, value: ENEssentialsToSave.saveDataForEditUsers, url: '/wr/mu/edit/' },
    { id: 2, value: ENEssentialsToSave.saveDataForWOUI, url: '/wr/m/track/woui/' },
    { id: 2, value: ENEssentialsToSave.saveDataForUserLoggins, url: '/wr/mu/all/loggins/' },
    { id: 2, value: ENEssentialsToSave.saveDataForFragmentNOBDetails, url: '/wr/m/r/nob/' },
    { id: 13, req: ENEssentialsToSave.rSearchMoshtarakinReq, value: ENEssentialsToSave.saveDataForSearchMoshtarakin, url: '/wr/m/s/searchMosh' },
    // { id: 1,  value: '',  url: '/wr/m/ms' },
    // { id: 1,  value: '',  url: '/wr/m/mrm' },
    // { id: 1,  value: ';',  url: '/wr/msge' },
    // { id: 1,  value: '',  url: '/wr/privacy' },
  ]

  cleanArrays = () => {
    this.tabs = [];
  }
  cleanAllData = () => {
    for (let index = 0; index < this.val.length; index++) {
      this[this.val[index].value] = '';
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
