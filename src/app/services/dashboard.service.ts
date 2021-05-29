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
  columnDashboardTimed = (): IObjectIteratation[] => {
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
  // columnDashboardDispersalRateTimed = (): IObjectIteratation[] => {
  //   return [
  //     { field: '_8_10', header: '_8_10', isSelected: true, readonly: true },
  //     { field: '_8_10Closed', header: '_8_10Closed', isSelected: true, readonly: true },
  //     { field: '_8_10Rate', header: '_8_10Rate', isSelected: true, readonly: true },
  //     { field: '_10_12', header: '_10_12', isSelected: true, readonly: true },
  //     { field: '_10_12Closed', header: '_10_12Closed', isSelected: true, readonly: true },
  //     { field: '_10_12Rate', header: '_10_12Rate', isSelected: true, readonly: true },
  //     { field: '_12_14', header: '_12_14', isSelected: true, readonly: true },
  //     { field: '_12_14Closed', header: '_12_14Closed', isSelected: true, readonly: true },
  //     { field: '_12_14Rate', header: '_12_14Rate', isSelected: true, readonly: true },
  //     { field: '_14_16', header: '_14_16', isSelected: true, readonly: true },
  //     { field: '_14_16Closed', header: '_14_16Closed', isSelected: true, readonly: true },
  //     { field: '_14_16Rate', header: '_14_16Rate', isSelected: true, readonly: true },
  //     { field: '_16_18', header: '_16_18', isSelected: true, readonly: true },
  //     { field: '_16_18Closed', header: '_16_18Closed', isSelected: true, readonly: true },
  //     { field: '_16_18Rate', header: '_16_18Rate', isSelected: true, readonly: true },
  //     { field: 'other', header: 'other', isSelected: true, readonly: false },
  //     { field: 'otherClosed', header: 'otherClosed', isSelected: true, readonly: false },
  //     { field: 'otherRate', header: 'otherRate', isSelected: true, readonly: false },
  //     { field: 'title', header: 'عنوان', isSelected: true, readonly: false }
  //   ];
  // }
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
  getDashboardTraverseTimed = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardTraverseTimed().subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getDashboardCountInStatesTimed = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardCountInStates().subscribe(res => {
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
  getDashboardDispersalRateTimed = (): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getDashboardDispersalRateTimed().subscribe(res => {
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
