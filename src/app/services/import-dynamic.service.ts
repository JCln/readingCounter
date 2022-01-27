import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IAssessAddDtoSimafa, IAssessPreDisplayDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import {
  ENImportDatas,
  IImportDataResponse,
  IImportDynamicDefault,
  IImportSimafaBatchReq,
  IImportSimafaReadingProgramsReq,
  IImportSimafaSingleReq,
  IReadingProgramRes,
} from 'interfaces/import-data';
import { ENSelectedColumnVariables, IMasrafStates, IObjectIteratation, ITitleValue } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { MathS } from '../classes/math-s';
import { ConfirmDialogComponent } from '../frame-work/import-data/import-dynamic/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { Converter } from './../classes/converter';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  importDynamicValue: IImportDynamicDefault;
  ENImportDatas = ENImportDatas;

  simafaRDPGReq: IImportSimafaReadingProgramsReq = {
    zoneId: 0,
    readingPeriodId: 0,
    year: 1400
  }
  _assessAddReq: IAssessAddDtoSimafa = {
    onOffLoadIds: [],
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: true,
    displayBillId: true,
    displayRadif: true,
    counterReaderId: ''
  }
  private _simafaSingleReq: IReadingProgramRes;
  _simafaReadingProgram: IObjectIteratation[] = [
    { field: 'zoneId', header: 'ناحیه', isSelected: true, isSelectOption: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, isNumber: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, isNumber: true },
    { field: 'listNumber', header: 'ش لیست', isSelected: true, icon: 'grid-column: auto/ span 2;' },
    { field: 'year', header: 'سال', isSelected: false, isNumber: true },
    { field: 'readingPeriodId', header: 'دوره قرائت', isSelected: false, isSelectOption: true },
  ]
  private _simafaBatch: IObjectIteratation[] = [
    { field: 'routeTitle', header: 'مسیر', isSelected: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: false },
    { field: 'orderDigit', header: 'ترتیب', isSelected: false, readonly: true },
    { field: 'orderPersian', header: 'فارسی', isSelected: false, readonly: true, isBoolean: true },
    { field: 'routeAndReaderIds', header: 'مامور', isSelected: true, readonly: false, isSelectOption: true }
  ]

  importDynamicReq: IImportDynamicDefault = {
    fromEshterak: '',
    toEshterak: '',
    zoneId: null,
    alalHesabPercent: 0,
    imagePercent: 0,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    fromDate: null,
    toDate: null,
    counterReaderId: '',
    readingPeriodId: null
  }
  AssessPreReq: IAssessPreDisplayDtoSimafa = {
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    zoneId: null,
    listNumber: ''
  }

  constructor(
    private utilsService: UtilsService,
    private dialog: MatDialog,
    private router: Router,
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService
  ) { }

  columnSimafaSingle = () => {
    return this._simafaSingleReq;
  }
  columnSimafaReadingProgram = (): IObjectIteratation[] => {
    return this._simafaReadingProgram;
  }
  columnSimafaBatch = (): IObjectIteratation[] => {
    return this._simafaBatch;
  }
  columnSetSimafaBatch = (val: IObjectIteratation) => {
    this._simafaBatch.push(val);
  }
  columnRemoveSimafaBatch = () => {
    const a = this._simafaBatch.filter(item => {
      return !(item.field == 'trackNumber' || item.field == 'count')
    })
    this._simafaBatch = a;
  }
  columnGetSimafaRDPG = (): IImportSimafaReadingProgramsReq => {
    return this.simafaRDPGReq;
  }
  receiveFromDateJalali = (variable: ENImportDatas, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENImportDatas, $event: string) => {
    this[variable].toDate = $event;
  }
  persentCheck = (val: number): boolean => {
    return MathS.persentCheck(val);
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
    if (MathS.isNull(val))
      return false;
    return true;
  }
  noRouteToImportMessage = () => this.utilsService.snackBarMessageWarn(EN_messages.import_NoRouteAvailable);

  private NANValidation = (sth: string, message?: EN_messages): boolean => {
    if (MathS.isNaN(sth)) {
      if (message)
        this.utilsService.snackBarMessageWarn(message);
      return false;
    }
    return true;
  }
  private validationNull = (object: any): boolean => {
    if (object.hasOwnProperty('zoneId')) {
      if (MathS.isNull(object.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (object.hasOwnProperty('listNumber')) {
      if (MathS.isNull(object.listNumber)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_listNumber);
        return false;
      }
    }
    return true;
  }
  routeToWoui = (object: IOnOffLoadFlat) => {
    this.router.navigate([EN_Routes.wrmtrackwoui, false, object.id]);
  }
  routeToSimafaSingle = (object: IReadingProgramRes) => {
    this.router.navigate([EN_Routes.wrimpsimafardpgsingle, object]);
  }
  routeToSimafaBatch = (object: IReadingProgramRes) => {
    this.router.navigate([EN_Routes.wrimpsimafardpgbatch, object]);
  }
  verificationAssessPre = (searchReq: IAssessPreDisplayDtoSimafa): boolean => {
    return this.validationNull(searchReq);
  }
  verificationReadingConfigDefault = (val: IReadingConfigDefault, insertedVals: IImportDynamicDefault | IImportSimafaSingleReq | IAssessAddDtoSimafa): boolean => {
    if (val.minAlalHesab > insertedVals.alalHesabPercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMinAlalHesab);
      return false;
    }
    if (val.minImagePercent > insertedVals.imagePercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMinImg);
      return false;
    }
    if (val.maxAlalHesab < insertedVals.alalHesabPercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMaxAlalHesab);
      return false;
    }
    if (val.maxImagePercent < insertedVals.imagePercent) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_defaultMaxImg);
      return false;
    }
    return true;
  }
  checkVertification = (val: IImportDynamicDefault, _isOrderByDate: boolean): boolean => {
    this.importDynamicValue = val;
    if (!MathS.isSameLength(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
      this.utilsService.snackBarMessageWarn(EN_messages.sameLength_eshterak);
      return false;
    }

    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_from_eshterak))
      return false;
    if (!this.NANValidation(this.importDynamicValue.fromEshterak, EN_messages.format_invalid_to_eshterak))
      return false;

    if (!MathS.lengthControl(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak, 5, 15)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_esterak);
      return false;
    }
    if (!MathS.isFromLowerThanToByString(this.importDynamicValue.fromEshterak, this.importDynamicValue.toEshterak)) {
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
      console.log(1);

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
  checkSimafaVertification = (dataSource: IImportSimafaReadingProgramsReq): boolean => {
    if (MathS.isNull(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNull(dataSource.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNull(dataSource.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (MathS.isNaN(dataSource.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(dataSource.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNaN(dataSource.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }

    return true;
  }
  validateSimafaBatch = (val: IImportSimafaBatchReq): boolean => {
    if (MathS.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.readingProgramId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.fragmentMasterId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    if (MathS.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }

    return true;
  }
  private validateSimafaBatchHaveSelectedCounterReaders = (val: IImportSimafaBatchReq): boolean => {
    return val.routeAndReaderIds.every(item => {
      return item.counterReaderId !== null
    })
  }
  verificationSimafaBatch = (val: IImportSimafaBatchReq) => {
    if (!this.validateSimafaBatchHaveSelectedCounterReaders(val)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_allReaders);
      return false;
    }
    if (!this.validateSimafaBatch(val)) {
      return false;
    }

    return true;
  }
  checkSimafaSingleVertification = (val: IImportSimafaSingleReq): boolean => {
    // call support group because inserted in previous section and readonly
    if (MathS.isNull(val.readingProgramId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(val.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    if (MathS.isNaN(val.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNaN(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (MathS.isNaN(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
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
  verificationAssessAdd = (assessData: IAssessAddDtoSimafa): boolean => {
    if (MathS.isNull(assessData.onOffLoadIds[0])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_assessAdd);
      return false;
    }
    if (MathS.isNull(assessData.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
      return false;
    }
    return true;
  }
  showResDialog = (res: IImportDataResponse, disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent,
        {
          disableClose: disableClose,
          minWidth: '19rem',
          data: {
            data: res,
            title: title,
            isConfirm: disableClose
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (disableClose) {
          if (result) {
            resolve(true);
          }
        }
      })
    });

  }
  showCheckboxDialog = (res: any[], disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmDialogCheckboxComponent,
        {
          disableClose: disableClose,
          minWidth: '19rem',
          data: {
            data: res,
            title: title
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        if (disableClose) {
          if (result) {
            resolve(true);
          }
        }
      })
    });
  }
  /*API CALLS */
  getKarbariDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getKarbariByCodeDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getCounterReportByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterReportByZoneIdDictionary(zoneId);
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  postFragmentDetailsByEshterak = (val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.fragmentDETAILSByEshterak, val).toPromise().then(res =>
        resolve(res))
    });
  }
  postById = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  getUserCounterReaders = (zoneId: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.counterReadersByZoneId, zoneId).toPromise().then(res =>
        resolve(res))
    });
  }
  getCounterStateByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getFragmentMasterDictionary = (zoneId: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.fragmentMasterInZone, zoneId).toPromise().then(res =>
        resolve(res))
    });
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
  getMasrafStates = () => {
    return IMasrafStates;
  }
  postAssess = (method: ENInterfaces, object: object): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, object).subscribe(res => {
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
  postImportDynamicCount = (importDynamic: IImportDynamicDefault): Promise<any> => {
    importDynamic.fromDate = Converter.persianToEngNumbers(importDynamic.fromDate);
    importDynamic.toDate = Converter.persianToEngNumbers(importDynamic.toDate);
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(ENInterfaces.postImportDynamicCount, importDynamic).toPromise().then(res => {
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  postImportSimafaRDPG = (method: ENInterfaces, body: IImportSimafaReadingProgramsReq): Promise<any> => {
    this.simafaRDPGReq = body;
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
  getDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).toPromise().then(res => {
        resolve(res);
      })
    })
  }
  getFragmentDetailsByMaster = (zoneId: string) => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.fragmentMasterInZone, zoneId).subscribe(res => {
          resolve(res);
        })
      })
    } catch (error) {
      console.error(e => e);
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
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(MathS.getRange(item.newRate))
      if (item.gisAccuracy)
        item.gisAccuracy = MathS.getRange(item.gisAccuracy)
    })
  }
  makeHadPicturesToBoolean = (dataSource: any) => {
    dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  /* OTHERS */

  setSimafaSingleReq = (dataSourceReq: IReadingProgramRes) => {
    this._simafaSingleReq = dataSourceReq;
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
  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }
  snackMessage = (message: EN_messages) => {
    this.utilsService.snackBarMessageWarn(message);
  }

}
