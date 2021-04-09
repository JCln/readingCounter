import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { ICounterStateGridFriendlyReq, IForbiddenManagerGridFriendlyRes } from '../Interfaces/imanage';
import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { DictionaryWrapperService } from './dictionary-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {

  columnSelectedMenuDefault = (): IObjectIteratation[] => {
    return [
      { field: 'zoneId', header: 'ناحیه', isSelected: true },
      { field: 'preEshterak', header: 'اشتراک قبلی', isSelected: true },
      { field: 'nextEshterak', header: 'اشتراک بعدی', isSelected: true },
      { field: 'insertDateJalali', header: 'تاریخ', isSelected: true },
      { field: 'insertTime', header: 'زمان ثبت', isSelected: true },
      { field: 'tedadVahed', header: 'تعداد واحد', isSelected: true },
      { field: 'imageCount', header: 'تعداد تصاویر', isSelected: false },
      { field: 'postalCode', header: 'کد پستی', isSelected: true },
      // { field: 'userId', header: 'کاربری', isSelected: false },
      // { field: 'x', header: 'X', isSelected: false },
      // { field: 'y', header: 'Y', isSelected: false },
      { field: 'gisAccuracy', header: 'دقت مکان یابی', isSelected: false }
    ];
  }
  customizeSelectedColumns = () => {
    return this.columnSelectedMenuDefault().filter(items => {
      if (items.isSelected)
        return items
    })
  }
  gridFriendlyDefaultReq = {
    take: 20,
    skip: 0,
    sort: [],
    filter: {},
    group: [],
    aggregate: []
  }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private router: Router
  ) { }

  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }
  setGridFriendlyDataSource = (event: LazyLoadEvent): ICounterStateGridFriendlyReq => {
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
    return counterStateReq;
  }
  getDataSource = (gridData: ICounterStateGridFriendlyReq): Promise<IForbiddenManagerGridFriendlyRes[]> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postForbiddenGridFriendlyManager(gridData).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getGridFriendlyDataSourceDefault = (): Promise<IForbiddenManagerGridFriendlyRes> => {
    return new Promise(resolve => {
      this.interfaceManagerService.postForbiddenGridFriendlyManager(this.gridFriendlyDefaultReq).subscribe(res => {
        resolve(res);
      })
    });
  }
  routeToWOUI = (UUID: string, isForbidden: boolean) => {
    this.router.navigate(['wr/m/track/woui', UUID, isForbidden]);
  }

}