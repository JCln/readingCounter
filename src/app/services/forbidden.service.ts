import { VerificationService } from './verification.service';
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
    public utilsService: UtilsService,
    public verificationService: VerificationService
  ) { }

  verificationForbidden = (forbidden: IMostReportInput) => {
    if (MathS.isNull(forbidden.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(forbidden.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    return true;
  }
  setDynamicPartRanges = (dataSource: IForbiddenManager[]) => {
    dataSource.forEach(item => {
      if (item.gisAccuracy)
        item.gisAccuracy = MathS.getFormatRange(item.gisAccuracy)
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
      zoneTitle: dataSource.changableZoneId,
      insertDateJalali: dataSource.insertDateJalali,
      displayName: dataSource.displayName,
      description: dataSource.description,
      postalCode: dataSource.postalCode,
      gisAccuracy: dataSource.gisAccuracy,
      tedadVahed: dataSource.tedadVahed,
      preEshterak: dataSource.preEshterak,
      nextEshterak: dataSource.nextEshterak,
      isSingle: true,
      isForbidden: true
    });
  }

}