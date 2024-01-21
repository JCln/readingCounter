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
  GETBlobById = (URL: string, fileRepositoryId: string): Observable<any> => {
    return this.mainService.GETBLOB(URL + '/' + fileRepositoryId);
  }
  GETBlobByIdAsJson = (URL: string, fileRepositoryId: string): Observable<any> => {
    return this.mainService.GETBLOBAsJson(URL + '/' + fileRepositoryId);
  }
  GETBLOB = (URL: string): Observable<any> => {
    return this.mainService.GETBLOB(URL);
  }
  GETID = (URL: string, uuid: string): Observable<any> => {
    return this.mainService.GETID(uuid, URL);
  }

  POSTById = (URL: string, id: number) => {
    return this.mainService.POSTById(URL, id);
  }
  POST = (URL: string) => {
    return this.mainService.POST(URL);
  }
  POSTARRAYS = (URL: string, arr: any[]) => {
    return this.mainService.POSTARRAY(URL, arr);
  }
  POSTBODY = (URL: string, body: object) => {
    return this.mainService.POSTBODY(URL, body);
  }
  POSTBODYPROGRESS = (URL: string, body: object): Observable<any> => {
    return this.mainService.POSTBODYProgress(URL, body);
  }
  POSTSG = (URL: string, uuid: string) => {
    return this.mainService.POSTSG(URL, uuid);
  }
  POSTBLOB = (URL: string, body: object): Observable<any> => {
    return this.mainService.POSTBLOB(URL, body);
  }
  POSTBLOBOBSERVE = (URL: string, body: object): Observable<any> => {
    return this.mainService.POSTBLOBObserve(URL, body);
  }
}
