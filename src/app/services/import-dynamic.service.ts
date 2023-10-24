import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSelectedColumnVariables, EN_messages, IMasrafStates } from 'interfaces/enums.enum';
import { IAssessAddDtoSimafa, IAssessPreDisplayDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import {
  ENImportDatas,
  IFileExcelReq,
  IImportDataResponse,
  IImportDynamicDefault,
  IImportSimafaBatchReq,
  IImportSimafaReadingProgramsReq,
  IImportSimafaSingleReq,
  IReadingProgramRes,
} from 'interfaces/import-data';
import {
  IObjectIteratation,
  ISearchInOrderTo,
} from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { ProfileService } from 'services/profile.service';

import { MathS } from '../classes/math-s';
import { ConfirmDialogComponent } from '../frame-work/import-data/import-dynamic/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { Converter } from './../classes/converter';
import { AllImportsService } from './all-imports.service';
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
    year: this.utilsService.getFirstYear()
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

  private _simafaBatch: IObjectIteratation[] = [
    { field: 'routeTitle', header: 'مسیر', isSelected: true, isSelectedOrigin: true, readonly: true },
    { field: 'fromEshterak', header: 'از اشتراک', isSelected: true, isSelectedOrigin: true, readonly: true },
    { field: 'toEshterak', header: 'تا اشتراک', isSelected: true, isSelectedOrigin: true, readonly: false },
    { field: 'orderDigit', header: 'ترتیب عددی', isSelected: false, isSelectedOrigin: false, readonly: true },
    { field: 'orderPersian', header: 'ترتیب', isSelected: false, isSelectedOrigin: false, readonly: true },
    { field: 'routeAndReaderIds', header: 'قرائت کننده', isSelected: true, isSelectedOrigin: true, readonly: false, isSelectOption: true }
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

  constructor(
    public utilsService: UtilsService,
    private allImportsService: AllImportsService,
    private profileService: ProfileService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService
  ) { }

  _isOrderByDate: boolean = false;

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
  columnSimafaSingle = () => {
    return this._simafaSingleReq;
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
  private validationNull = (object: IAssessPreDisplayDtoSimafa): boolean => {
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
  routeToSimafaSingle = (object: IReadingProgramRes) => {
    this.utilsService.compositeService.routeToExtras([EN_Routes.wrimpsimafardpgsingle, object]);
  }
  routeToSimafaBatch = (object: IReadingProgramRes) => {
    this.allImportsService.allImports_batch.readingProgramId = object.id;
    this.allImportsService.allImports_batch.zoneId = object.zoneId;
    this.allImportsService.allImports_batch.fromEshterak = object.fromEshterak;
    this.allImportsService.allImports_batch.toEshterak = object.toEshterak;
    this.allImportsService.allImports_batch.listNumber = object.listNumber;
    this.allImportsService.allImports_batch.year = object.year;
    this.allImportsService.allImports_batch.readingPeriodId = object.readingPeriodId;
    this.allImportsService.allImports_batch.canContinue = object.canContinue;
    this.utilsService.routeTo(EN_Routes.wrimpsimafardpgbatch);
  }
  verificationAssessPre = (searchReq: IAssessPreDisplayDtoSimafa): boolean => {
    return this.validationNull(searchReq);
  }
  verificationReadingConfigDefault = (val: IReadingConfigDefault, insertedVals: any): boolean => {
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
  verificationExcelFile = (fileForm: FileList): boolean => {
    if (MathS.isNull(fileForm)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_excelFile);
      return false;
    }
    if (fileForm[0].name.split('.').pop() !== 'xlsx') {
      this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_excel);
      return false;
    }
    return true;
  }
  postExcelFile = async (method: ENInterfaces, value: any, fileForm: FileList) => {
    const formData: FormData = new FormData();

    formData.append('alalHesabPercent', value.alalHesabPercent);
    formData.append('zoneId', value.zoneId);
    formData.append('imagePercent', value.imagePercent);
    formData.append('counterReaderId', value.counterReaderId);
    formData.append('description', value.description);
    formData.append('displayBillId', value.displayBillId);
    formData.append('hasPreNumber', value.hasPreNumber);
    formData.append('listNumber', value.listNumber);
    formData.append('readingPeriodId', value.readingPeriodId);
    formData.append('displayRadif', value.displayRadif);
    formData.append('year', value.year);
    formData.append('skipErrors', value.skipErrors);
    formData.append('file', fileForm[0]);

    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, formData);
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  checkExcelFileVertification = (val: IFileExcelReq): boolean => {
    if (!MathS.persentCheck(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!MathS.persentCheck(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
      return false;
    }
    if (MathS.isNull(val.readingPeriodId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reading_time);
      return false;
    }
    if (MathS.isNull(val.year)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
      return false;
    }
    if (MathS.isNull(val.counterReaderId)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_reader);
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
    if (MathS.isNaN(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_alalhesab);
      return false;
    }
    if (MathS.isNaN(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_imagePercent);
      return false;
    }
    if (!MathS.persentCheck(val.alalHesabPercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_alalhesab);
      return false;
    }
    if (!MathS.persentCheck(val.imagePercent)) {
      this.utilsService.snackBarMessageWarn(EN_messages.percent_pictures);
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
  validationInvalid = (val: any, message: EN_messages): boolean => {
    if (!this.validationOnNull(val)) {
      this.utilsService.snackBarMessageFailed(message);
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
  verificationTrackNumber = (id: number): boolean => {
    if (MathS.isNull(id)) {
      this.snackMessage(EN_messages.insert_trackNumber);
      return false;
    }
    if (MathS.isNaN(id)) {
      this.snackMessage(EN_messages.format_invalid_trackNumber);
      return false;
    }
    if (!MathS.isLowerThanMinLength(id, ENRandomNumbers.two) || !MathS.isLowerThanMaxLength(id, ENRandomNumbers.ten)) {
      this.snackMessage(EN_messages.format_invalid_trackNumbersLength);
      return false;
    }
    return true;
  }
  showResDialog = (res: IImportDataResponse, disableClose: boolean, title: string): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.utilsService.dialog.open(ConfirmDialogComponent,
        {
          disableClose: disableClose,
          minWidth: '21rem',
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
  getMasrafStates = () => {
    return IMasrafStates;
  }
  postImportDynamicData = (method: ENInterfaces, importDynamic: IImportDynamicDefault): Promise<any> => {
    importDynamic.fromDate = Converter.persianToEngNumbers(importDynamic.fromDate);
    importDynamic.toDate = Converter.persianToEngNumbers(importDynamic.toDate);

    return this.ajaxReqWrapperService.postDataSourceByObject(method, importDynamic);
  }
  insertToSimafaRdpgReq = (body: IImportSimafaReadingProgramsReq) => {
    this.simafaRDPGReq = body;
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
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
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }

}
