import { Component, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { SpinnerWrapperService } from './services/spinner-wrapper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadingRouteConfig: boolean = false;

  constructor(
    private config: PrimeNGConfig,
    private router: Router,
    private spinnerWrapperService: SpinnerWrapperService
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.spinnerWrapperService.startLoading();
      } else if (event instanceof RouteConfigLoadEnd) {
        this.spinnerWrapperService.stopLoading();
      }
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
}
