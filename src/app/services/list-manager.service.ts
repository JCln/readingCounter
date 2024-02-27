import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import {
  IDictionaryManager,
  IResponses
} from 'interfaces/ioverall-config';
import { IOffLoadPerDay } from 'interfaces/itrackings';
import { EN_Routes } from 'interfaces/routes.enum';
import { ISearchMoshReqDialog } from 'interfaces/search';
import { SortEvent } from 'primeng/api/sortevent';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColumnManager } from 'src/app/classes/column-manager';

import { Converter } from '../classes/converter';
import { MathS } from '../classes/math-s';
import { OffloadModify } from '../classes/offload-modify-type';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';
import { IListLatestInfoReq, IOnOffLoadFlat } from 'interfaces/imanage';
import { Search } from '../classes/search';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ref: DynamicDialogRef;
  modifyType: OffloadModify[] = [];
  counterStateGeneralGroupList: number;
  counterStateGeneralList: number;


  searchReqMoshDialog: ISearchMoshReqDialog = {
    // searchBy: 1  => eshterak
    zoneId: null,
    searchBy: 1,
    item: null,
    similar: false
  }
  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService,
    public columnManager: ColumnManager
  ) { }

  routeToLMPDXY = (dataSource: IOffLoadPerDay, day: string) => {
    this.utilsService.routeToByParams(EN_Routes.wr, { trackNumber: dataSource.trackNumber, day: day, distance: dataSource.overalDistance });
  }
  routeToReading = () => {
    this.utilsService.routeToByUrl(EN_Routes.wrmtrackreading);
  }
  routeToOffloaded = () => {
    this.utilsService.routeToByUrl(EN_Routes.wrmtrackoffloaded);
  }
  denyTracking = (): boolean => {
    return this.utilsService.getDenyTracking();
  }
  getDeleteDictionary = (): any[] => {
    return this.utilsService.getDeleteDictionary();
  }
  getHighLowDictionary = (): any[] => {
    return this.utilsService.getHighLowStateDictionary();
  }
  getMasrafStateDictionary = (): any[] => {
    return this.utilsService.getMasrafStateDictionary();
  }
  setRangesForSingleValue = (dataSource: any) => {
    dataSource.x = MathS.getFormatRange(dataSource.x);
    dataSource.y = MathS.getFormatRange(dataSource.y);
    dataSource.gisAccuracy = MathS.getFormatRange(dataSource.gisAccuracy);
  }
  setRangesForDailyAverage = (dataSource: any) => {
    dataSource.dailyAverage = MathS.getFormatRange(dataSource.dailyAverage);
  }
  /*OTHER */
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      item.newRate = MathS.getFormatRange(item.newRate);
      item.preAverage = MathS.getFormatRange(item.preAverage);
      item.reteDifference = MathS.getFormatRange(item.reteDifference);
      item.newRateDaily = MathS.getFormatRange(item.newRateDaily);
      item.newRateDaily2 = MathS.getFormatRange(item.newRateDaily2);
      item.x = MathS.getFormatRange(item.x);
      item.y = MathS.getFormatRange(item.y);
      item.gisAccuracy = MathS.getFormatRange(item.gisAccuracy);
      // item.x = item.x ? MathS.getFormatRange(item.x) : ''; format for string should be like this
    })
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
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }
  showInMapSingleValidation = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseInt(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred || MathS.isNull(parseInt(dataSource.gisAccuracy))) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return false;
    }
    return true;
  }
  postOffloadModifyEdited = (body: IOffloadModifyReq): Promise<any> => {
    return new Promise((resolve) => {
      this.ajaxReqWrapperService.interfaceManagerService.POSTBODY(ENInterfaces.trackingPostOffloadModify, body).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      }).catch(() => {
        resolve(false);
      })
    });
  }
  getOffloadModifyTypeSimple = (): IDictionaryManager[] => {
    return [
      { id: OffloadModify.callAnnounce.id, title: OffloadModify.callAnnounce.title, isSelected: false },
      { id: OffloadModify.wrongReading.id, title: OffloadModify.wrongReading.title, isSelected: false },
      { id: OffloadModify.bazresi.id, title: OffloadModify.bazresi.title, isSelected: false },
    ]
  }
  offloadModifyValidation = (object: IOffloadModifyReq): boolean => {
    if (MathS.isNull(object.id)) {
      this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
      return false;
    }
    if (MathS.isNull(object.jalaliDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }
    if (MathS.isNullZero(object.modifyType)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_modify_type);
      return false;
    }

    return true;
  }
  selectedItems = (_selectors: any[]): any[] => {
    const a = [];
    _selectors.filter(items => {
      if (items.isSelected)
        a.push(items.id)
    })
    return a;
  }
  showSnackWarn = (message: string) => {
    this.utilsService.snackBarMessageWarn(message);
  }
  // moshtarak dialog
  private validationNullMosh = (dataSource: ISearchMoshReqDialog): boolean => {
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
  private validationNumbers = (object: ISearchMoshReqDialog): boolean => {
    if (object.hasOwnProperty('searchBy')) {
      if (MathS.isNaN(object.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.call_supportGroup);
        return false;
      }
    }
    return true;
  }
  getSearchTypes = (): Search[] => {
    return [
      Search.eshterak,
      Search.radif,
      Search.readCode,
      Search.billId,
    ]
  }
  getOffloadModifyType = (): any[] => {
    return [
      OffloadModify.selectAOption,
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading,
      OffloadModify.bazresi
    ]
  }
  verificationMosh = (searchReq: ISearchMoshReqDialog): boolean => {
    return this.validationNullMosh(searchReq) && this.validationNumbers(searchReq)
  }
  verificationLatestInfo = (searchReq: IListLatestInfoReq): boolean => {
    if (searchReq.hasOwnProperty('searchBy')) {
      if (MathS.isNull(searchReq.searchBy)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_searchType);
        return false;
      }
    }
    if (searchReq.hasOwnProperty('item')) {
      if (MathS.isNull(searchReq.item)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_value);
        return false;
      }
    }
    return true;
  }
  convertTitleToIdByModifyType = (dataSource: any): any => {
    return this.modifyType.find(item => {
      if (item.title === dataSource)
        return item;
    })
  }
  // convertTitleToId = (dataSource: any): any => {
  //   if (!MathS.isNull(dataSource)) {
  //     return this.counterStateByZoneDictionary.find(item => {
  //       if (item.title === dataSource)
  //         return item;
  //     })
  //   }
  //   else {
  //     this.showSnackWarn(EN_messages.insert_counterStateDetails);
  //   }
  // }
  vertificationLatestInfoModifyBatchReq = (body: IOffloadModifyReq): boolean => {
    console.log(body);
    if (MathS.isNullZero(body.modifyType)) {
      this.showSnackWarn(EN_messages.insert_modifyTypeSingle);
      return false;
    }
    if (MathS.isNullZero(body.counterStateId)) {
      this.showSnackWarn(EN_messages.insert_counterState);
      return false;
    }
    if (!MathS.isFromLowerThanTo(ENRandomNumbers.zero, body.counterNumber)) {
      this.showSnackWarn(EN_messages.format_invalid_counterNumber);
      return false;
    }
    if (MathS.isNull(body.jalaliDay)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
      return false;
    }
    if (!MathS.lengthControl(body.jalaliDay, body.jalaliDay, 9, 10)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_Date);
      return false;
    }


    return true;
  }
  makeHadPicturesToBoolean = (dataSource: any) => {
    dataSource.forEach(item => {
      if (item.imageCount > 0)
        item.imageCount = true;
      else
        item.imageCount = false;
    })
  }
  getReadingReportTitles = async ($event) => {
    const a = await this.ajaxReqWrapperService.postDataSourceById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.snackEmptyValue();
  }

}
