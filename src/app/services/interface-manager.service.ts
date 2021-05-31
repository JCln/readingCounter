import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceManagerService {

  constructor(private mainService: MainService) { }

  GET = (URL: string) => {
    return this.mainService.GET(URL);
  }
  GETByQuote = (URL: string, track: string | number | boolean) => {
    return this.mainService.GET(URL + `${track}`);
  }
  GETByQuoteTriple = (URL: string, zoneId: number, kindId: string | number) => {
    return this.mainService.GET(URL + `${zoneId}/${kindId}`);
  }
  GETBLOB = (URL: string, fileRepositoryId?: string): Observable<any> => {
    if (fileRepositoryId)
      return this.mainService.GETBLOB(URL, fileRepositoryId);
    return this.mainService.GETBLOB(URL);
  }
  GETID = (URL: string, uuid: string) => {
    return this.mainService.GETID(uuid, URL);
  }

  POST = (URL: string, id?: number) => {
    if (id)
      return this.mainService.POST(URL, id);
    return this.mainService.POST(URL);
  }
  POSTBODY = (URL: string, body: object) => {
    return this.mainService.POSTBODY(URL, body);
  }
  POSTSG = (URL: string, uuid: string) => {
    return this.mainService.POSTSG(URL, uuid);
  }
  POSTBLOB = (URL: string, body: object): any => {
    return this.mainService.POSTBLOB(URL, body);
  }

}
