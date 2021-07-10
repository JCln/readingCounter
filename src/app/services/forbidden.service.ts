import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IForbiddenManager, IReadingReportWithZoneIDsReq } from 'interfaces/imanage';
import { IDictionaryManager, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';

import { ConverterService } from './converter.service';
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
    private utilsService: UtilsService,
    private converterService: ConverterService
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
        this.interfaceManagerService.POSTBODY(ENInterfaces.forbidden, this.forbiddenReq).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
    }
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  routeToWOUI = (UUID: string, isForbidden: boolean) => {
    this.router.navigate(['wr/m/track/woui', isForbidden, UUID]);
  }
  routeToChild = () => {
    this.utilsService.routeTo('wr/m/fbn/res');
  }
  backToParent = () => {
    this.utilsService.routeTo('wr/m/fbn');
  }
  emptyMessage = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.try_again);
  }
  /* VALIDATION */
  private datesValidationForbidden = (): boolean => {
    if (this.utilsService.isNull(this.forbiddenReq.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (this.utilsService.isNull(this.forbiddenReq.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (this.utilsService.isNull(this.forbiddenReq.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }

  /* VERIFICATION */
  verificationForbidden = (forbidden: IReadingReportWithZoneIDsReq) => {
    this.forbiddenReq = forbidden;
    return this.datesValidationForbidden();
  }
  convertIdToTitle = (dataSource: any, dictionary: IDictionaryManager[], toConvert: string) => {
    this.converterService.convertIdToTitle(dataSource, dictionary, toConvert);
  }

  setDynamicPartRanges = (dataSource: IForbiddenManager[]) => {
    dataSource.forEach(item => {
      if (item.gisAccuracy)
        item.gisAccuracy = this.utilsService.getRange(item.gisAccuracy)
    })
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

}