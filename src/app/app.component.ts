import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpinnerWrapperService } from './services/spinner-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadingRouteConfig: boolean = false;
  netConnectionStatus: boolean = true;

  constructor(
    private config: PrimeNGConfig,
    private router: Router,
    private spinnerWrapperService: SpinnerWrapperService
  ) {

    this.router.events.subscribe(event => {
      this.createOnline$().subscribe(isOnline => {
        if (isOnline) {
          this.netConnectionStatus = true;

          if (event instanceof RouteConfigLoadStart) {
            this.spinnerWrapperService.startLoading();
          } else if (event instanceof RouteConfigLoadEnd) {
            this.spinnerWrapperService.stopLoading();
          }
        }
        else
          this.netConnectionStatus = false;
      });
    });
  }

  setTraslateToPrimeNgTable = () => {
    this.config.setTranslation({
      'accept': 'تایید',
      'reject': 'بازگشت',
      'startsWith': ' شروع با',
      'contains': 'شامل باشد',
      'notContains': ' شامل نباشد',
      'endsWith': ' پایان با',
      'equals': 'برابر',
      'notEquals': 'نا برابر',
      'lt': ' کمتر از',
      'lte': 'کمتر یا برابر',
      'gt': 'بزرگتر',
      'gte': 'بزرگتر یا برابر',
      'is': 'باشد',
      'isNot': 'نباشد',
      'before': 'قبل',
      'after': 'بعد',
      'clear': 'پاک کردن',
      'apply': 'تایید',
      'matchAll': 'مطابقت با همه',
      'matchAny': ' مطابقت',
      'addRule': 'جستجو براساس',
      'removeRule': 'حذف جستجو',
      'choose': ' انتخاب',
      'upload': 'ارسال',
      'cancel': 'بازگشت'
    });
  }
  ngOnInit(): void {
    this.setTraslateToPrimeNgTable();
  }
  createOnline$() {
    return merge<any>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
