import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagerService {

  constructor(private mainService: MainService) { }

  GET = (URL: string): Observable<any> => {
    return this.mainService.GET(URL);
  }
  GETByQuote = (URL: string, track: string | number | boolean): Observable<any> => {
    return this.mainService.GET(URL + `${track}`);
  }
  GETByQuoteTriple = (URL: string, zoneId: number, kindId: string | number): Observable<any> => {
    return this.mainService.GET(URL + `${zoneId}/${kindId}`);
  }
  GETBLOB = (URL: string, fileRepositoryId?: string): Observable<any> => {
    if (fileRepositoryId)
      return this.mainService.GETBLOB(URL, fileRepositoryId);
    return this.mainService.GETBLOB(URL);
  }
  GETID = (URL: string, uuid: string): Observable<any> => {
    return this.mainService.GETID(uuid, URL);
  }

  POST = (URL: string, id?: number): Observable<any> => {
    if (id)
      return this.mainService.POST(URL, id);
    return this.mainService.POST(URL);
  }
  POSTBODY = (URL: string, body: object): Observable<any> => {
    return this.mainService.POSTBODY(URL, body);
  }
  POSTSG = (URL: string, uuid: string): Observable<any> => {
    return this.mainService.POSTSG(URL, uuid);
  }
  POSTBLOB = (URL: string, body: object): any => {
    return this.mainService.POSTBLOB(URL, body);
  }

}
