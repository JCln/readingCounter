import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseTabService {

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
  saveDataForKarbari: any;
  saveDataForReadingConfig: any;
  saveDictionaryForReadingConfig: any;
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
  saveDictionaryForAllUsers: any;
  saveDataForRoleManager: any;

  saveDataForEditUsers: any;
  saveDictionaryForEditUsers: any;
  saveDataForForAddUsers: any;
  saveDictionaryForAddUsers: any;

  // track manager
  saveDataForTrackImported: any;
  saveDataForTrackLoaded: any;
  saveDataForTrackReading: any;
  saveDataForTrackOffloaded: any;
  saveDataForTrackFinished: any;
  saveDataForLastStates: any;
  saveDataForOffloadModify: any;
  // import dynamic
  saveDataForImportDynamic: any;
  saveDataForSimafaBatch: any;
  saveDataForSimafaReadingPrograms: any;
  saveDataForAssessPre: any;
  saveDataForAssessAdd: any;
  // SEARCH
  saveDataForFollowUp: any;
  saveDataForSearchMoshtarakin: any;
  saveDataForSearchPro: any;
  // list manager
  saveDataForLMPD: any;
  saveDataForLMAll: any;
  saveDataForLMAll_extra: any;
  // WOUI manager
  saveDataForWOUI: any;
  // Forbidden manager
  saveDataForForbidden: any;
  // dbf output manager
  saveDataForOutputDBF: any;
  // number of Logs
  saveDataForUserLoggins: any;
  // reading reports 
  saveDataForRRTraverse: any;
  saveDataForRRTraverseDifferential: any;
  saveDataForRRKarkard: any;
  saveDataForRRkarkardDaily: any;
  saveDataForRRMaster: any;
  saveDataForRRDetails: any;
  saveDataForRRDisposalHours: any;
  saveDataForRRGIS: any;
  // managers
  saveDataForFragmentNOB: any;
  saveDataForFragmentNOBDetails: any;
  saveDataForTextOutput: any;
  // DASHBOARD
  // saveDataForDispersalRateTimed: any;


  // close config and remove data for specific page(component)
  setClose = (url: string) => {
    switch (url) {
      // reading manage 
      case '/wr/m/r/kar':
        this.saveDataForKarbari = '';
        break;
      case '/wr/m/r/cs':
        this.saveDataForCounterState = '';
        break;
      case '/wr/m/r/qr':
        this.saveDataForQotrManager = '';
        break;
      case '/wr/m/r/cr':
        this.saveDataForCounterReport = '';
        break;
      case '/wr/m/r/nob':
        this.saveDataForFragmentNOB = '';
        break;
      case '/wr/m/r/txt/out':
        this.saveDataForTextOutput = '';
        break;
      case '/wr/m/r/apk':
        this.saveDataForAPKManager = '';
        break;
      case '/wr/m/r/rpm':
        this.saveDataForReadingPeriodManager = '';
        break;
      case '/wr/m/r/rpkm':
        this.saveDataForReadingPeriodKindManager = '';
        break;
      case '/wr/m/r/formula/ab':
        this.saveDataForWaterFormula = '';
        break;
      case '/wr/m/r/formula/budget':
        this.saveDataForBadgetFormula = '';
        break;
      case '/wr/m/r/formula/tabsare2':
        this.saveDataForTabsare2Formula = '';
        break;
      case '/wr/m/r/formula/tabsare3':
        this.saveDataForTabsare3Formula = '';
        break;
      // auths manage
      case '/wr/m/al/ap':
        this.saveDataForAppLevel1 = '';
        break;
      case '/wr/m/al/me':
        this.saveDataForAppLevel2 = '';
        break;
      case '/wr/m/al/cr':
        this.saveDataForAppLevel3 = '';
        break;
      case '/wr/m/al/ac':
        this.saveDataForAppLevel4 = '';
        break;
      // user manage
      case '/wr/mu/all':
        this.saveDataForAllUsers = '';
        break;
      case '/wr/mu/add':
        this.saveDataForForAddUsers = '';
        break;
      case '/wr/mu/role':
        this.saveDataForRoleManager = '';
        break;
      // zones manage
      case '/wr/m/zs/c':
        this.saveDataForCountry = '';
        break;
      case '/wr/m/zs/p':
        this.saveDataForProvince = '';
        break;
      case '/wr/m/zs/r':
        this.saveDataForRegion = '';
        break;
      case '/wr/m/zs/z':
        this.saveDataForZone = '';
        break;
      case '/wr/m/zs/zb':
        this.saveDataForZoneBound = '';
        break;
      // ////     
      case '/wr/m/ms':
        break;
      case '/wr/m/mrm':
        break;
      case '/wr/imp/imd':
        this.saveDataForImportDynamic = '';
        break;
      case '/wr/imp/assesspre':
        this.saveDataForAssessPre = '';
        break;
      case '/wr/imp/assessadd':
        this.saveDataForAssessAdd = '';
        break;
      case '/wr/imp/simafa/rdpg':
        this.saveDataForSimafaReadingPrograms = '';
        break;
      case '/wr/imp/simafa/batch':
        this.saveDataForSimafaBatch = '';
        break;
      case '/wr/profile':
        break;
      case '/wr/msge':
        break;
      //  trackings
      case '/wr/m/track/imported':
        this.saveDataForTrackImported = '';
        break;
      case '/wr/m/track/loaded':
        this.saveDataForTrackLoaded = '';
        break;
      case '/wr/m/track/reading':
        this.saveDataForTrackReading = '';
        break;
      case '/wr/m/track/latest':
        this.saveDataForLastStates = '';
        break;
      case '/wr/m/track/offloaded':
        this.saveDataForTrackOffloaded = '';
        break;
      case '/wr/m/track/finished':
        this.saveDataForTrackFinished = '';
        break;
      // searchs
      case '/wr/m/s/searchMosh':
        this.saveDataForSearchMoshtarakin = '';
        break;
      case '/wr/m/s/searchPro':
        this.saveDataForSearchPro = '';
        break;
      // 
      case '/wr/privacy':
        break;
      case '/wr/m/l/pd':
        this.saveDataForLMPD = '';
        break;
      case '/wr/m/fbn':
        this.saveDataForForbidden = '';
        break;
      case '/wr/m/dbf':
        this.saveDataForOutputDBF = '';
        break;
      // reading reports
      case '/wr/rpts/mam/trv':
        this.saveDataForRRTraverse = '';
        break;
      case '/wr/rpts/mam/trvch':
        this.saveDataForRRTraverseDifferential = '';
        break;
      case '/wr/rpts/mam/dh':
        this.saveDataForRRDisposalHours = '';
        break;
      case '/wr/rpts/mam/karkard':
        this.saveDataForRRKarkard = '';
        break;
      case '/wr/rpts/exm/master':
        this.saveDataForRRMaster = '';
        break;
      case '/wr/rpts/exm/details':
        this.saveDataForRRDetails = '';
        break;
      case '/wr/rpts/exm/karkardDaily':
        this.saveDataForRRkarkardDaily = '';
        break;
      case '/wr/rpts/mam/gis':
        this.saveDataForRRGIS = '';
        break;
      // case '/wr/db':
      //   this.saveDataForDispersalRateTimed = '';
      //   break;
    }
    // listed all of the dynamic routes
    if (url.includes('/wr/m/track/offloaded/offloadMfy/')) {
      this.saveDataForOffloadModify = '';
      return;
    }
    if (url.includes('/wr/m/s/fwu')) {
      this.saveDataForFollowUp = '';
      return;
    }
    if (url.includes('/wr/m/l/pd/')) {
      this.saveDataForLMPD = '';
      return;
    }
    if (url.includes('/wr/m/l/all/')) {
      this.saveDataForLMAll = '';
      this.saveDataForLMAll_extra = '';
      return;
    }
    if (url.includes('/wr/mu/edit/')) {
      this.saveDataForEditUsers = '';
      return;
    }
    if (url.includes('/wr/m/track/woui/')) {
      this.saveDataForWOUI = '';
      return;
    }
    if (url.includes('/wr/mu/all/loggins/')) {
      this.saveDataForUserLoggins = '';
      return;
    }
    if (url.includes('/wr/m/r/nob/')) {
      this.saveDataForFragmentNOBDetails = '';
      return;
    }
  }
  // 

  cleanAllData = () => {
    this.saveDataForWaterFormula = '';
    this.saveDataForBadgetFormula = '';
    this.saveDataForTabsare2Formula = '';
    this.saveDataForTabsare3Formula = '';
    this.saveDataForAppLevel1 = '';
    this.saveDataForAppLevel2 = '';
    this.saveDataForAppLevel3 = '';
    this.saveDataForAppLevel4 = '';
    this.saveDataForCounterState = '';
    this.saveDataForKarbari = '';
    this.saveDataForReadingConfig = '';
    this.saveDictionaryForReadingConfig = '';
    this.saveDataForCountry = '';
    this.saveDataForProvince = '';
    this.saveDataForRegion = '';
    this.saveDataForZone = '';
    this.saveDataForZoneBound = '';
    this.saveDataForAllUsers = '';
    this.saveDictionaryForAllUsers = '';
    this.saveDataForSearchMoshtarakin = '';
    this.saveDataForSearchPro = '';
    this.saveDataForEditUsers = '';
    this.saveDictionaryForEditUsers = '';
    this.saveDataForForAddUsers = '';
    this.saveDictionaryForAddUsers = '';
    this.saveDataForRoleManager = '';
    this.saveDataForReadingPeriodManager = '';
    this.saveDataForReadingPeriodKindManager = '';
    this.saveDataForAPKManager = '';
    this.saveDataForCounterReport = '';
    this.saveDataForQotrManager = '';
    this.saveDataForTrackImported = '';
    this.saveDataForTrackLoaded = '';
    this.saveDataForTrackReading = '';
    this.saveDataForTrackOffloaded = '';
    this.saveDataForTrackFinished = '';
    this.saveDataForFollowUp = '';
    this.saveDataForLastStates = '';
    this.saveDataForOffloadModify = '';
    this.saveDataForImportDynamic = '';
    this.saveDataForAssessPre = '';
    this.saveDataForAssessAdd = '';
    this.saveDataForSimafaReadingPrograms = '';
    this.saveDataForSimafaBatch = '';
    this.saveDataForLMPD = '';
    this.saveDataForLMAll = '';
    this.saveDataForLMAll_extra = '';
    this.saveDataForWOUI = '';
    this.saveDataForForbidden = '';
    this.saveDataForOutputDBF = '';
    this.saveDataForUserLoggins = '';
    this.saveDataForRRTraverse = '';
    this.saveDataForRRTraverseDifferential = '';
    this.saveDataForRRKarkard = '';
    this.saveDataForRRkarkardDaily = '';
    this.saveDataForRRMaster = '';
    this.saveDataForRRDetails = '';
    this.saveDataForRRDisposalHours = '';
    this.saveDataForRRGIS = '';
    this.saveDataForFragmentNOB = '';
    this.saveDataForFragmentNOBDetails = '';
    this.saveDataForTextOutput = '';
    // this.saveDataForDispersalRateTimed = '';
  }
}
