import { Injectable } from '@angular/core';
import { ENRandomNumbers, ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { IForbiddenManager, IMostReportInput } from 'interfaces/imanage';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { EN_Routes } from 'interfaces/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService
  ) { }

  /* VALIDATION */
  private datesValidationForbidden = (data: IMostReportInput): boolean => {
    if (MathS.isNull(data.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(data.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }

  /* VERIFICATION */
  verificationForbidden = (forbidden: IMostReportInput) => {
    forbidden.fromDate = Converter.persianToEngNumbers(forbidden.fromDate);
    forbidden.toDate = Converter.persianToEngNumbers(forbidden.toDate);
    return this.datesValidationForbidden(forbidden);
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
      zoneId: dataSource.zoneId,
      insertDateJalali: dataSource.insertDateJalali,
      displayName: dataSource.displayName,
      description: dataSource.description,
      postalCode: dataSource.postalCode,
      isSingle: true,
      isForbidden: true
    });
  }

}