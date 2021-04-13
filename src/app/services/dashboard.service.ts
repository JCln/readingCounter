import { Injectable } from '@angular/core';
import { IObjectIteratation } from 'src/app/Interfaces/ioverall-config';
import { InterfaceService } from 'src/app/services/interface.service';
import { UtilsService } from 'src/app/services/utils.service';

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

  /* CONFIGS */
  getObjectParameters = (sth: object): [] => {
    let a: any = Object.values(sth);
    return a;
  }
}
