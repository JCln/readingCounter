import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor(private mainService: MainService) { }

  // policy manager 
  getPolicies = (hasRow: boolean): Observable<any> => {
    return this.mainService.GET('V1.Test/Policy/Active/' + `${hasRow}`);
  }
  editPolicies = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1.Test/Policy/Edit', body);
  }
  addPolicies = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1.Test/Policy/Add', body);
  }
  // 
  // get sidebar ////
  getSideBar = (): Observable<any> => {
    return this.mainService.GET('V1/User/SideBar');
  }
  /*
  import Data  
  */
  postImportData = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Import/Dynamic', body);
  }

  // 
  // change password
  changePassword = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Account/ChangePassword', body);
  }
  // my info profile
  getMyProfile = (): Observable<any> => {
    return this.mainService.GET('V1/Account/MyInfo');
  }
  // 
  /* DASHBOARD */

  getDashboardKarkardTimed = (): Observable<any> => {
    return this.mainService.GET('V1/List/Dashboard/Karkard/Timed');
  }
  getDashboardMediaTimed = (): Observable<any> => {
    return this.mainService.GET('V1/List/Dashboard/Media/Timed');
  }
  getDashboardForbiddenTimed = (): Observable<any> => {
    return this.mainService.GET('V1/Forbidden/Dashboard/Timed');
  }
  getDashboardReadDaily = (): Observable<any> => {
    return this.mainService.GET('V1/List/Dashboard/Read/Daily');
  }

}
