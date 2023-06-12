import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import {
  ENSelectedColumnVariables,
  IMasrafStates,
  IObjectIteratation,
  ISearchInOrderTo,
  ITitleValue,
} from 'interfaces/ioverall-config';
import { ENSearchs, ISearchMoshReq, ISearchProReportInput, ISearchSimpleOutput, ISearchSimpleReq } from 'interfaces/search';
import { AllListsService } from 'services/all-lists.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { EN_Routes } from '../interfaces/routes.enum';
import { ConfirmDialogCheckboxComponent } from './../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { FollowUpService } from './follow-up.service';
import { PageSignsService } from './page-signs.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENSearchs = ENSearchs;
  _years: ITitleValue[] = [];

  _isOrderByDate: boolean = false;

  searchReqMosh: ISearchMoshReq = {
    zoneId: null,
    searchBy: 1,
    item: null,
    similar: false,
    showAll: false
  }
  _searchSimpleReq: ISearchSimpleReq = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    year: this.utilsService.getFirstYear(),
    isCollapsed: false
  }

  private _searchProExcel: IObjectIteratation[] = [
    { field: 'billId', header: 'شناسه قبض', isSelected: true },
    { field: 'trackNumber', header: 'شناسه قبض', isSelected: true },
    { field: 'radif', header: 'شناسه قبض', isSelected: true },
    { field: 'eshterak', header: 'شناسه قبض', isSelected: true },
  ]

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private followUpService: FollowUpService,
    private allListsService: AllListsService,
    private pageSignsService: PageSignsService,
    private profileService: ProfileService
  ) { }

  // should call "getSEarchInOrderTo" to isOrderByDate work perfectly
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
  columnSearchProExcel = (): IObjectIteratation[] => {
    return this._searchProExcel;
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
  postById = (method: ENInterfaces, id: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTById(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  doSearch = (method: ENInterfaces, body: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
        resolve(res);
      })
    });
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
    if (MathS.isNull(dataSource.searchBy)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
      return false;
    }
    if (MathS.isNull(dataSource.item)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
      return false;
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
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource.zoneId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
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
    if (MathS.isNaN(object.searchBy)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
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
    if (this.validationNullMosh(searchReq)) {
      searchReq.item = searchReq.item.trim();
      return this.validationNumbers(searchReq);
    }
  }
  verificationPro = (searchReq: ISearchProReportInput, isValidateByDate?: boolean): boolean => {
    searchReq.fromDate = Converter.persianToEngNumbers(searchReq.fromDate);
    searchReq.toDate = Converter.persianToEngNumbers(searchReq.toDate);

    if (isValidateByDate) {
      return this.validationNullPro(searchReq) && this.validationDate(searchReq);
    }
    else {
      return this.validationByReadingPeriod(searchReq);
    }
  }
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      if (item.newRate > 0)
        item.newRate = parseFloat(MathS.getRange(item.newRate))
      item.preAverage = +MathS.getRange(item.preAverage);
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
  receiveFromDateJalali = (variable: ENSearchs, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENSearchs, $event: string) => {
    this[variable].toDate = $event;
  }
  routeToLMAll = (row: ISearchSimpleOutput) => {
    this.allListsService.allLists_pageSign.trackNumber = row.trackNumber;
    this.allListsService.allLists_pageSign.GUid = row.trackingId;
    this.allListsService.allLists_pageSign.zoneId = row.zoneId;
    this.allListsService.allLists_pageSign.zoneTitle = row.zoneTitle;
    this.allListsService.allLists_pageSign.listNumber = row.listNumber;
    this.utilsService.routeToByParams(EN_Routes.wrmlall, false);
  }
  routeToLMPayDay = (row: ISearchSimpleOutput) => {
    this.pageSignsService.perday_pageSign.trackNumber = row.trackNumber;
    this.pageSignsService.perday_pageSign.zone = row.zoneTitle;
    this.utilsService.routeToByUrl(EN_Routes.wrmlpd);
  }
  routeToFollowUp = (row: ISearchSimpleOutput) => {
    this.followUpService.setTrackNumber(row.trackNumber);
    this.utilsService.routeToByUrl(EN_Routes.wrmsfwu);
  }
  showInMap = (dataSource: object) => {
    this.utilsService.routeToByParams(EN_Routes.wr, { trackNumber: dataSource['trackNumber'], day: dataSource['insertDateJalali'], distance: dataSource['overalDistance'] });
  }
  showResDialog = (res: any[], disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.utilsService.dialog.open(ConfirmDialogCheckboxComponent,
        {
          disableClose: disableClose,
          minWidth: '65vw',
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