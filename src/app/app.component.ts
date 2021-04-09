import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private config: PrimeNGConfig
  ) { }

  ngOnInit(): void {
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
}
