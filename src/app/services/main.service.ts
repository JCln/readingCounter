import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EnvService } from './env.service';
import { share } from 'rxjs/internal/operators/share';
// import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient, private environment: EnvService) { }


  GET = (URL: string) => {
    return this.http.get(this.environment.API_URL + '/' + URL)
    // .pipe(
    //   retry(1) //retry failed request up to 1
    // catchError(err => this.errorHandler.errorHandler(err))
    // )
  }
  GETID = (ID: string, URL: string) => {
    return this.http.get<any>(this.environment.API_URL + '/' + URL + '/' + ID);
  }
  GETBLOB = (URL: string) => {
    return this.http.get(this.environment.API_URL + '/' + URL, { responseType: 'blob' });
  }
  GETBLOBAsJsonObserve = (URL: string) => {
    return this.http.get(this.environment.API_URL + '/' + URL, { responseType: 'blob' as 'json', observe: 'response' });
  }
  POSTBLOB = (URL: string, body: object) => {
    return this.http.post(this.environment.API_URL + '/' + URL, body, { responseType: 'blob' as 'json' });
  }
  POSTBLOBObserve = (URL: string, body: object) => {
    return this.http.post(this.environment.API_URL + '/' + URL, body, { responseType: 'blob' as 'json', observe: 'response' });
  }
  POSTById = (URL: string, ID: number) => {
    return this.http.post(this.environment.API_URL + '/' + URL + '/' + ID, '');
  }
  POST = (URL: string) => {
    return this.http.post(this.environment.API_URL + '/' + URL, '').pipe(share());
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

}
