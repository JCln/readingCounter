import { Injectable } from '@angular/core';
import { ENDataMining } from 'interfaces/data-mining';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IMostReportInput, IReadingReportReq } from 'interfaces/imanage';
import { ENSelectedColumnVariables, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';

import { Converter } from '../classes/converter';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
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
    year: 1400,
    zoneIds: null
  }
  private _DMAnalyses: IObjectIteratation[] = [
    { field: 'counterReader', header: 'مامور', isSelected: true, readonly: true },
    { field: 'overalCount', header: 'تعداد قرائت شده', isSelected: true, readonly: true },
    { field: 'maxBetweenTwoMinute', header: 'حداکثر زمان بین دو', isSelected: true, readonly: true },
    { field: 'minBetweenTwoMinute', header: 'حداقل زمان بین دو', isSelected: true, readonly: true },
    { field: 'averageBetweenTwoMinute', header: 'میانگین زمان بین دو', isSelected: true, readonly: true },
    { field: 'countSameTime', header: 'تعداد دریافت همزمان', isSelected: true, readonly: true },
    { field: 'closedCount', header: 'تعداد بسته', isSelected: true, readonly: true },
    { field: 'closedPercent', header: 'درصد بسته', isSelected: true, readonly: true },
  ]

  constructor(
    private utilsService: UtilsService,
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  /*COLUMNS */
  columnDataMiningAnalyses = (): IObjectIteratation[] => {
    return this._DMAnalyses;
  }
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
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  postDMManager = (method: ENInterfaces, val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).subscribe((res) => {
        resolve(res)
      })
    });
  }
  /* VALIDATIONS AND VERIFICATIONS*/
  private datesValidation = (value: object): boolean => {
    if (value.hasOwnProperty('zoneId')) {
      if (this.utilsService.isNull(value['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (value.hasOwnProperty('fromDate')) {
      if (this.utilsService.isNull(value['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (value.hasOwnProperty('toDate')) {
      if (this.utilsService.isNull(value['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    return true;
  }
  private periodValidations = (value: object): boolean => {
    if (value.hasOwnProperty('zoneId'))
      if (this.utilsService.isNull(value['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (value.hasOwnProperty('readingPeriodId'))
      if (this.utilsService.isNull(value['readingPeriodId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    if (value.hasOwnProperty('year'))
      if (this.utilsService.isNull(value['year'])) {
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

}
