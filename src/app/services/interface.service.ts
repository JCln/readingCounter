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
  /* import Data
  /*
  also useful for get select options counter readers
  with zoneId parameter
  */
  postImportData = (body: object): Observable<any> => {
    return this.mainService.POSTBODY('V1/Import/Dynamic', body);
  }
  getUserCounterReaders = (zoneId: number): Observable<any> => {
    return this.mainService.GET(`V1/User/CounterReaders/${zoneId}`);
  }
  // 
}
