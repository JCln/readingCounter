import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


  GET = (ID: string, URL: string, base64?: string) => {
  }

  POST = (URL: string, body?: object): any => {
  }

  PUT = (URL: string, body: object): any => {
  }
}
