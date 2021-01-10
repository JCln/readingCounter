import { Injectable } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';

import { ICounterStateGridFriendlyReq } from '../Interfaces/imanage';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CounterStateService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  columnSelectedMenuDefault = () => {
    return [
      { field: 'moshtarakinId', header: 'مشترکین' },
      { field: 'title', header: 'عنوان' },
      { field: 'zoneId', header: 'ناحیه' },
      { field: 'clientOrder', header: 'ترتیب' },
      { field: 'canEnterNumber', header: 'ثبت رقم' },
      { field: 'isMane', header: 'مانع' },
      { field: 'canNumberBeLessThanPre', header: 'رقم فعلی کمتر از قبلی' },
      { field: 'isTavizi', header: 'تعویضی' },
      { field: 'shouldEnterNumber', header: 'اجبار رقم' },
      { field: 'isXarab', header: 'خراب' },
      { field: 'isFaqed', header: 'فاقد' }
    ];
  }

  gridFriendlyDefaultReq = {
    take: 20,
    skip: 0,
    sort: [],
    filter: {},
    group: [],
    aggregate: []
  }
  getGridFriendlyDataSource = (event: LazyLoadEvent): any => {
    console.log(event);
    const counterStateReq: ICounterStateGridFriendlyReq = {
      take: event.rows,
      skip: event.first,
      sort: [
        {
          field: event.sortField,
          dir: event.sortOrder === 1 ? 'asc' : 'desc'
        }
      ],
      filter: null,
      group: null,
      aggregate: null
    }
    console.log(counterStateReq);
    // this.innerLoading = true;
    // this.interfaceManagerService.postCounterStatGridFriendly(counterStateReq).subscribe(res => {
    //   if (res)
    //     console.log(res);

    //   this.dataSourceRES.data = res;
    //   this.innerLoading = false;
    // })
  }
  sendGridEventData = (event: ICounterStateGridFriendlyReq): Observable<any> => {
    return this.interfaceManagerService.postCounterStatGridFriendly(event);
  }
  getGridFriendlyDataSourceDefault = (): any => {
    return new Promise(resolve => {
      this.interfaceManagerService.postCounterStatGridFriendly(this.gridFriendlyDefaultReq).subscribe(res => {
        resolve(res);
      })
    });
  }
  getZoneDictionary = (): any => {
    return new Promise((resolve) => {
      this.interfaceManagerService.getZoneDictionaryManager().subscribe(res => {
        if (res)
          resolve(res);
      })
    });
  }


}
