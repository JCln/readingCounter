import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    )
  };
  constructor(private http: HttpClient) { }


  GET = (URL: string, base64?: string) => {
    if (base64) {
      this.http.get(environment.API_URL + '/' + URL + '/' + base64, this.httpOptions).pipe(
        retry(1)
      )
    } else {
      return this.http.get<any>(environment.API_URL + '/' + URL, this.httpOptions).pipe(
        retry(1), // retry failed request up to 1
        // catchError(err => this.errorHandler.errorHandler(err))
      )
    }


  }

  GETID = (ID: string, URL: string, base64?: string) => {
    if (base64) {
      this.http.get(environment.API_URL + '/' + URL + '/' + base64 + '/' + ID, this.httpOptions).pipe(
        retry(1)
      )
    } else {
      return this.http.get<any>(environment.API_URL + '/' + URL + '/' + ID, this.httpOptions).pipe(
        retry(1), // retry failed request up to 1
        // catchError(err => this.errorHandler.errorHandler(err))
      )
    }


  }


  POST = (URL: string, body?: object): any => {
  }

  PUT = (URL: string, body: object): any => {
  }
}
