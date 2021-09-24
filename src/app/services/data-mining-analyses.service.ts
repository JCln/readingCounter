import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSelectedColumnVariables, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class DataMiningAnalysesService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
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
  verification = () => {

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
