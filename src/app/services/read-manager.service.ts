import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSelectedColumnVariables, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';

import { ColumnManager } from '../classes/column-manager';
import { MathS } from '../classes/math-s';
import { ICounterState, IImageAttribution, ITextOutput } from '../interfaces/ireads-manager';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { InterfaceManagerService } from './interface-manager.service';
import { SectionsService } from './sections.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReadManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private sectionsService: SectionsService,
    private utilsService: UtilsService,
    private columnManager: ColumnManager
  ) { }

  columnSelectedMenuDefault = (): IObjectIteratation[] => {
    return this.columnManager.columnSelectedMenus('counterStateDto');
  }
  /* API CALLS */
  getProvinceDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getProvinceDictionary();
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getImageAttrAllDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getImageAttrAllDictionary();
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).subscribe(res => {
        resolve(res);
      })
    })
  }
  postTextOutputDATA = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  /* VERIFICATION & VALIDATION */
  counterStateVertification = (dataSource: ICounterState): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNullZero(dataSource.moshtarakinId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_moshtarakinId);
      return false;
    }
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }

    if (MathS.isNaN(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(dataSource.clientOrder)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(dataSource.moshtarakinId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    return true;
  }
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }
  verificationImageAttribution = (dataSource: IImageAttribution): boolean => {
    if (MathS.isNull(dataSource.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    return true;
  }
  verificationCounterState = (dataSource: ICounterState): boolean => {
    if (!this.counterStateVertification(dataSource))
      return false;
    return true;
  }
  verificationTextOutputEditedRow = (dataSource: ITextOutput): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    if (!this.sectionsService.verfificationIsNaN())
      return false;
    return true;
  }
  /* OTHER */
  addOrEditAuths = (place: ENInterfaces, result: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, result).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    });
  }
  firstConfirmDialog = (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  deleteSingleRow = (place: ENInterfaces, id: number) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTById(place, id).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  deleteSingleRowByObject = (place: ENInterfaces, object: object) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(place, object).subscribe((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(true);
      })
    });
  }
  customizeSelectedColumns = (_selectCols: any[]) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

}
