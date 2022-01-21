import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { MathS } from '../classes/math-s';
import { IAnalyzeRes, IDashboardKarkardTimed, IDashboardReadDaily } from '../Interfaces/idashboard-map';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  _selectedZone: number = 0;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
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
      { field: 'inDayCount', header: 'امروز', isSelected: true, readonly: true },
      { field: 'inWeekCount', header: 'هفته‌جاری', isSelected: true, readonly: true },
      { field: 'inMonthCount', header: 'ماه‌جاری', isSelected: true, readonly: true },
      { field: 'inYearCount', header: 'سال‌جاری', isSelected: true, readonly: false }
    ];
  }

  /* CALL API */
  getDashboardDataSource = (method: ENInterfaces): Promise<any> => {
    if (MathS.isNull(this._selectedZone)) {

      return new Promise((resolve) => {
        this.interfaceManagerService.GET(method).toPromise().then(res => {
          resolve(res);
        })
      })
    } else {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(method, '?zoneId=' + this._selectedZone).toPromise().then(res => {
          resolve(res);
        })
      })
    }
  }
  postDashboardAnalyzePerformance = (): Promise<any> => {
    if (MathS.isNull(this._selectedZone)) {

      return new Promise((resolve) => {
        this.interfaceManagerService.POST(ENInterfaces.postDashboardAnalyzePerformance).subscribe(res => {
          resolve(res);
        })
      })
    }
    else {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.postDashboardAnalyzePerformance, '?zoneId=' + this._selectedZone).toPromise().then(res => {
          resolve(res);
        })
      })
    }
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
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
  isNullVals = (dataSource: any) => {
    return !MathS.isNull(dataSource);
  }
}
