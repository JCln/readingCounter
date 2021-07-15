import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IImportDataResponse, IImportDynamicDefault, IImportSimafaReadingProgramsReq } from 'interfaces/inon-manage';
import { IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { ConfirmDialogComponent } from '../frame-work/import-data/import-dynamic/confirm-dialog/confirm-dialog.component';
import { Converter } from './../classes/converter';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  importDynamicValue: IImportDynamicDefault;
  _simafaReadingProgram: IObjectIteratation[] = [
    { field: 'zoneId', header: 'ناحیه', isSelected: false, isSelectOption: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: false, isNumber: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: false, isNumber: true },
    { field: 'listNumber', header: 'ش لیست', isSelected: false },
    { field: 'year', header: 'سال', isSelected: false, isNumber: true },
    { field: 'readingPeriodId', header: 'دوره قرائت', isSelected: false, isSelectOption: true },
  ]

  constructor(
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }
  columnSimafaReadingProgram = (): IObjectIteratation[] => {
    return this._simafaReadingProgram;
  }
  persentCheck = (val: number): boolean => {
    return this.utilsService.persentCheck(val);
  }
  persentOfalalHesab = (): boolean => {
    if (this.persentCheck(this.importDynamicValue.alalHesabPercent))
      return true;
    return false;
  }
  persentOfImage = (): boolean => {
    if (this.persentCheck(this.importDynamicValue.imagePercent))
      return true;
    return false;
  }
  validationOnNull = (val: any): boolean => {
    if (this.utilsService.isNull(val))
      return false;
    return true;
  }
  private NANValidation = (sth: string, message?: string): boolean => {
    if (this.utilsService.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }

  checkVertification = (val: IImportDynamicDefault, _isOrderByDate: boolean): boolean => {
    this.importDynamicValue = val;
    if (!this.utilsService.isSameLength(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_from_esterak))
      return false;
    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_to_esterak))
      return false;

    if (!this.utilsService.lengthControl(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    if (!this.utilsService.isFromLowerThanToByString(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.lessThan_eshterak);
      return false;
    }
    if (!this.persentOfImage()) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (!this.persentOfalalHesab()) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (!_isOrderByDate) {
      if (!this.validationOnNull(val.readingPeriodId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_reading_time);
        return false;
      }
    }
    if (!this.validationOnNull(this.importDynamicValue.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    return true;
  }
  checkSimafaVertification = (val: IImportSimafaReadingProgramsReq): boolean => {
    if (this.utilsService.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (this.utilsService.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (this.utilsService.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (this.utilsService.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_number);
      return false;
    }
    if (this.utilsService.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_number);
      return false;
    }
    if (this.utilsService.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_number);
      return false;
    }

    return true;
  }
  validationInvalid = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.thereis_no_reader);
      return false;
    }
    return true;
  }
  validationReadingPeriod = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.not_found_period);
      return false;
    }
    return true;
  }
  validationReadingConfigDefault = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.thereis_no_default);
      return false;
    }
    return true;
  }
  validationPeriodKind = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.thereis_no_type);
      return false;
    }
    return true;
  }
  validationZoneDictionary = (val: any): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(EN_messages.not_found_zoneId);
      return false;
    }
    return true;
  }
  showResDialog = (res: IImportDataResponse) => {
    return new Promise(resolve => {
      this.dialog.open(ConfirmDialogComponent, {
        minWidth: '19rem',
        data: res
      })
    })
  }

  /*API CALLS */
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getReadingPeriodsKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getReadingPeriod = (zoneId: number, kindId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuoteTriple(ENInterfaces.readingPeriodDictionaryByZoneIdAndKindId, zoneId, kindId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getReadingConfigDefaults = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.readingConfigDefaultByZoneId, zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch {
      console.error(e => e);
    }
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).subscribe(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(e => e);
    }
  }
  postImportDynamicData = (importDynamic: IImportDynamicDefault): Promise<any> => {
    importDynamic.fromDate = Converter.persianToEngNumbers(importDynamic.fromDate);
    importDynamic.toDate = Converter.persianToEngNumbers(importDynamic.toDate);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.postImportData, importDynamic).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postImportSimafa = (method: ENInterfaces, body: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
}
