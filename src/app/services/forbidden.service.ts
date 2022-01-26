import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IForbiddenManager, IMostReportInput } from 'interfaces/imanage';
import { ENRandomNumbers, ENSelectedColumnVariables, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
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

  forbiddenReq: IMostReportInput = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400,
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
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).toPromise().then(res =>
        resolve(res))
    });
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
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  setColumnsChanges = (variableName: string, newValues: IObjectIteratation[]) => {
    // convert all items to false
    this[variableName].forEach(old => {
      old.isSelected = false;
    })

    // merge new values
    this[variableName].find(old => {
      newValues.find(newVals => {
        if (newVals.field == old.field)
          old.isSelected = true;
      })
    })
  }
  showInMapSingle = (dataSource: any) => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseFloat(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return;
    }
    this.utilsService.routeToByParams('/wr', {
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