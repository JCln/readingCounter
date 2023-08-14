import { InterfaceManagerService } from 'services/interface-manager.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Observable } from 'rxjs/internal/Observable';

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
  getDataSourceByQuote = (method: ENInterfaces | string, insertedInput: number | string | boolean): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, insertedInput).toPromise().then(res => {
        resolve(res)
      })
    });
  }
  getDataSourceByQuoteTriple = (method: ENInterfaces, zoneId: number, kindId: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuoteTriple(method, zoneId, kindId).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  getDataSourceById = (method: ENInterfaces, id: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(method, id).toPromise().then(res => {
        resolve(res);
      })
    })
  }
  getBlob = (method: ENInterfaces | string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(method).subscribe(res => {
        resolve(res);
      })
    });
  }
  getBlobById = (method: ENInterfaces, id: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBlobById(method, id).subscribe(res => {
        resolve(res)
      });
    })
  }


  postDataServer = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method).toPromise().then(res => {
        resolve(res);
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
  postDataSourceArray = (method: ENInterfaces, data: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTARRAYS(method, data).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postDataSourceByIdStringly = (method: ENInterfaces, UUID: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTSG(method, UUID).toPromise().then((res) => {
        resolve(res);
      })
    });
  }
  postBodyProgress = (method: ENInterfaces, body): Observable<any> => {
    return this.interfaceManagerService.POSTBODYPROGRESS(method, body);
  }
  // should check performance for all callings functions
  postDataSourceByObject = (place: ENInterfaces, object: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, object).toPromise().then((res: any) => {
        resolve(res);
      })
    });
  }
  postDataSourceStringByObject = (place: string, object: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, object).toPromise().then((res: any) => {
        resolve(true);
      })
    });
  }
  postBlob = (method: ENInterfaces, body: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOB(method, body).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postBlobObserve = (method: ENInterfaces, body: any) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBLOBOBSERVE(method, body).subscribe(res => {
        resolve(res)
      })
    })
  }
}
