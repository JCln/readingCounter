import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { IMostReportInput } from 'interfaces/imanage';
import {
  IReadingReportGISReq,
  IReadingReportReq,
  IReadingReportTraverseDifferentialReq,
  IUserKarkardInput,
} from 'interfaces/ireports';
import { ENReadingReports } from 'interfaces/reading-reports';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { ProfileService } from 'services/profile.service';
import { UtilsService } from 'services/utils.service';
import { MathS } from '../classes/math-s';
import {
  ConfirmDialogExcelViewComponent,
} from '../frame-work/reports/rr-excel-dynamic-viewer/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { EN_Routes } from '../interfaces/routes.enum';
import { ConfirmDialogCheckboxComponent } from '../shared/confirm-dialog-checkbox/confirm-dialog-checkbox.component';
import { JwtService } from './../auth/jwt.service';
import { MapService } from './map.service';
import { ISearchInOrderTo } from 'interfaces/ioverall-config';


@Injectable({
  providedIn: 'root'
})
export class ReadingReportManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;
  ENReadingReports = ENReadingReports;
  _isOrderByDate: boolean = false;

  masterReq: IReadingReportReq = {
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    _selectedAggregate: ''// Default group by
  };
  // inStateReq doesn't need _isSeletedKind
  imgAttrResultReq: IReadingReportReq = {
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear()
  };
  // inStateReq doesn't need _isSeletedKind
  imgAttrAnalyzeReq: IReadingReportReq = {
    zoneId: null,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear()
  };
  userKarkardReq: IUserKarkardInput = {
    fromDate: '',
    toDate: '',
    zoneId: null,
    statusId: 0
  };
  detailsReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: []
  }
  guildsWithParamsReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: []
  }
  // inStateReq doesn't need _isSeletedKind
  disposalhoursReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear()
  }
  karkardReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: []
  }
  lockedReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    _selectedKindId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear()
  }
  preNumberShownReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear()
  }
  rrFragmentKarkardReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    isCollapsed: false,
    fragmentMasterIds: []
  }
  karkardOffloadReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: []
  }
  karkardDailyReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    _selectedKindId: '',
    beginFromImported: true,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: []
  }
  gisReq: IReadingReportGISReq = {
    zoneId: 0,
    isCounterState: true,
    counterStateId: 0,
    isKarbariChange: false,
    isAhadChange: false,
    isForbidden: false,
    fromDate: '',
    toDate: '',
    _selectedKindId: '',
    readingPeriodId: null,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: [],
    isCluster: true
  }
  anlzPrfmReq: IMostReportInput = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    _selectedKindId: '',
    year: this.utilsService.getFirstYear(),
    zoneIds: [0]
  }
  dataMiningReq: IMostReportInput = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    zoneIds: null
  }
  trvchReq: IReadingReportTraverseDifferentialReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    readingPeriodId: null,
    _selectedKindId: '',
    year: this.utilsService.getFirstYear(),
    traverseType: 0,
    zoneIds: null,
    fragmentMasterIds: []
  }
  traverseReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    _selectedKindId: '',
    reportCode: 0,
    year: this.utilsService.getFirstYear(),
    fragmentMasterIds: []
  }
  // inStateReq doesn't need _isSeletedKind
  inStateReq: IReadingReportReq = {
    zoneId: 0,
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: this.utilsService.getFirstYear()
  }

  showGisInOrderTo: any[] = [
    {
      id: 'isCounterState',
      title: 'وضعیت کنتور',
      isSelected: true,
      key: 'A'
    },
    {
      id: 'isForbidden',
      title: 'غیر مجاز',
      isSelected: false,
      key: 'B'
    },
    {
      id: 'isAhadChange',
      title: 'تغییر آحاد',
      isSelected: false,
      key: 'C'
    },
    {
      id: 'isKarbariChange',
      title: 'تغییر کاربری',
      isSelected: false,
      key: 'D'
    }
  ]
  _orderByGIS: string = 'isCounterState';
  /* GET*/
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
  getApiUrl = (): string => {
    return this.utilsService.envService.API_URL;
  }
  getAuthToken = (): string => {
    return this.jwtService.getAccessToken();
  }
  receiveFromDateJalali = (variable: ENReadingReports, $event: string) => {
    this[variable].fromDate = $event;
  }
  receiveToDateJalali = (variable: ENReadingReports, $event: string) => {
    this[variable].toDate = $event;
  }


  constructor(
    public utilsService: UtilsService,
    public dictionaryWrapperService: DictionaryWrapperService,
    private jwtService: JwtService,
    private mapService: MapService,
    public profileService: ProfileService,
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  portRRTest = (method: ENInterfaces, val: object): Promise<any> => {
    const res = this.ajaxReqWrapperService.postDataSourceByObject(method, val);
    if (MathS.isNull(res))
      this.emptyMessage();
    return res;
  }
  getDeleteDictionary = (): any[] => {
    return this.utilsService.getDeleteDictionary();
  }
  private datesValidation = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId')) {
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('statusId')) {
      if (MathS.isNull(dataSource['statusId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_statusId);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('isCounterState')) {
      if (this.gisReq.isCounterState === true) {
        if (MathS.isNull(this.gisReq.counterStateId)) {
          this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
          return false;
        }
      }
    }
    return true;
  }
  private periodValidations = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('zoneId'))
      if (MathS.isNull(dataSource['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (dataSource.hasOwnProperty('readingPeriodId'))
      if (MathS.isNull(dataSource['readingPeriodId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_readingPeriod);
        return false;
      }
    if (dataSource.hasOwnProperty('year'))
      if (MathS.isNull(dataSource['year'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_year);
        return false;
      }
    return true;
  }
  private periodValidationGIS = (readingReportGISReq: IReadingReportGISReq): boolean => {
    if (readingReportGISReq.hasOwnProperty('zoneId'))
      if (MathS.isNull(readingReportGISReq['zoneId'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_zone);
        return false;
      }
    if (readingReportGISReq.isForbidden === true) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_forbiddenByDate);
      return false;
    }
    if (readingReportGISReq.isCounterState === true) {
      if (MathS.isNull(readingReportGISReq.counterStateId)) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_counterState);
        return false;
      }
    }
    return true;
  }

  // VerificationS 
  verificationUserKarkard = (readingReportReq: IUserKarkardInput): boolean => {
    return this.datesValidation(readingReportReq);
  }
  verificationRRShared = (readingReportReq: IReadingReportReq, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }
  verificationRRTraverseDifferential = (readingReportReq: IReadingReportTraverseDifferentialReq, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }
  verificationRRDisposalHours = (readingReportReq: IReadingReportReq): boolean => {
    return this.datesValidation(readingReportReq);
  }
  verificationRRGIS = (readingReportGISReq: IReadingReportGISReq, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportGISReq.readingPeriodId = null, this.datesValidation(readingReportGISReq)) : this.periodValidationGIS(readingReportGISReq)
  }
  verificationRRAnalyzePerformance = (readingReportReq: IMostReportInput, isValidateByDate: boolean): boolean => {
    return isValidateByDate ? (readingReportReq.readingPeriodId = null, this.datesValidation(readingReportReq)) : this.periodValidations(readingReportReq)
  }

  // 
  // snack bar
  emptyMessage = () => {
    this.utilsService.snackBarMessageFailed(EN_messages.notFound);
  }
  successSnackMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  routeTo = (route: string) => {
    this.utilsService.routeTo(route);
  }
  linkToStimulsoftAdd = () => {
    window.open(this.utilsService.getAPIUrl() + ENInterfaces.dynamicReportManagerDisplayLinkAdd + this.getAuthToken(), ENInterfaces._blank);
  }
  linkToStimulsoftEdit = (body: any) => {
    window.open(this.utilsService.getAPIUrl() + ENInterfaces.dynamicReportManagerDisplayLinkEdit + '/' + body.id + '/' + ENInterfaces.accessTokenTile + this.getAuthToken(), ENInterfaces._blank);
  }
  linkToStimulsoftView = (body: any) => {
    window.open(this.utilsService.getAPIUrl() + ENInterfaces.dynamicReportManagerDisplayLink + '/' + body.id + + '/' + ENInterfaces.accessTokenTile + this.getAuthToken(), ENInterfaces._blank);
  }
  routeToMapGIS = async (readingReportGISReq: any) => {
    // insert into gis request and should valiation before route to map     
    const temp = await this.portRRTest(ENInterfaces.ListToGis, readingReportGISReq);
    if (temp.length) {
      this.mapService.gisReqAux = readingReportGISReq;
      this.mapService.responseGisAux.value = temp;
      this.utilsService.compositeService.routeToExtras([EN_Routes.wr, readingReportGISReq]);
    }
    else {
      this.utilsService.snackBarMessageWarn(EN_messages.notFound);
    }
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
  showResDialogDynamic = (res: any, options: any): Promise<any> => {
    // disable close mean when dynamic count show decision should make
    return new Promise((resolve) => {
      const dialogRef = this.utilsService.dialog.open(ConfirmDialogExcelViewComponent,
        {
          disableClose: options.disableClose,
          minWidth: '21rem',
          data: {
            data: res,
            title: options.title,
            buttonText: options.buttonText,
            buttonColor: options.buttonColor
          }
        });
      dialogRef.afterClosed().subscribe(async result => {
        console.log(result);

        if (result) {
          resolve(result);
        }
      })
    });
  }
  firstConfirmDialogRemove = (text?: string) => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      text: text,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

  snackEmptyValue = () => {
    this.utilsService.snackBarMessageWarn(EN_messages.notFound);
  }
  snackWarn = (message: string) => {
    this.utilsService.snackBarMessageWarn(message);
  }
  showInMapSingleValidation = (dataSource: any): boolean => {
    if (MathS.isNull(dataSource.gisAccuracy) || parseInt(dataSource.gisAccuracy) > ENRandomNumbers.twoHundred || MathS.isNull(parseInt(dataSource.gisAccuracy))) {
      this.utilsService.snackBarMessageWarn(EN_messages.gisAccuracy_insufficient);
      return false;
    }
    return true;
  }

}
