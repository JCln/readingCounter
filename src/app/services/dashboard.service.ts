import { Injectable } from '@angular/core';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IDashboardKarkardTimed, IDashboardReadDaily } from '../Interfaces/inon-manage';
import { IAnalyzeRes } from './../Interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
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
        this.interfaceManagerService.GET(ENInterfaces.getDashboardKarkardTimed).subscribe(res => {
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
        this.interfaceManagerService.GET(ENInterfaces.getDashboardMediaTimed).subscribe(res => {
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
        this.interfaceManagerService.GET(ENInterfaces.getDashboardReadingReportTimed).subscribe(res => {
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
        this.interfaceManagerService.GET(ENInterfaces.getDashboardReadTimed).subscribe(res => {
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
        this.interfaceManagerService.GET(ENInterfaces.getDashboardForbiddenTimed).subscribe(res => {
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
        this.interfaceManagerService.GET(ENInterfaces.getDashboardReadDaily).subscribe(res => {
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
        this.interfaceManagerService.POST(ENInterfaces.postDashboardAnalyzePerformance).subscribe(res => {
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
    a.push(item.min.toFixed(3));
    a.push(item.max.toFixed(3));
    a.push(item.average.toFixed(3));
    // a.push(item.variance);
    a.push(item.standardDeviation.toFixed(3));
    a.push(item.median.toFixed(3));
    a.push(item.mode.toFixed(3));

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
