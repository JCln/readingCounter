import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagerService {

  constructor(private mainService: MainService) { }

  /* Formular manager */

  getAbBahaFormulaAll = (): Observable<any> => {
    return this.mainService.GET('V1/AbBahaFormula/All');
  }
  postAbBahaFormulaEdit = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AbBahaFormula/Edit', body);
  }
  /* FOR TEST PORPUSE USE PROMISE IN THIS CLASS, NOT TEMPORARILY */
  getAbBahaFormulaExcelSample = (): Observable<any> => {
    return this.mainService.GET('v1/abbahaformula/excelsample');
  }
  postAbBahaFormulaAdd = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AbBahaFormula/Add', body);
  }
  postAbBahaFormulaAddExcel = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AbBahaFormula/AddExcel', body);
  }
  postAbBahaFormulaRemove = (uuid: string): Observable<any> => {
    return this.mainService.POSTSG('V1/AbBahaFormula/Remove', uuid);
  }

  getBudgetFormulaAll = (): Observable<any> => {
    return this.mainService.GET('V1/BudgetFormula/All');
  }
  postBudgetFormulaEdit = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/BudgetFormula/Edit', body);
  }
  getBudgetFormulaExcelSample = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.mainService.GET('V1/BudgetFormula/ExcelSample').toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postBudgetFormulaAdd = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/BudgetFormula/Add', body);
  }
  postBudgetFormulaAddExcel = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/BudgetFormula/AddExcel', body);
  }
  postBudgetFormulaRemove = (uuid: string): Observable<any> => {
    return this.mainService.POSTSG('V1/BudgetFormula/Remove', uuid);
  }

  getTabsare2FormulaAll = (): Observable<any> => {
    return this.mainService.GET('V1/Tabsare2Formula/All');
  }
  postTabsare2FormulaEdit = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tabsare2Formula/Edit', body);
  }
  postTabsare2FormulaAdd = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tabsare2Formula/Add', body);
  }
  postTabsare2FormulaRemove = (uuid: string): Observable<any> => {
    return this.mainService.POSTSG('V1/Tabsare2Formula/Remove', uuid);
  }

  getTabsare3FormulaAll = (): Observable<any> => {
    return this.mainService.GET('V1/Tabsare3Formula/All');
  }
  getTabsare3ExcelSample = (): Observable<any> => {
    return this.mainService.GET('V1/Tabsare3Formula/ExcelSample');
  }
  postTabsare3FormulaEdit = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tabsare3Formula/Edit', body);
  }
  postTabsare3FormulaAdd = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tabsare3Formula/Add', body);
  }
  postTabsare3FormulaAddExcel = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tabsare3Formula/AddExcel', body);
  }
  postTabsare3FormulaRemove = (uuid: string): Observable<any> => {
    return this.mainService.POSTSG('V1/Tabsare3Formula/Remove', uuid);
  }
  /* */

  /* text output manager */
  getTextOutputManager = (): Observable<any> => {
    return this.mainService.GET('V1/TextOutputField/All');
  }
  /* */

  // //// User manager
  getAllUsersManager = (): Observable<any> => {
    return this.mainService.GET('V1/User/All');
  }
  getUserManager = (uuid: string): Observable<any> => {
    return this.mainService.GETID(uuid, 'V1/user/Edit');
  }
  getUserLoggins = (UUID: string): Observable<any> => {
    return this.mainService.GETID(UUID, 'V1/User/Logins');
  }
  postUserManagerResetPassword = (UUID: string): Observable<any> => {
    return this.mainService.POSTSG('V1/User/ResetPassword', UUID);
  }
  postUserManagerActivate = (UUID: string): Observable<any> => {
    return this.mainService.POSTSG('V1/User/Activate', UUID);
  }
  postUserManagerDeActivate = (UUID: string): Observable<any> => {
    return this.mainService.POSTSG('V1/User/Deactivate', UUID);
  }
  /*
  also useful for get select options counter readers
  with zoneId parameter
  */

  /* fragment manager 
  contains master and details
  */
  //  master
  getFragmentMaster = (): Observable<any> => {
    return this.mainService.GET('V1/Fragment/Master/All');
  }
  deleteFragmentMaster = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Master/Remove', body);
  }
  editFragmentMaster = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Master/Edit', body);
  }
  addFragmentMaster = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Master/Add', body);
  }
  validateFragmentMaster = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Master/Validate', body);
  }
  // details
  getFragmentDetails = (masterId: string): Observable<any> => {
    return this.mainService.GETID(masterId, 'V1/Fragment/Details');
  }
  deleteFragmentDetails = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Detials/Remove', body);
  }
  editFragmentDetails = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Details/Edit', body);
  }
  addFragmentDetails = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Fragment/Details/Add', body);
  }
  // 

  getCounterReadersByZoneId = (zoneId: number): Observable<any> => {
    return this.mainService.GET(`V1/User/CounterReaders/${zoneId}`);
  }
  postUserManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/user/Edit', body);
  }
  getAddUserManager = (): Observable<any> => {
    return this.mainService.GET('V1/user/Add');
  }
  postUserAdd = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/User/Add', body);
  }
  // apk file manager
  getAPKPreList = (): Observable<any> => {
    return this.mainService.GET('V1/APK/PreList');
  }
  getAPKLast = (): Observable<any> => {
    return this.mainService.GET('V1/APK/Last');
  }
  postAPK = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/APK/Upload', body);
  }
  // /////

  // Output manager DBF 
  postOutputManager = (body: object): any => {
    return this.mainService.POSTBLOB('V1/Output/Dbf', body);
  }
  // 

  // forbidden manager DBF 
  postForbiddenByParamManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Forbidden/ByParam', body);
  }
  // 

  // Tracking manager
  getTrackImported = (): Observable<any> => {
    return this.mainService.GET('V1/Tracking/Imported');
  }
  getTrackLoaded = (): Observable<any> => {
    return this.mainService.GET('V1/Tracking/Loaded');
  }
  getTrackReading = (): Observable<any> => {
    return this.mainService.GET('V1/Tracking/Reading');
  }
  getTrackOffloaded = (): Observable<any> => {
    return this.mainService.GET('V1/Tracking/Offloaded');
  }
  getTrackFinished = (): Observable<any> => {
    return this.mainService.GET('V1/Tracking/Finished');
  }
  getTrackLastStates = (): Observable<any> => {
    return this.mainService.GET('V1/Tracking/LastStates');
  }
  postTrackingEdit = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/Edit', body);
  }
  toImported = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/ToImported', body);
  }
  toReading = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/ToReading', body);
  }
  toOffloaded = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1​/Tracking​/ToOffloaded', body);
  }
  toPre = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/Pre', body);
  }
  finishReading = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/FinishReading', body);
  }
  removeTrackingId = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/Remove', body);
  }
  // SEARCH MANAGER
  getTrackFollowUp = (trackNumber: string): Observable<any> => {
    return this.mainService.GET(`V1/Tracking/FollowUp/?trackNumber=${trackNumber}`);
  }
  postSearchMosh = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Search/Moshtarak', body);
  }
  // reading report manager

  postRRMasterManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/ReadingReport/Master/WithParam', body);
  }
  postRRDetailsManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/ReadingReport/Details/WithParam', body);
  }
  postRRTraverseManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/Traverse', body);
  }
  postRRTraverseDifferentialManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/TraverseDifferential', body);
  }
  postRRKarkardManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/Karkard', body);
  }
  postRRKarkardChartManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/KarkardChart', body);
  }
  postRRTraverseDifferentialChartManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/TraverseDifferntialChart', body);
  }
  postRRAnalyzeByParam = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Tracking/Analyze/ByParam', body);
  }


  getRRTraverseDifferentialDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/List/TraverseDifferential/Dictionary');
  }

  postRRKarkardDailyManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/KarkardDaily', body);
  }
  postRRGISManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/Gis', body);
  }

  postRRDisposalHoursanager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/DispersalHours', body);
  }
  postRRDispersalChartManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/Offloaded/DispersalChart', body);
  }

  // 
  // List Manager 

  getLMAll = (trackingId: string): Observable<any> => {
    return this.mainService.GET(`V1/List/OffLoaded/All/${trackingId}`);
  }
  getLMPD = (trackNumber: number): Observable<any> => {
    return this.mainService.GET(`V1/List/OffLoaded/PerDay/${trackNumber}`);
  }
  postLMPDXY = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/List/OffLoaded/PerDayXY', body);
  }
  // 

  // reading period manager
  getReadingPeriodManager = (): Observable<any> => {
    return this.mainService.GET('V1/readingPeriod/All');
  }
  getReadingPeriodManagerDictionary = (zoneId: number): Observable<any> => {
    return this.mainService.GET(`V1/readingPeriod/Dictionary/${zoneId}`);
  }
  getReadingPeriodByKindManagerDictionary = (kindId: string): Observable<any> => {
    return this.mainService.GET(`V1/ReadingPeriod/DictionaryByKind/${kindId}`);
  }
  getReadingPeriodManagerDictionaryByZoneIdAndKindId = (zoneId: number, kindId: number): Observable<any> => {
    return this.mainService.GET(`V1/readingPeriod/Dictionary/${zoneId}/${kindId}`);
  }
  editReadingPeriodManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/readingPeriod/Edit', body);
  }
  AddReadingPeriodManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/readingPeriod/Add', body);
  }
  deleteReadingPeriodManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/readingPeriod/Remove', id);
  }
  // 
  // reading period Kind manager
  getReadingPeriodKindManager = (): Observable<any> => {
    return this.mainService.GET('V1/readingPeriodKind/All');
  }
  getReadingPeriodKindManagerDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/readingPeriodKind/Dictionary');
  }
  editReadingPeriodKindManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/readingPeriodKind/Edit', body);
  }
  AddReadingPeriodKindManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/readingPeriodKind/Add', body);
  }
  deleteReadingPeriodKindManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/readingPeriodKind/Remove', id);
  }
  // 

  // karbari ///
  getKarbari = (): Observable<any> => {
    return this.mainService.GET('V1/Karbari/All');
  }
  getKarbariDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/Karbari/Dictionary');
  }
  getKarbariDictionaryCode = (): Observable<any> => {
    return this.mainService.GET('V1/Karbari/DictionaryCode');
  }
  deleteKarbari = (id: number): Observable<any> => {
    return this.mainService.POST('V1/Karbari/Remove', id);
  }
  editKarbari = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Karbari/Edit', body);
  }
  addKarbari = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Karbari/Add', body);
  }

  // ////

  // counter state ///
  getCounterState = (): Observable<any> => {
    return this.mainService.GET('V1/CounterState/All');
  }
  getCounterStateDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/CounterState/Dictionary');
  }
  getCounterStateByZoneIdDictionary = (zoneId: number): Observable<any> => {
    return this.mainService.GET(`V1/CounterState/DictionaryByZoneId/${zoneId}`);
  }
  postCounterStatGridFriendly = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/CounterState/GridFriendly', body);
  }
  deleteCounterState = (id: number): Observable<any> => {
    return this.mainService.POST('V1/CounterState/Remove', id);
  }
  editCounterState = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/CounterState/Edit', body);
  }
  addCounterState = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/CounterState/Add', body);
  }

  // ////

  // counter report manager
  // reading config default//
  getCounterReport = (): Observable<any> => {
    return this.mainService.GET('V1/CounterReport/All');
  }
  getCounterReportDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/CounterReport/Get');
  }
  deleteCounterReport = (id: number): Observable<any> => {
    return this.mainService.POST('V1/CounterReport/Remove', id);
  }
  editCounterReport = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/CounterReport/Edit', body);
  }
  addCounterReport = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/CounterReport/Add', body);
  }
  //  ///

  // qort manager
  getQotr = (): Observable<any> => {
    return this.mainService.GET('V1/Qotr/All');
  }
  getQotrDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/Qotr/Dictionary');
  }
  deleteQotr = (id: number): Observable<any> => {
    return this.mainService.POST('V1/Qotr/Remove', id);
  }
  editQotr = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Qotr/Edit', body);
  }
  addQotr = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Qotr/Add', body);
  }

  // 

  // reading config default//
  getReadingConfig = (): Observable<any> => {
    return this.mainService.GET('V1/ReadingConfigDefault/All');
  }
  getReadingConfigDefaultByZoneId = (zoneId: number): Observable<any> => {
    return this.mainService.GET(`V1/ReadingConfigDefault/Get/${zoneId}`);
  }
  deleteReadingConfig = (id: number): Observable<any> => {
    return this.mainService.POST('V1/ReadingConfigDefault/Remove', id);
  }
  editReadingConfig = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/ReadingConfigDefault/Edit', body);
  }
  addReadingConfig = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/ReadingConfigDefault/Add', body);
  }
  //  ///

  // downlaod manager
  downloadFile = (fileRepositoryId: string): Observable<any> => {
    return this.mainService.GETBLOB(fileRepositoryId, 'V1/Download/File');
  }
  downloadFileInfo = (targetId: string): Observable<any> => {
    return this.mainService.GETID(targetId, 'V1/Download/File/info');
  }
  downloadForbiddenFileInfo = (targetId: string): Observable<any> => {
    return this.mainService.GETID(targetId, 'V1/Download/File/forbidden');
  }

  // 

  getRole = (): Observable<any> => {
    return this.mainService.GET('V1/Role/All');
  }
  getRoleDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Role/Dictionary');
  }
  deleteRole = (id: number): Observable<any> => {
    return this.mainService.POST('Role/Remove', id);
  }
  editRole = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Edit', body);
  }
  addRole = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Role/Add', body);
  }

  getCountryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Country/All');
  }
  getCountryDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Country/Dictionary');
  }
  deleteCountryManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/Country/Remove', id);
  }
  editCountryManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Country/Edit', body);
  }
  addCountryManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Country/Add', body);
  }

  getProvinceManager = (): Observable<any> => {
    return this.mainService.GET('V1/Province/All');
  }
  getProvinceDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Province/Dictionary');
  }
  deleteProvinceManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/Province/Remove', id);
  }
  editProvinceManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Province/Edit', body);
  }
  addProvinceManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Province/Add', body);
  }

  getRegionManager = (): Observable<any> => {
    return this.mainService.GET('V1/Region/All');
  }
  getRegionDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Region/Dictionary');
  }
  deleteRegionManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/Region/Remove', id);
  }
  editRegionManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Region/Edit', body);
  }
  addRegionManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Region/Add', body);
  }

  getZoneManager = (): Observable<any> => {
    return this.mainService.GET('V1/Zone/All');
  }
  getZoneDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Zone/Dictionary');
  }
  deleteZoneManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/Zone/Remove', id);
  }
  editZoneManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Zone/Edit', body);
  }
  addZoneManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Zone/Add', body);
  }

  getZoneBoundManager = (): Observable<any> => {
    return this.mainService.GET('V1/ZoneBound/All');
  }
  getZoneBoundDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/ZoneBound/Dictionary');
  }
  deleteZoneBoundManager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/ZoneBound/Remove', id);
  }
  editZoneBoundManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/ZoneBound/Edit', body);
  }
  addZoneBoundManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/ZoneBound/Add', body);
  }

  // auth Levels 
  getAuthLevel1Manager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel1/all');
  }
  getAuthLevel1DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel1/Dictionary');
  }
  deleteAuthLevel1Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/AuthLevel1/Remove', id);
  }
  editAuthLevel1Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel1/Edit', body);
  }
  addAuthLevel1Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel1/Add', body);
  }

  getAuthLevel2Manager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel2/all');
  }
  getAuthLevel2DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel2/Dictionary');
  }
  deleteAuthLevel2Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/AuthLevel2/Remove', id);
  }
  editAuthLevel2Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel2/Edit', body);
  }
  addAuthLevel2Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel2/Add', body);
  }


  getAuthLevel3Manager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel3/all');
  }
  getAuthLevel3DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel3/Dictionary');
  }
  deleteAuthLevel3Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/AuthLevel3/Remove', id);
  }
  editAuthLevel3Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel3/Edit', body);
  }
  addAuthLevel3Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel3/Add', body);
  }


  getAuthLevel4Manager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel4/all');
  }
  getAuthLevel4DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/AuthLevel4/Dictionary');
  }
  deleteAuthLevel4Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/AuthLevel4/Remove', id);
  }
  editAuthLevel4Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel4/Edit', body);
  }
  addAuthLevel4Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel4/Add', body);
  }
  // 

  /* DICTIONRIES */



}
