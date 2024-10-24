import { PageSignsService } from 'services/page-signs.service';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { EN_messages, IMasrafStates } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import {
  IObjectIteratation
} from 'interfaces/ioverall-config';
import { ISearchMoshReq, ISearchProReportInput, ISearchSimpleOutput, ISearchSimpleReq } from 'interfaces/search';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { UtilsService } from 'services/utils.service';

import { MathS } from '../classes/math-s';
import { Search } from '../classes/search';
import { EN_Routes } from '../interfaces/routes.enum';
import { ConfirmDialogCheckboxComponent } from './../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { FollowUpService } from './follow-up.service';
import { ColumnManager } from '../classes/column-manager';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly _searchProExcel: string = '_searchProExcel';

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private followUpService: FollowUpService,
    private pageSignsService: PageSignsService,
    private columnManager: ColumnManager
  ) { }

  // should call "getSEarchInOrderTo" to isOrderByDate work perfectly
  columnSearchProExcel = (): IObjectIteratation[] => {
    return this.columnManager.getColumnsMenus(this._searchProExcel);
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
    if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
      return false;
    }
    if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
      return false;
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
  verificationSimpleSearch = (searchReq: ISearchSimpleReq, _isOrderByDate: boolean): boolean => {
    if (_isOrderByDate)
      return this.validateSearchSimpleByDate(searchReq);
    return this.validationSearchSimpleByPeriod(searchReq)
  }
  verificationSimpleMasterByFragment = (searchReq: ISearchSimpleReq, _isOrderByDate: boolean): boolean => {
    if (_isOrderByDate)
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
  getMasrafStates = () => {
    return IMasrafStates;
  }
  routeToLMAll = (row: ISearchSimpleOutput, whereToBack: EN_Routes) => {
    this.pageSignsService.allLists_pageSign.trackNumber = row.trackNumber;
    this.pageSignsService.allLists_pageSign.GUid = row.trackingId;
    this.pageSignsService.allLists_pageSign.zoneId = row.zoneId;
    this.pageSignsService.allLists_pageSign.zoneTitle = row.changableZoneId;
    this.pageSignsService.allLists_pageSign.listNumber = row.listNumber;
    this.pageSignsService.allLists_pageSign.prePage = whereToBack;
    this.utilsService.routeTo(EN_Routes.wrmlallfalse);
  }
  routeToLMPayDay = (row: ISearchSimpleOutput) => {
    this.pageSignsService.perday_pageSign.trackNumber = row.trackNumber;
    this.pageSignsService.perday_pageSign.zone = row.zoneTitle;
    this.utilsService.routeToByUrl(EN_Routes.wrmlpd);
  }
  routeToFollowUp = (row: ISearchSimpleOutput) => {
    this.followUpService.setTrackNumber(row.trackNumber);
    this.utilsService.routeToByUrl(EN_Routes.followUp);
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