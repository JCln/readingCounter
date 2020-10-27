import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagerService {

  constructor(private mainService: MainService) { }

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
    return this.mainService.GET('V1.Test/Region/Dictionary');
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
    return this.mainService.GET('V1.Test/Zone/All');
  }
  getZoneDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Zone/Dictionary');
  }
  deleteZoneManager = (id: number): Observable<any> => {
    return this.mainService.POST('Role/Zone/Remove', id);
  }
  editZoneManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Zone/Edit', body);
  }
  addZoneManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Zone/Add', body);
  }

  getZoneBoundManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/ZoneBound/All');
  }
  getZoneBoundDictionaryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/ZoneBound/Dictionary');
  }
  deleteZoneBoundManager = (id: number): Observable<any> => {
    return this.mainService.POST('Role/ZoneBound/Remove', id);
  }
  editZoneBoundManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/ZoneBound/Edit', body);
  }
  addZoneBoundManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/ZoneBound/Add', body);
  }

  // auth Levels 
  getAuthLevel1Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel1/all');
  }

  getAuthLevel2Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel2/all');
  }

  getAuthLevel3Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel3/all');
  }

  getAuthLevel4Manager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/AuthLevel4/all');
  }
  // 

}
