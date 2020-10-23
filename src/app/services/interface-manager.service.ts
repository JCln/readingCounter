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
  deleteRole = (id: number): Observable<any> => {
    return this.mainService.POST('Role/Remove', id);
  }
  editRole = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/Edit', body);
  }

  getCountryManager = (): Observable<any> => {
    return this.mainService.GET('V1.Test/Country/All');
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
  deleteZoneBoundManager = (id: number): Observable<any> => {
    return this.mainService.POST('Role/ZoneBound/Remove', id);
  }
  editZoneBoundManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/ZoneBound/Edit', body);
  }
  addZoneBoundManager = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('Role/ZoneBound/Add', body);
  }

}
