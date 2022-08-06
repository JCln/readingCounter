import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IForbiddenManager, IMostReportInput } from 'interfaces/imanage';
import { ENRandomNumbers, ENSelectedColumnVariables, ITitleValue } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { DictionaryWrapperService } from './dictionary-wrapper.service';

export enum ENForbidden {
  forbidden = 'forbiddenReq'
}

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENForbidden = ENForbidden;
  _isCollapsedForbidden: boolean = false;

  forbiddenReq: IMostReportInput = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    zoneIds: [0]
  }

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
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getUserCounterReaderDictionary(zoneId);
  }
  receiveFromDateJalali = (variable: ENForbidden, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENForbidden, $event: string) => {
    this[variable].toDate = $event;
  }
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  routeToWOUI = (UUID: string, isForbidden: boolean) => {
    this.router.navigate([EN_Routes.wrmtrackwoui, isForbidden, UUID]);
  }
  routeToChild = () => {
    this.utilsService.routeTo(EN_Routes.wrmfbnres);
  }
  backToParent = () => {
    this.utilsService.routeTo(EN_Routes.wrmfbn);
  }
  emptyMessage = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.try_again);
  }
  /* VALIDATION */
  private datesValidationForbidden = (): boolean => {
    if (MathS.isNull(this.forbiddenReq.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(this.forbiddenReq.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(this.forbiddenReq.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }

  /* VERIFICATION */
  verificationForbidden = (forbidden: IMostReportInput) => {
    forbidden.fromDate = Converter.persianToEngNumbers(forbidden.fromDate);
    forbidden.toDate = Converter.persianToEngNumbers(forbidden.toDate);
    return this.datesValidationForbidden();
  }
  setDynamicPartRanges = (dataSource: IForbiddenManager[]) => {
    dataSource.forEach(item => {
      if (item.gisAccuracy)
        item.gisAccuracy = MathS.getRange(item.gisAccuracy)
    })
  }
  showInMapSingle = (dataSource: any) => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseFloat(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return;
    }
    this.utilsService.routeToByParams(EN_Routes.wr, {
      x: dataSource.x,
      y: dataSource.y,
      postalCode: dataSource.postalCode,
      preEshterak: dataSource.preEshterak,
      nextEshterak: dataSource.nextEshterak,
      isSingle: true,
      isForbidden: true
    });
  }

}