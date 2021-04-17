import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITitleValue } from 'src/app/Interfaces/ioverall-config';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';
import { UtilsService } from 'src/app/services/utils.service';

import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { IReadingReportWithZoneIDsReq } from './../Interfaces/imanage';
import { DictionaryWrapperService } from './dictionary-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {
  forbiddenReq: IReadingReportWithZoneIDsReq;

  /* COLUMNS */
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
  // later  usage
  // customizeSelectedColumns = () => {
  //   return this.columnSelectedMenuDefault().filter(items => {
  //     if (items.isSelected)
  //       return items
  //   })
  // }

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private router: Router,
    private utilsService: UtilsService
  ) { }

  /* API CALL */
  getDataSource = (): Promise<any> => {
    if (!this.forbiddenReq) {
      this.emptyMessage();
      this.backToParent();
      return;
    }
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.postForbiddenByParamManager(this.forbiddenReq).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getZoneDictionary = (): Promise<any> => {
    return new Promise((resolve) => {
      resolve(this.dictionaryWrapperService.getZoneDictionary());
    });
  }
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  routeToWOUI = (UUID: string, isForbidden: boolean) => {
    this.router.navigate(['wr/m/track/woui', UUID, isForbidden]);
  }
  routeToChild = () => {
    this.utilsService.routeTo('wr/m/fbn/res');
  }
  backToParent = () => {
    this.utilsService.routeTo('wr/m/fbn');
  }
  emptyMessage = () => {
    this.utilsService.snackBarMessageWarn('یکبار دیگر مقادیر را وارد نمایید');
  }
  /* VALIDATION */
  private datesValidationForbidden = (): boolean => {
    if (this.utilsService.isNull(this.forbiddenReq.zoneId)) {
      this.utilsService.snackBarMessageWarn('ناحیه ای وارد نمایید');
      return false;
    }
    if (this.utilsService.isNull(this.forbiddenReq.fromDate)) {
      this.utilsService.snackBarMessageWarn('از تاریخ خالی است');
      return false;
    }
    if (this.utilsService.isNull(this.forbiddenReq.toDate)) {
      this.utilsService.snackBarMessageWarn('تا تاریخ خالی است');
      return false;
    }
    return true;
  }

  /* VERIFICATION */
  verificationForbidden = (forbidden: IReadingReportWithZoneIDsReq) => {
    this.forbiddenReq = forbidden;
    return this.datesValidationForbidden();
  }

}




// unUsed for now
  // gridFriendlyDefaultReq = {
  //   take: 20,
  //   skip: 0,
  //   sort: [],
  //   filter: {},
  //   group: [],
  //   aggregate: []
  // }

 // setGridFriendlyDataSource = (event: LazyLoadEvent): ICounterStateGridFriendlyReq => {
  //   console.log(event);
  //   const counterStateReq: ICounterStateGridFriendlyReq = {
  //     take: event.rows,
  //     skip: event.first,
  //     sort: [
  //       {
  //         field: event.sortField,
  //         dir: event.sortOrder === 1 ? 'asc' : 'desc'
  //       }
  //     ],
  //     filter: null,
  //     group: null,
  //     aggregate: null
  //   }
  //   console.log(counterStateReq);
  //   return counterStateReq;
  // }
  // getDataSource = (gridData: ICounterStateGridFriendlyReq): Promise<IForbiddenManagerGridFriendlyRes[]> => {
  //   try {
  //     return new Promise((resolve) => {
  //       this.interfaceManagerService.postForbiddenGridFriendlyManager(gridData).subscribe(res => {
  //         resolve(res);
  //       })
  //     })
  //   } catch (error) {
  //     console.error(e => e);
  //   }
  // }
  // getGridFriendlyDataSourceDefault = (): Promise<IForbiddenManagerGridFriendlyRes> => {
  //   return new Promise(resolve => {
  //     this.interfaceManagerService.postForbiddenGridFriendlyManager(this.gridFriendlyDefaultReq).subscribe(res => {
  //       resolve(res);
  //     })
  //   });
  // }