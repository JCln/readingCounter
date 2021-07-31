import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAnalyzeRes } from 'interfaces/imanage';
import { IDashboardKarkardTimed, IDashboardReadDaily } from 'interfaces/inon-manage';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  /* COLUMNS */
  columnDashboardUserOverall = (): IObjectIteratation[] => {
    return [
      { field: 'all', header: 'مجموع', isSelected: true, readonly: true },
      { field: 'counterReaders', header: 'ماموران', isSelected: true, readonly: true },
      { field: 'readingSupervisors', header: 'ناظران', isSelected: true, readonly: true },
      { field: 'inactiveOrLockeds', header: 'غیرفعال/قفل', isSelected: true, readonly: false }
    ];
  }
  columnDashboards = (): IObjectIteratation[] => {
    return [
      { field: 'inDayCount', header: 'روز', isSelected: true, readonly: true },
      { field: 'inWeekCont', header: 'هفته', isSelected: true, readonly: true },
      { field: 'inMonthCount', header: 'ماه', isSelected: true, readonly: true },
      { field: 'inYearCount', header: 'سال', isSelected: true, readonly: false }
    ];
  }

  /* CALL API */
  getDashboardDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).toPromise().then(res => {
        resolve(res);
      })
    })
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
  sumOfCounts = (sth: any[]): number => {
    let sum: number = 0;
    sth.map(item => {
      sum += item
    })
    return sum;
  }
  getElementIndexes = (sth: IDashboardReadDaily[]): any[] => {
    let a = [];
    sth.forEach((item: any, index) => {
      a.push(index + 1);
    })
    return a;
  }
}
