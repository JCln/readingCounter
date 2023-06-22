import { Injectable } from '@angular/core';
import { ENDataMining } from 'interfaces/data-mining';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IMostReportInput } from 'interfaces/imanage';
import { ENSelectedColumnVariables, ISearchInOrderTo, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportReq } from 'interfaces/ireports';

import { Converter } from '../classes/converter';
import { MathS } from '../classes/math-s';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { ProfileService } from './profile.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataMiningAnalysesService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENDataMining = ENDataMining;

  dataMiningReq: IMostReportInput = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    zoneIds: null
  }
  constructor(
    public utilsService: UtilsService,
    private profileService: ProfileService,
    private interfaceManagerService: InterfaceManagerService,
    public dictionaryWrapperService: DictionaryWrapperService
  ) { }

  _isOrderByDate: boolean = false;
  /* GET*/
  getSearchInOrderTo = (): ISearchInOrderTo[] => {
    if (this.profileService.getLocalValue()) {
      this._isOrderByDate = false;
      return this.utilsService.getSearchInOrderToReverse;
    }
    else {
      this._isOrderByDate = true;
      return this.utilsService.getSearchInOrderTo;
    }
  }
  /*COLUMNS */
  receiveFromDateJalali = (variable: ENDataMining, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENDataMining, $event: string) => {
    this[variable].toDate = $event;
  }
  /*API CALLS & CALLS*/
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  postDMManager = (method: ENInterfaces, val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).subscribe((res) => {
        resolve(res)
      })
    });
  }
  /* VALIDATIONS AND VERIFICATIONS*/
  private datesValidation = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    return true;
  }
  private periodValidations = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId'))
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (dataSource.hasOwnProperty('readingPeriodId'))
      if (MathS.isNull(dataSource['readingPeriodId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    if (dataSource.hasOwnProperty('year'))
      if (MathS.isNull(dataSource['year'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    return true;
  }
  verification = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    readingReportReq.fromDate = Converter.persianToEngNumbers(readingReportReq.fromDate);
    readingReportReq.toDate = Converter.persianToEngNumbers(readingReportReq.toDate);
    return isValidateByDate ? this.datesValidation(readingReportReq) : this.periodValidations(readingReportReq)
  }


}
