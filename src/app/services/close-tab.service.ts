import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseTabService {

  // save data when route change 
  saveDataForAppLevel1: any;

  saveDataForAppLevel2: any;

  saveDataForAppLevel3: any;

  saveDataForAppLevel4: any;

  saveDataForCounterState: any;

  saveDataForKarbari: any;

  saveDataForReadingConfig: any;
  saveDictionaryForReadingConfig: any;

  saveDataForCountry: any;

  saveDataForProvince: any;

  saveDataForRegion: any;

  saveDataForZone: any;

  saveDataForZoneBound: any;

  saveDataForAllContacts: any;
  saveDictionaryForAllContacts: any;

  saveDataForEditContacts: any;
  saveDictionaryForEditContacts: any;

  saveDataForForAddContacts: any;
  saveDictionaryForAddContacts: any;

  saveDataForReadingPeriodManager: any;

  saveDataForReadingPeriodKindManager: any;
  // 
  saveDataForAPKManager: any;

  saveDataForCounterReport: any;

  saveDataForQotrManager: any;

  // track manager
  saveDataForTrackImported: any;

  saveDataForTrackLoaded: any;

  saveDataForTrackReading: any;

  saveDataForTrackOffloaded: any;

  saveDataForTrackFinished: any;

  saveDataForFollowUp: any;
  // 
  // import dynamic
  saveDataForImportDynamic: any;
  // 
  // list manager
  saveDataForLMPD: any;
  saveDataForLMAll: any;
  // 
  // WOUI manager
  saveDataForWOUI: any;
  // 
  // Forbidden manager
  saveDataForForbidden: any;
  // 
  // dbf output manager
  saveDataForOutputDBF: any;
  // 

  // close config and remove data for specific page(component)
  setClose = (url: string) => {
    switch (url) {
      case '/wr/m/kar':
        this.saveDataForKarbari = '';
        break;
      case '/wr/m/cs':
        this.saveDataForCounterState = '';
        break;
      case '/wr/mu/all':
        this.saveDataForAllContacts = '';
        break;
      case '/wr/mu/add':
        this.saveDataForForAddContacts = '';
        break;
      case '/wr/m/ms':
        break;
      case '/wr/m/rpm':
        this.saveDataForReadingPeriodManager = '';
        break;
      case '/wr/m/rpkm':
        this.saveDataForReadingPeriodKindManager = '';
        break;
      case '/wr/m/mrm':
        break;
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
      case '/wr/m/mc':
        this.saveDataForCountry = '';
        break;
      case '/wr/m/mp':
        this.saveDataForProvince = '';
        break;
      case '/wr/m/mr':
        this.saveDataForRegion = '';
        break;
      case '/wr/m/mz':
        this.saveDataForZone = '';
        break;
      case '/wr/m/mzd':
        this.saveDataForZoneBound = '';
        break;
      case '/wr/imd':
        this.saveDataForImportDynamic = '';
        break;
      case '/wr/profile':
        break;
      case '/wr/apk':
        this.saveDataForAPKManager = '';
        break;
      case '/wr/bi':
        break;
      case '/wr/qr':
        this.saveDataForQotrManager = '';
        break;
      case '/wr/msge':
        break;
      case '/wr/m/cr':
        this.saveDataForCounterReport = '';
        break;
      case '/wr/track/imported':
        this.saveDataForTrackImported = '';
        break;
      case '/wr/track/loaded':
        this.saveDataForTrackLoaded = '';
        break;
      case '/wr/track/reading':
        this.saveDataForTrackReading = '';
        break;
      case '/wr/track/offloaded':
        this.saveDataForTrackOffloaded = '';
        break;
      case '/wr/track/finished':
        this.saveDataForTrackFinished = '';
        break;
      case '/wr/track/fwu':
        this.saveDataForFollowUp = '';
        break;
      case '/wr/privacy':
        break;
      case '/wr/m/l/pd':
        this.saveDataForLMPD = '';
        break;
      case '/wr/m/l/all':
        this.saveDataForLMAll = '';
        break;
      case '/wr/m/fbn':
        this.saveDataForLMAll = '';
        break;
      case '/wr/m/dbf':
        this.saveDataForOutputDBF = '';
        break;

    }
    // listed all of the dynamic routes
    if (url.includes('/wr/m/l/pd/')) {
      this.saveDataForLMPD = '';
    }
    if (url.includes('/wr/m/l/all/')) {
      this.saveDataForLMAll = '';
    }
    if (url.includes('/wr/mu/edit/')) {
      this.saveDataForEditContacts = '';
    }
    if (url.includes('/wr/m/track/woui/')) {
      this.saveDataForWOUI = '';
    }
  }
  // 

  constructor() { }
}
// '/wr/mu/all', title: 'agGrid', isClosable
// '/wr/mu/add', title: 'add Contact mg
// '/wr/m/ms', title: 'مدیریت سرور',
//   '/wr/m/rpm', title: 'مدیریت دوره قرائت
// '/wr/m/rpkm', title: 'مدیریت نوع دوره
// '/wr/m/mrm', title: 'مدیریت نقش ها