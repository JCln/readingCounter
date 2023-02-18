import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IForbiddenManager, IMostReportInput } from 'interfaces/imanage';
import { ENRandomNumbers, ENSelectedColumnVariables } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { EN_Routes } from '../interfaces/routes.enum';
import { DictionaryWrapperService } from './dictionary-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
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
    private utilsService: UtilsService
  ) { }

  /* API CALL */
  getDataSource = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.forbidden, this.forbiddenReq).subscribe(res => {
        resolve(res);
      })
    })
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  receiveFromDateJalali = ($event: string) => {
    this.forbiddenReq.fromDate = $event;
  }
  receiveToDateJalali = ($event: string) => {
    this.forbiddenReq.toDate = $event;
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