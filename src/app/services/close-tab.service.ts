import { Injectable } from '@angular/core';
import { ISidebarVals, ITabs } from 'interfaces/ioverall-config';

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
  saveDataForRRMaster: any;
  saveDataForRRPerformance: any;
  saveDataForDMAAnalyze: any;
  saveDataForRRDetails: any;
  saveDataForRRDisposalHours: any;
  saveDataForRRGIS: any;
  saveDataForFragmentNOB: any;
  saveDataForFragmentNOBDetails: any;
  saveDataForTextOutput: any;
  saveDataForPolicies: any;
  saveDataForFNB: any;
  saveDataForProfile: any;
  saveDataForRRGalleryReq: any;

  private val: ISidebarVals[] = [
    { id: 1, req: '', value: 'saveDataForKarbari', value_2: '', url: '/wr/m/r/kar' },
    { id: 1, req: '', value: 'saveDataForCounterState', value_2: '', url: '/wr/m/r/cs' },
    { id: 1, req: '', value: 'saveDataForQotrManager', value_2: '', url: '/wr/m/r/qr' },
    { id: 1, req: '', value: 'saveDataForCounterReport', value_2: '', url: '/wr/m/r/rpt' },
    { id: 1, req: '', value: 'saveDataForFragmentNOB', value_2: '', url: '/wr/m/r/nob' },
    { id: 1, req: '', value: 'saveDataForTextOutput', value_2: '', url: '/wr/m/r/txt/out' },
    { id: 1, req: '', value: 'saveDataForAPKManager', value_2: '', url: '/wr/m/r/apk' },
    { id: 1, req: '', value: 'saveDataForReadingConfig', value_2: '', url: '/wr/m/r/rcd' },
    { id: 1, req: '', value: 'saveDataForReadingPeriodKindManager', value_2: '', url: '/wr/m/r/rpkm' },
    { id: 1, req: '', value: 'saveDataForWaterFormula', value_2: '', url: '/wr/m/r/formula/ab' },
    { id: 1, req: '', value: 'saveDataForBadgetFormula', value_2: '', url: '/wr/m/r/formula/budget' },
    { id: 1, req: '', value: 'saveDataForTabsare2Formula', value_2: '', url: '/wr/m/r/formula/tabsare2' },
    { id: 1, req: '', value: 'saveDataForTabsare3Formula', value_2: '', url: '/wr/m/r/formula/tabsare3' },
    { id: 1, req: '', value: 'saveDataForAppLevel1', value_2: '', url: '/wr/m/al/ap' },
    { id: 1, req: '', value: 'saveDataForAppLevel2', value_2: '', url: '/wr/m/al/me' },
    { id: 1, req: '', value: 'saveDataForAppLevel3', value_2: '', url: '/wr/m/al/cr' },
    { id: 1, req: '', value: 'saveDataForAppLevel4', value_2: '', url: '/wr/m/al/ac' },
    { id: 1, req: '', value: 'saveDataForAllUsers', value_2: '', url: '/wr/mu/all' },
    { id: 1, req: '', value: 'saveDataForAddUsers', value_2: '', url: '/wr/mu/add' },
    { id: 1, req: '', value: 'saveDataForRoleManager', value_2: '', url: '/wr/mu/role' },
    { id: 1, req: '', value: 'saveDataForEditOnRole', value_2: '', url: '/wr/mu/eor' },
    { id: 1, req: '', value: 'saveDataForCountry', value_2: '', url: '/wr/m/zs/c' },
    { id: 1, req: '', value: 'saveDataForProvince', value_2: '', url: '/wr/m/zs/p' },
    { id: 1, req: '', value: 'saveDataForRegion', value_2: '', url: '/wr/m/zs/r' },
    { id: 1, req: '', value: 'saveDataForZone', value_2: '', url: '/wr/m/zs/z' },
    { id: 1, req: '', value: 'saveDataForZoneBound', value_2: '', url: '/wr/m/zs/zb' },
    // { id: 1, req: '', value: '', value_2: '', url: '/wr/m/ms' },
    // { id: 1, req: '', value: '', value_2: '', url: '/wr/m/mrm' },
    { id: 1, req: '', value: 'saveDataForImportDynamic', value_2: '', url: '/wr/imp/imd' },
    { id: 1, req: '', value: 'saveDataForImportErrors', value_2: '', url: '/wr/imp/err' },
    { id: 1, req: '', value: 'saveDataForAssessPre', value_2: '', url: '/wr/imp/assesspre' },
    { id: 1, req: '', value: 'saveDataForAssessAdd', value_2: '', url: '/wr/imp/assessadd' },
    { id: 1, req: '', value: 'saveDataForSimafaReadingPrograms', value_2: '', url: '/wr/imp/simafa/rdpg' },
    { id: 1, req: '', value: 'saveDataForSimafaBatch', value_2: '', url: '/wr/imp/simafa/batch' },
    { id: 1, req: '', value: 'saveDataForPolicies', value_2: '', url: '/wr/policies' },
    { id: 1, req: '', value: 'saveDataForProfile', value_2: '', url: '/wr/profile' },
    // { id: 1, req: '', value: ';', value_2: '', url: '/wr/msge' },
    { id: 1, req: '', value: 'saveDataForTrackImported', value_2: '', url: '/wr/m/track/imported' },
    { id: 1, req: '', value: 'saveDataForTrackLoaded', value_2: '', url: '/wr/m/track/loaded' },
    { id: 1, req: '', value: 'saveDataForTrackReading', value_2: '', url: '/wr/m/track/reading' },
    { id: 1, req: '', value: 'saveDataForLastStates', value_2: '', url: '/wr/m/track/latest' },
    { id: 1, req: '', value: 'saveDataForTrackOffloaded', value_2: '', url: '/wr/m/track/offloaded' },
    { id: 1, req: '', value: 'saveDataForTrackFinished', value_2: '', url: '/wr/m/track/finished' },
    { id: 1, req: '', value: 'saveDataForFollowUp', value_2: 'saveDataForFollowUpAUX', url: '/wr/m/s/fwu' },
    { id: 13, req: 'saveDataForSearchMoshtarakinReq', value: 'saveDataForSearchMoshtarakin', value_2: '', url: '/wr/m/s/searchMosh' },
    { id: 1, req: '', value: 'saveDataForSearchPro', value_2: '', url: '/wr/m/s/acme' },
    { id: 1, req: '', value: 'saveDataForSearchSimple', value_2: '', url: '/wr/m/s/simple' },
    // { id: 1, req: '', value: '', value_2: '', url: '/wr/privacy' },
    { id: 1, req: '', value: 'saveDataForFNB', value_2: '', url: '/wr/m/fbn' },
    { id: 1, req: '', value: 'saveDataForLMPD', value_2: '', url: '/wr/m/l/pd' },
    { id: 1, req: '', value: 'saveDataForOutputDBF', value_2: '', url: '/wr/m/dbf' },
    { id: 1, req: '', value: 'saveDataForRRTraverse', value_2: '', url: '/wr/rpts/mam/trv' },
    { id: 1, req: '', value: 'saveDataForRRTraverseDifferential', value_2: '', url: '/wr/rpts/mam/trvch' },
    { id: 1, req: '', value: 'saveDataForRRDisposalHours', value_2: '', url: '/wr/rpts/mam/dh' },
    { id: 1, req: '', value: 'saveDataForRRKarkard', value_2: '', url: '/wr/rpts/mam/karkard' },
    { id: 1, req: '', value: 'saveDataForRROffloadedKarkard', value_2: '', url: '/wr/rpts/mam/offkarkard' },
    { id: 1, req: '', value: 'saveDataForRRMaster', value_2: '', url: '/wr/rpts/exm/master' },
    { id: 1, req: '', value: 'saveDataForRRPerformance', value_2: '', url: '/wr/rpts/anlz/prfm' },
    { id: 1, req: '', value: 'saveDataForDMAAnalyze', value_2: '', url: '/wr/m/dma/cranlz' },
    { id: 2, req: '', value: 'saveDataForRRDetails', value_2: '', url: '/wr/rpts/exm/details' },
    { id: 2, req: '', value: 'saveDataForRRkarkardDaily', value_2: '', url: '/wr/rpts/exm/karkardDaily' },
    { id: 2, req: '', value: 'saveDataForRRGIS', value_2: '', url: '/wr/rpts/mam/gis' },
    { id: 2, req: 'saveDataForRRGalleryReq', value: '', value_2: '', url: '/wr/rpts/gallery/ai' },
    { id: 2, req: '', value: 'saveDataForOffloadModify', value_2: '', url: '/wr/m/track/offloaded/offloadMfy/' },
    { id: 2, req: '', value: 'saveDataForLMPD', value_2: '', url: '/wr/m/l/pd/' },
    { id: 2, req: '', value: 'saveDataForLMAll', value_2: 'saveDataForLMAll_extra', url: '/wr/m/l/all/' },
    { id: 2, req: '', value: 'saveDataForEditUsers', value_2: '', url: '/wr/mu/edit/' },
    { id: 2, req: '', value: 'saveDataForWOUI', value_2: '', url: '/wr/m/track/woui/' },
    { id: 2, req: '', value: 'saveDataForUserLoggins', value_2: '', url: '/wr/mu/all/loggins/' },
    { id: 2, req: '', value: 'saveDataForFragmentNOBDetails', value_2: '', url: '/wr/m/r/nob/' },
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
        item.req = '';
        item.value = '';
        item.value_2 = ''
      }
    })
  }
}
