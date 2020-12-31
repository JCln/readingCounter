import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloseTabService {

  // save data when route change 
  saveDataForAppLevel1: any;

  saveDataForAppLevel2: any;
  saveDictionaryForAppLevel2: any;

  saveDataForAppLevel3: any;
  saveDictionaryForAppLevel3: any;

  saveDataForAppLevel4: any;
  saveDictionaryForAppLevel4: any;

  saveDataForCounterState: any;
  saveDictionaryForCounterState: any;

  saveDataForKarbari: any;
  saveDictionaryForKarbari: any;

  saveDataForReadingConfig: any;
  saveDictionaryForReadingConfig: any;

  saveDataForCountry: any;

  saveDataForProvince: any;
  saveDictionaryForProvince: any;

  saveDataForRegion: any;
  saveDictionaryForRegion: any;

  saveDataForZone: any;
  saveDictionaryForZone: any;

  saveDataForZoneBound: any;
  saveDictionaryForZoneBound: any;

  saveDataForAllContacts: any;
  saveDictionaryForAllContacts: any;

  saveDataForEditContacts: any;
  saveDictionaryForEditContacts: any;

  saveDataForForAddContacts: any;
  saveDictionaryForAddContacts: any;

  saveDataForReadingPeriodManager: any;
  saveDictionaryReadingPeriodManager: any;

  saveDataForReadingPeriodKindManager: any;
  // 
  saveDataForAPKManager: any;

  saveDataForCounterReport: any;

  saveDataForQotrManager: any;

  // close config and remove data for specific page(component)
  setClose = (url: string) => {
    switch (url) {
      case '/wr/m/kar':
        this.saveDataForKarbari = '';
        this.saveDictionaryForKarbari = '';
        break;
      case '/wr/m/cs':
        this.saveDataForCounterState = '';
        this.saveDictionaryForCounterState = '';
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
        break;
      case '/wr/m/rpkm':
        break;
      case '/wr/m/mrm':
        break;
      case '/wr/m/al/ap':
        this.saveDataForAppLevel1 = '';
        break;
      case '/wr/m/al/me':
        this.saveDataForAppLevel2 = '';
        this.saveDictionaryForAppLevel2 = '';
        break;
      case '/wr/m/al/cr':
        this.saveDataForAppLevel3 = '';
        this.saveDictionaryForAppLevel3 = '';
        break;
      case '/wr/m/al/ac':
        this.saveDataForAppLevel4 = '';
        this.saveDictionaryForAppLevel4 = '';
        break;
      case '/wr/m/mc':
        this.saveDataForCountry = '';
        break;
      case '/wr/m/mp':
        this.saveDataForProvince = '';
        this.saveDictionaryForProvince = '';
        break;
      case '/wr/m/mr':
        this.saveDataForRegion = '';
        this.saveDictionaryForRegion = '';
        break;
      case '/wr/m/mz':
        this.saveDataForZone = '';
        this.saveDictionaryForZone = '';
        break;
      case '/wr/m/mzd':
        this.saveDataForZoneBound = '';
        this.saveDictionaryForZoneBound = '';
        break;
      case '/wr/imd':
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
      case '/wr/privacy':
        break;

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