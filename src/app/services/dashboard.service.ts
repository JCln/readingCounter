import { Injectable } from '@angular/core';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { InterfaceService } from 'src/app/services/interface.service';

import { IDashboardKarkardTimed, IDashboardReadDaily } from '../Interfaces/inon-manage';
import { IAnalyzeRes } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private interfaceService: InterfaceService    
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
  columnDashboardRead = (): IObjectIteratation[] => {
    return [
      { field: 'inDayCount', header: 'روز', isSelected: true, readonly: true },
      { field: 'inWeekCont', header: 'هفته', isSelected: true, readonly: true },
      { field: 'inMonthCount', header: 'ماه', isSelected: true, readonly: true },
      { field: 'inYearCount', header: 'سال', isSelected: true, readonly: false }
    ];
  }
  columnDashboardReadingReportTimed = (): IObjectIteratation[] => {
    return [
      { field: 'inDayCount', header: 'روز', isSelected: true, readonly: true },
      { field: 'inWeekCont', header: 'هفته', isSelected: true, readonly: true },
      { field: 'inMonthCount', header: 'ماه', isSelected: true, readonly: true },
      { field: 'inYearCount', header: 'سال', isSelected: true, readonly: false }
    ];
  }
  columnDashboardReadTimed = (): IObjectIteratation[] => {
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
  getDashboardReadingReport = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardReadingReportTimed().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getDashboardReadTimed = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardReadTimed().subscribe(res => {
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
    b.push(sth.xarabCount);
    b.push(sth.tavizCount);
    b.push(sth.saierCount);
    return b;
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
  getElementOfArrOfObjects = (sth: IDashboardReadDaily[], parameterName: string): any[] => {
    let a = [];
    sth.forEach((item: IDashboardReadDaily) => {
      a.push(item[parameterName]);
    })
    return a;
  }
  getElementIndexes = (sth: IDashboardReadDaily[]): any[] => {
    let a = [];
    sth.forEach((item: any, index) => {
      a.push(index + 1);
    })
    return a;
  }
}
