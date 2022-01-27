import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import {
  ENRandomNumbers,
  ENSelectedColumnVariables,
  IMasrafStates,
  IObjectIteratation,
  ISearchInOrderTo,
  ITitleValue,
} from 'interfaces/ioverall-config';
import { ENSearchs, ISearchMoshReq, ISearchProReportInput, ISearchSimpleOutput, ISearchSimpleReq } from 'interfaces/search';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { EN_Routes } from '../Interfaces/routes.enum';
import { ConfirmDialogCheckboxComponent } from './../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { FollowUpService } from './follow-up.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENSearchs = ENSearchs;

  _isOrderByDate: boolean = true;

  searchReqPro: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    zoneIds: [],
    year: 1400,
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: []
  }
  searchInOrderTo: ISearchInOrderTo[] = [
    {
      title: 'تاریخ',
      isSelected: true
    },
    {
      title: 'دوره',
      isSelected: false
    }
  ]
  _years: ITitleValue[] = [];
  searchReqMosh: ISearchMoshReq = {
    zoneId: null,
    searchBy: null,
    item: '',
    similar: false
  }
  _searchSimpleReq: ISearchSimpleReq = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: 1400
  }
  private _searchReqPro: ISearchProReportInput = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    zoneIds: [],
    year: 1400,
    reportIds: [],
    counterStateIds: [],
    masrafStates: [],
    karbariCodes: [],
    fragmentMasterIds: []
  }
  private _isValidateByDate: boolean;
  private _searchProExcel: IObjectIteratation[] = [
    { field: 'billId', header: 'شناسه قبض', isSelected: true },
    { field: 'trackNumber', header: 'شناسه قبض', isSelected: true },
    { field: 'radif', header: 'شناسه قبض', isSelected: true },
    { field: 'eshterak', header: 'شناسه قبض', isSelected: true },
  ]

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private followUpService: FollowUpService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  /*COLUMNS*/
  columnSearchProExcel = (): IObjectIteratation[] => {
    return this._searchProExcel;
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }
  columnGetSearchPro = (): ISearchProReportInput => {
    return this._searchReqPro;
  }
  /*API CALLS*/
  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  getZoneDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getCounterReportByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterReportByZoneIdDictionary(zoneId);
  }
  getCounterStateByZoneDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  getReadingPeriodDictionary = (kindId: string): Promise<any> => {
    return this.dictionaryWrapperService.getReadingPeriodDictionary(kindId);
  }
  getReadingPeriodKindDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getPeriodKindDictionary();
  }
  getByQuoteId = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postById = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  getKarbariDictionaryCode = (): Promise<any> => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getKarbariDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getKarbariDictionary();
  }
  getCounterStateDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateDictionary();
  }
  doSearch = (method: ENInterfaces, body: any): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getProExcel = (method: ENInterfaces, body: any): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.POSTBLOB(method, body).toPromise().then(res => {
          resolve(res);
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  /*VALIDATION*/
  private validationNullMosh = (dataSource: ISearchMoshReq): boolean => {
    if (dataSource.hasOwnProperty('searchBy')) {
      if (MathS.isNull(dataSource.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('item')) {
      if (MathS.isNull(dataSource.item)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
        return false;
      }
    }
    return true;
  }
  private validationNullPro = (dataSource: ISearchProReportInput): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource.fromDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource.toDate)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    return true;
  }
  private validationByReadingPeriod = (dataSource: ISearchProReportInput): boolean => {
    if (dataSource.hasOwnProperty('readingPeriodId')) {
      if (MathS.isNull(dataSource.readingPeriodId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('year')) {
      if (MathS.isNull(dataSource.year)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    return true;
  }
  private validationSearchSimpleByPeriod = (object: ISearchSimpleReq): boolean => {
    if (MathS.isNull(object.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
      return false;
    }
    if (MathS.isNull(object.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (MathS.isNull(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(object.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNaN(object.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    return true;
  }
  private validateSearchSimpleByDate = (object: ISearchSimpleReq): boolean => {
    if (MathS.isNull(object.fromDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
      return false;
    }
    if (MathS.isNull(object.toDate)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
      return false;
    }
    if (MathS.isNull(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
      return false;
    }
    if (MathS.isNaN(object.zoneId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    return true;
  }
  private validationNumbers = (object: ISearchMoshReq): boolean => {
    if (object.hasOwnProperty('searchBy')) {
      if (MathS.isNaN(object.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
        return false;
      }
    }
    return true;
  }
  private validationDate = (object: ISearchProReportInput): boolean => {
    if (object.fromDate.length == 10 && object.toDate.length == 10)
      return true;
    return false;
  }
  /*VERIFICATION*/
  verificationSimpleSearch = (searchReq: ISearchSimpleReq): boolean => {
    searchReq.fromDate = Converter.persianToEngNumbers(searchReq.fromDate);
    searchReq.toDate = Converter.persianToEngNumbers(searchReq.toDate);
    if (this._isOrderByDate)
      return this.validateSearchSimpleByDate(searchReq);
    return this.validationSearchSimpleByPeriod(searchReq)
  }
  verificationMosh = (searchReq: ISearchMoshReq): boolean => {
    return this.validationNullMosh(searchReq) && this.validationNumbers(searchReq)
  }
  verificationPro = (searchReq: ISearchProReportInput, isValidateByDate?: boolean): boolean => {
    searchReq.fromDate = Converter.persianToEngNumbers(searchReq.fromDate);
    searchReq.toDate = Converter.persianToEngNumbers(searchReq.toDate);
    this._searchReqPro = searchReq;
    if (isValidateByDate == true || isValidateByDate == false)
      this._isValidateByDate = isValidateByDate;

    if (this._isValidateByDate) {
      return this.validationNullPro(searchReq) && this.validationDate(searchReq);
    }
    return this.validationByReadingPeriod(searchReq);
  }
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(MathS.getRange(item.newRate))
      item.preAverage = +MathS.getRange(item.preAverage);
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
  getYears = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  getMasrafStates = () => {
    return IMasrafStates;
  }
  makeHadPicturesToBoolean = (dataSource: any) => {
    dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  receiveYear = (): ITitleValue[] => {
    return this.utilsService.getYears();
  }
  receiveFromDateJalali = (variable: ENSearchs, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENSearchs, $event: string) => {
    this[variable].toDate = $event;
  }
  routeToWoui = (object: any) => {
    this.router.navigate([EN_Routes.wrmtrackwoui, false, object.id]);
  }
  routeToLMAll = (row: ISearchSimpleOutput) => {
    this.router.navigate([EN_Routes.wrmlall, false, row.trackingId]);
  }
  routeToLMPayDay = (row: ISearchSimpleOutput) => {
    this.utilsService.routeToByParams(EN_Routes.wrmlpd, row.trackNumber);
  }
  routeToFollowUp = (row: ISearchSimpleOutput) => {
    this.followUpService.setTrackNumber(row.trackNumber);
    this.utilsService.routeToByUrl(EN_Routes.wrmsfwu);
  }
  showInMap = (dataSource: object) => {
    this.utilsService.routeToByParams(EN_Routes.wr, { trackNumber: dataSource['trackNumber'], day: dataSource['insertDateJalali'], distance: dataSource['overalDistance'] });
  }
  showInMapSingle = (dataSource: any) => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseFloat(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return;
    }
    this.utilsService.routeToByParams(EN_Routes.wr, { x: dataSource.x, y: dataSource.y, firstName: dataSource.firstName, sureName: dataSource.sureName, eshterak: dataSource.eshterak, trackNumber: dataSource.trackNumber, isSingle: true });
  }
  showResDialog = (res: any[], disableClose: boolean, title: string): Promise<any> => {
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
  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }

}