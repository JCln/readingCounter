import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ICounterStateGridFriendlyReq } from 'interfaces/imanage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs/internal/Observable';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class CounterStateService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  columnSelectedMenuDefault = (): IObjectIteratation[] => {
    return [
      { field: 'moshtarakinId', header: 'کد مشترکین', isSelected: false },
      { field: 'title', header: 'عنوان', isSelected: true },
      { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
      { field: 'clientOrder', header: 'ترتیب', isSelected: false },
      { field: 'canEnterNumber', header: 'ثبت رقم', isSelected: true, isBoolean: true },
      { field: 'isMane', header: 'مانع', isSelected: true, isBoolean: true },
      { field: 'canNumberBeLessThanPre', header: 'رقم فعلی کمتر از قبلی', isSelected: false, isBoolean: true },
      { field: 'isTavizi', header: 'تعویضی', isSelected: true, isBoolean: true },
      { field: 'shouldEnterNumber', header: 'اجبار رقم', isSelected: true, isBoolean: true },
      { field: 'isXarab', header: 'خراب', isSelected: true, isBoolean: true },
      { field: 'isFaqed', header: 'فاقد', isSelected: true, isBoolean: true }
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
      filter:
      {
        logic: 'or',
        filters: [
          {
            logic: 'or',
            filters: [
              {
                field: 'Title',
                operator: event.filters['title'].matchMode,
                value: event.filters['title'].value
              },
              {
                field: 'isFaqed',
                operator: event.filters['isFaqed'].matchMode,
                value: event.filters['isFaqed'].value
              },
              {
                field: 'shouldEnterNumber',
                operator: event.filters['shouldEnterNumber'].matchMode,
                value: event.filters['shouldEnterNumber'].value
              },
              {
                field: 'isTavizi',
                operator: event.filters['isTavizi'].matchMode,
                value: event.filters['isTavizi'].value
              },
              {
                field: 'isMane',
                operator: event.filters['isMane'].matchMode,
                value: event.filters['isMane'].value
              },
              {
                field: 'canEnterNumber',
                operator: event.filters['canEnterNumber'].matchMode,
                value: event.filters['canEnterNumber'].value
              },
              {
                field: 'clientOrder',
                operator: event.filters['clientOrder'].matchMode,
                value: event.filters['clientOrder'].value
              },
              {
                field: 'zoneId',
                operator: event.filters['zoneId'].matchMode,
                value: event.filters['zoneId'].value
              },
              {
                field: 'moshtarakinId',
                operator: event.filters['moshtarakinId'].matchMode,
                value: event.filters['moshtarakinId'].value
              }
            ]
          }
        ]
      },

      group: null,
      aggregate: null
    }
    this.interfaceManagerService.POSTBODY(ENInterfaces.counterStateGridFriendly, counterStateReq).subscribe(res => {
      if (res)
        console.log(res);

      // this.dataSourceRES.data = res;
      // this.innerLoading = false;
    })
  }
  sendGridEventData = (event: ICounterStateGridFriendlyReq): Observable<any> => {
    return this.interfaceManagerService.POSTBODY(ENInterfaces.counterStateGridFriendly, event);
  }
  getGridFriendlyDataSourceDefault = (): any => {
    return new Promise(resolve => {
      this.interfaceManagerService.GET(ENInterfaces.counterStateAll).subscribe(res => {
        resolve(res);
      })
    });
  }
  getZoneDictionary = (): any => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }

}
