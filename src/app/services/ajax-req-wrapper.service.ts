import { InterfaceManagerService } from 'services/interface-manager.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Injectable({
  providedIn: 'root'
})
export class AjaxReqWrapperService {

  constructor(
    public interfaceManagerService: InterfaceManagerService
  ) { }

  getDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).toPromise().then((res) => {
        resolve(res)
      })
    });
  }
  getDataSourceByQuote = (method: ENInterfaces, insertedInput: number | string | boolean): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, insertedInput).toPromise().then(res => {
        resolve(res)
      })
    });
  }
  postDataSourceById = (place: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTById(place, id).toPromise().then((res: any) => {
        resolve(res);
      })
    });
  }
  // should check performance for all callings functions
  postDataSourceByObject = (place: ENInterfaces, object: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, object).toPromise().then((res: any) => {
        resolve(res);
      })
    });
  }

}
