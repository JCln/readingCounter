import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private environment: EnvService) { }


  GET = (URL: string, base64?: string) => {
    if (base64) {
      return this.http.get(this.environment.API_URL + '/' + URL + '/' + base64).pipe(
      )
    } else {
      return this.http.get(this.environment.API_URL + '/' + URL)
      // .pipe(
      // retry(1) retry failed request up to 1
      // catchError(err => this.errorHandler.errorHandler(err))
      // )
    }
  }
  GETID = (ID: string, URL: string, base64?: string) => {
    if (base64) {
      return this.http.get(this.environment.API_URL + '/' + URL + '/' + base64 + '/' + ID);
    } else {
      return this.http.get<any>(this.environment.API_URL + '/' + URL + '/' + ID);
    }
  }
  POSTBLOB = (URL: string, body: object) => {
    return this.http.post(this.environment.API_URL + '/' + URL, body, { responseType: 'blob' as 'json' });
  }
  POSTBLOBObserve = (URL: string, body: object) => {
    return this.http.post(this.environment.API_URL + '/' + URL, body, { responseType: 'blob' as 'json', observe: 'response' });
  }
  GETBLOB = (URL: string, ID?: string) => {
    if (ID)
      return this.http.get(this.environment.API_URL + '/' + URL + '/' + ID, { responseType: 'blob' });
    else
      return this.http.get(this.environment.API_URL + '/' + URL, { responseType: 'blob' });
  }
  POST = (URL: string, ID?: number) => {
    if (ID)
      return this.http.post(this.environment.API_URL + '/' + URL + '/' + ID, '');
    else
      return this.http.post(this.environment.API_URL + '/' + URL, '');
  }
  POSTARRAY = (URL: string, arr: any[]) => {
    return this.http.post(this.environment.API_URL + '/' + URL, arr);
  }
  POSTSG = (URL: string, ID?: string) => {
    return this.http.post(this.environment.API_URL + '/' + URL + '/' + ID, '');
  }
  POSTBODY = (URL: string, body: object) => {
    return this.http.post(this.environment.API_URL + '/' + URL, body);
  }
  POSTBODYProgress = (URL: string, body: object) => {
    return this.http.post(this.environment.API_URL + '/' + URL, body, { reportProgress: true, observe: 'events' });
  }
  DELETE = (URL: string, id: number) => {
    return this.http.delete(this.environment.API_URL + '/' + URL + '/' + id);
  }
}
