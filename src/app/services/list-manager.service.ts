import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IOnOffLoadFlat } from 'interfaces/imanage';
import { IOffloadModifyReq } from 'interfaces/inon-manage';
import { ENRandomNumbers, ENSelectedColumnVariables, IObjectIteratation, IResponses } from 'interfaces/ioverall-config';
import { ISearchMoshReqDialog } from 'interfaces/search';
import { SortEvent } from 'primeng/api/sortevent';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InterfaceManagerService } from 'services/interface-manager.service';

import { Converter } from '../classes/converter';
import { MathS } from '../classes/math-s';
import { OffloadModify } from '../classes/offload-modify-type';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ref: DynamicDialogRef;
  counterStateValue: number;

  columnSelectedLMPerDay = (): IObjectIteratation[] => {
    return [
      { field: 'day', header: 'روز', isSelected: true, readonly: true },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true, ltr: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'fromTime', header: 'از ساعت', isSelected: true, readonly: true },
      { field: 'toTime', header: 'تا ساعت', isSelected: true, readonly: true },
      { field: 'duration', header: 'مدت(h)', isSelected: true, readonly: true },
      { field: 'distance', header: 'مسافت', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: false, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: false, readonly: true },
      { field: 'xarabFaqedCount', header: 'تعداد فاقد/خراب', isSelected: false, readonly: true },
      { field: 'xarabFaqedPercent', header: 'درصد فاقد/خراب', isSelected: false, readonly: true }
    ];
  }
  columnSelectedLMPerDayPositions = (): IObjectIteratation[] => {
    return [
      { field: 'trackNumber', header: 'ش پیگیری', isSelected: true, readonly: true },
      { field: 'listNumber', header: 'ش لیست', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'counterReaders', header: 'مامور(ها)', isSelected: true, readonly: true, icon: 'grid-column: auto/ span 2;' },
      { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, readonly: true },
      { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, readonly: true },
      { field: 'readCount', header: 'قرائت شده', isSelected: true, readonly: true },
      { field: 'overalCount', header: 'تعداد کل', isSelected: true, readonly: true },
      { field: 'overalDistance', header: 'مسافت کل(m)', isSelected: true, readonly: true },
      { field: 'overalDuration', header: 'زمان کل(h)', isSelected: true, readonly: true },
      { field: 'maneCount', header: 'تعداد مانع', isSelected: true, readonly: true },
      { field: 'manePercent', header: 'درصد مانع', isSelected: true, readonly: true }
    ];
  }
  searchReqMoshDialog: ISearchMoshReqDialog = {
    // searchBy: 1  => eshterak
    zoneId: null,
    searchBy: 1,
    item: null,
    similar: false
  }
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService,
    private dialog: MatDialog,
  ) { }

  getLMAllZoneDictionary = () => {
    return this.dictionaryWrapperService.getZoneDictionary();
  }
  getKarbariDictionaryCode = () => {
    return this.dictionaryWrapperService.getkarbariCodeDictionary();
  }
  getKarbariDictionary = () => {
    return this.dictionaryWrapperService.getKarbariDictionary();
  }
  getQotrDictionary = () => {
    return this.dictionaryWrapperService.getQotrDictionary();
  }
  getCounterStateDictionary = (): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateDictionary();
  }
  getCounterStateByCodeDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeDictionary(zoneId);
  }
  getCounterStateByZoneIdDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneIdDictionary(zoneId);
  }
  getCounterStateByCodeShowAllDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByCodeShowAllDictionary(zoneId);
  }
  getCounterStateByZoneShowAllDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateByZoneShowAllDictionary(zoneId);
  }
  getCounterStateForModifyDictionary = (zoneId: number): Promise<any> => {
    return this.dictionaryWrapperService.getCounterStateForModifyDictionary(zoneId);
  }
  getLM = (method: ENInterfaces | string, trackNumber: number | string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(method, trackNumber).subscribe(res => {
        resolve(res);
      })
    })
  }
  postBodyDataSource = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postById = (method: ENInterfaces, id?: number): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  getExcel = (method: ENInterfaces, groupId: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETBLOB(method, groupId).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postArrays = (method: ENInterfaces, array: any[]): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTARRAYS(method, array).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postByQueue = (method: ENInterfaces, id: any): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTSG(method, id).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  /*OTHER */
  setDynamicPartRanges = (dataSource: IOnOffLoadFlat[]) => {
    console.log('do nothing for now');
    
    // dataSource.forEach(item => {
    //   if (item.newRate > 0)
    //     item.newRate = parseFloat(MathS.getRange(item.newRate))
    //   item.preAverage = +MathS.getRange(item.preAverage);
    //   item.x = MathS.getRange(item.x);
    //   item.y = MathS.getRange(item.y);
    //   item.gisAccuracy = MathS.getRange(item.gisAccuracy);
    // })
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
      this.interfaceManagerService.POSTBODY(ENInterfaces.trackingPostOffloadModify, body).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        console.log(res);

        resolve(res);
      }).catch(() => {
        resolve(false);
      })
    });
  }
  getOffloadModifyType = (): OffloadModify[] => {
    return [
      OffloadModify.callAnnounce,
      OffloadModify.wrongReading,
      OffloadModify.bazresi
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
    const a = await this.postById(ENInterfaces.ReadingReportTitles, $event)
    if (a.length) {
      this.showResDialog(a, false, EN_messages.insert_rrDetails);
      return;
    }
    this.snackEmptyValue();
  }

}
