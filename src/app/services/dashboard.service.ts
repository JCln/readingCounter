import { Injectable } from '@angular/core';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { InterfaceService } from 'src/app/services/interface.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IDashboardKarkardTimed, IDashboardReadDaily } from '../Interfaces/inon-manage';
import { IAnalyzeRes } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private interfaceService: InterfaceService,
    private utilsService: UtilsService
  ) { }

  /* COLUMNS */
  columnDashboardForbidden = (): IObjectIteratation[] => {
    return [
      { field: 'inDayCount', header: 'روز', isSelected: true, readonly: true },
      { field: 'inWeekCont', header: 'هفته', isSelected: true, readonly: true },
      { field: 'inMonthCount', header: 'ماه', isSelected: true, readonly: true },
      { field: 'inYearCount', header: 'سال', isSelected: true, readonly: false }
    ];
  }

  columnDashboardMedia = (): IObjectIteratation[] => {
    return [
      { field: 'inDayCount', header: 'روز', isSelected: true, readonly: true },
      { field: 'inWeekCont', header: 'هفته', isSelected: true, readonly: true },
      { field: 'inMonthCount', header: 'ماه', isSelected: true, readonly: true },
      { field: 'inYearCount', header: 'سال', isSelected: true, readonly: false }
    ];
  }

  /* CALL API */
  getDashboardKarkard = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardKarkardTimed().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getDashboardForbidden = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardForbiddenTimed().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getDashboardMedia = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardMediaTimed().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getDashboardReadDaily = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardReadDaily().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  postDashboardAnalyzePerformance = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.postDashboardAnalyzePerformance().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }

  /* CONFIGS */
  getObjectParameters = (sth: IDashboardKarkardTimed): any[] => {
    let b = [];
    b.push(sth.adiCount);
    b.push(sth.faqedCount);
    b.push(sth.maneCount);
    b.push(sth.saierCount);
    b.push(sth.tavizCount);
    b.push(sth.xarabCount);
    return b;
    // let a: any = Object.values(sth);
    // return a;
  }
  getElementOfArrOfObjectsAnalyze = (item: IAnalyzeRes): any[] => {
    let a = [];
    a.push(item.min);
    a.push(item.max);
    a.push(item.average);
    // a.push(item.variance);
    a.push(item.standardDeviation);
    a.push(item.median);
    a.push(item.mode);

    return a;
  }
  getElementOfArrOfObjects = (sth: IDashboardReadDaily[]): any[] => {
    let a = [];
    sth.forEach((item: IDashboardReadDaily) => {
      a.push(item.count, item.hint, item.period);
    })
    // a.push({ label: [item.hint, item.period] })
    // console.log(a);

    return a;
  }
}
