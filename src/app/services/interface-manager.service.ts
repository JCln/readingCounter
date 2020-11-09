import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagerService {

  constructor(private mainService: MainService) { }

  // ////edit User manager
  getAllUserContactsManager = (): Observable<any> => {
    return this.mainService.GET('​V1​/User​/All');
  }
  getUserContactManager = (uuid: string): Observable<any> => {
    return this.mainService.GETID(uuid, 'V1/user/Edit');
  }
  postUserContactManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/user/Edit', body);
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
    return this.mainService.GET('V1.Test/CounterState/All');
  }
  getCounterStateDictionary = (): Observable<any> => {
    return this.mainService.GET('V1.Test/CounterState/Dictionary');
  }
  deleteCounterState = (id: number): Observable<any> => {
    return this.mainService.POST('V1.Test/CounterState/Remove', id);
  }
  editCounterState = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1.Test/CounterState/Edit', body);
  }
  addCounterState = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1.Test/CounterState/Add', body);
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
    return this.mainService.GET('V1.Test/Role/All');
  }
  getRoleDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Role/Dictionary');
  }
  deleteRole = (id: number): Observable<any> => {
    return this.mainService.POST('Role/Remove', id);
  }
  editRole = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Edit', body);
  }
  addRole = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1.Test/Role/Add', body);
  }

  getCountryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Country/All');
  }
  getCountryDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Country/Dictionary');
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
    return this.mainService.GET('V1.Test/Province/All');
  }
  getProvinceDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Province/Dictionary');
  }
  deleteProvinceManager = (id: number): Observable<any> => {
    return this.mainService.POST('Role/Province/Remove', id);
  }
  editProvinceManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Province/Edit', body);
  }
  addProvinceManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Province/Add', body);
  }

  getRegionManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Region/All');
  }
  getRegionDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1/Region/Dictionary');
  }
  deleteRegionManager = (id: number): Observable<any> => {
    return this.mainService.POST('Role/Region/Remove', id);
  }
  editRegionManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Region/Edit', body);
  }
  addRegionManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Region/Add', body);
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
    return this.mainService.GET('V1.Test/AuthLevel1/all');
  }
  getAuthLevel1DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel1/Dictionary');
  }
  deleteAuthLevel1Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1.Test/AuthLevel1/Remove', id);
  }

  getAuthLevel2Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel2/all');
  }
  getAuthLevel2DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel2/Dictionary');
  }
  deleteAuthLevel2Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1.Test/AuthLevel2/Remove', id);
  }

  getAuthLevel3Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel3/all');
  }
  getAuthLevel3DictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel3/Dictionary');
  }
  deleteAuthLevel3Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1.Test/AuthLevel3/Remove', id);
  }

  getAuthLevel4Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel4/all');
  }
  deleteAuthLevel4Manager = (id: number): Observable<any> => {
    return this.mainService.POST('V1.Test/AuthLevel3/Remove', id);
  }

  // 

}
