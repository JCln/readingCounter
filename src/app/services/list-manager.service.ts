import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import {
  ENRandomNumbers,
  ENSelectedColumnVariables,
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
import { IOnOffLoadFlat } from 'interfaces/imanage';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ref: DynamicDialogRef;
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
  /*OTHER */
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    dataSource.forEach(item => {
      item.newRate = parseFloat(MathS.getRange(item.newRate))
      item.preAverage = parseFloat(MathS.getRange(item.preAverage));
      item.x = MathS.getRange(item.x);
      item.y = MathS.getRange(item.y);
      item.gisAccuracy = MathS.getRange(item.gisAccuracy);
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
    body.jalaliDay = Converter.persianToEngNumbers(body.jalaliDay);
    return new Promise((resolve) => {
      this.ajaxReqWrapperService.interfaceManagerService.POSTBODY(ENInterfaces.trackingPostOffloadModify, body).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      }).catch(() => {
        resolve(false);
      })
    });
  }
  getOffloadModifyType = (): OffloadModify[] => {
    return [
      OffloadModify.selectAOption,
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading,
      OffloadModify.bazresi
    ]
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
  verificationMosh = (searchReq: ISearchMoshReqDialog): boolean => {
    return this.validationNullMosh(searchReq) && this.validationNumbers(searchReq)
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
