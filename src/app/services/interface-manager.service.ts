import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagerService {

  constructor(private mainService: MainService) { }

  // //// User manager
  getAllUserContactsManager = (): Observable<any> => {
    return this.mainService.GET('​V1​/User​/All');
  }
  getUserContactManager = (uuid: string): Observable<any> => {
    return this.mainService.GETID(uuid, 'V1/user/Edit');
  }
  postUserContactManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/user/Edit', body);
  }
  getAddUserContactManager = (): Observable<any> => {
    return this.mainService.GET('V1/user/Add');
  }
  // /////

  // karbari ///
  getKarbari = (): Observable<any> => {
    return this.mainService.GET('V1/Karbari/All');
  }
  getKarbariDictionary = (): Observable<any> => {
    return this.mainService.GET('V1/Karbari/Dictionary');
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

  // reading config default//
  getReadingConfig = (): Observable<any> => {
    return this.mainService.GET('V1/ReadingConfigDefault/All');
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
    return this.mainService.POST('Role/Country/Remove', id);
  }
  editCountryManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Country/Edit', body);
  }
  addCountryManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Country/Add', body);
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
  deleteAuthLevel4Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1/AuthLevel3/Remove', id);
  }
  editAuthLevel4Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel4/Edit', body);
  }
  addAuthLevel4Manager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/AuthLevel4/Add', body);
  }


  // 

}
