import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';

import { MathS } from '../classes/math-s';
import { IAnalyzeRes, IDashboardKarkardTimed, IDashboardReadDaily } from '../interfaces/idashboard-map';
import { ColumnManager } from '../classes/column-manager';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  _selectedZone: number = 0;
  private dashboardUserAllColumns: string = 'dashboardUserAll';
  private dashboardsColumns: string = 'dashboards'

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService,
    private columnManager: ColumnManager
  ) { }

  /* COLUMNS */
  columnDashboardUserOverall = (): IObjectIteratation[] => {
    return this.columnManager.getColumnsMenus(this.dashboardUserAllColumns);
  }
  columnDashboards = (): IObjectIteratation[] => {
    return this.columnManager.getColumnsMenus(this.dashboardsColumns);
  }

  /* CALL API */
  getDashboardDataSource = async (method: ENInterfaces): Promise<any> => {
    if (MathS.isNull(this._selectedZone)) {
      return await this.ajaxReqWrapperService.getDataSource(method);
    } else {
      return await this.ajaxReqWrapperService.getDataSourceByQuote(method, '?zoneId=' + this._selectedZone);
    }
  }
  postDashboardAnalyzePerformance = async (): Promise<any> => {
    if (MathS.isNull(this._selectedZone)) {
      return await this.ajaxReqWrapperService.postDataServer(ENInterfaces.postDashboardAnalyzePerformance);
    }
    else {
      return await this.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.postDashboardAnalyzePerformance, '?zoneId=' + this._selectedZone);
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
