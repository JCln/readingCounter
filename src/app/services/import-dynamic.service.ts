import { VerificationService } from './verification.service';
import { ColumnManager } from 'src/app/classes/column-manager';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSelectedColumnVariables, EN_messages, IMasrafStates } from 'interfaces/enums.enum';
import { IAssessAddDtoSimafa, IReadingConfigDefault } from 'interfaces/iimports';
import {
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
import { UtilsService } from './utils.service';
import { PageSignsService } from './page-signs.service';
import { AllImportsService } from './all-imports.service';

@Injectable({
  providedIn: 'root'
})
export class ImportDynamicService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

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
    counterReaderId: '',
    displayPreDate: false,
    displayMobile: false,
    hasImage: false,
    displayDebt: false,
    displayIcons: false,
  }
  private _simafaSingleReq: IReadingProgramRes;

  constructor(
    public utilsService: UtilsService,
    public columnManager: ColumnManager,
    private allImportsService: AllImportsService,
    public pageSignsService: PageSignsService,
    public profileService: ProfileService,
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public verificationService: VerificationService
  ) { }

  columnSimafaSingle = () => {
    return this._simafaSingleReq;
  }
  columnSimafaBatch = (): IObjectIteratation[] => {
    return this.columnManager._simafaBatch;
  }
  columnSetSimafaBatch = (val: IObjectIteratation) => {
    this.columnManager._simafaBatch.push(val);
  }
  columnRemoveSimafaBatch = () => {
    const a = this.columnManager._simafaBatch.filter(item => {
      return !(item.field == 'trackNumber' || item.field == 'count')
    })
    this.columnManager._simafaBatch = a;
  }
  columnGetSimafaRDPG = (): IImportSimafaReadingProgramsReq => {
    return this.simafaRDPGReq;
  }
  noRouteToImportMessage = () => this.utilsService.snackBarMessageWarn(EN_messages.import_NoRouteAvailable);

  routeToSimafaSingle = (object: IReadingProgramRes) => {
    this.pageSignsService.simafaSingle_pageSign.UUID = object.id;
    this.pageSignsService.simafaSingle_pageSign.zoneId = object.zoneId;
    this.pageSignsService.simafaSingle_pageSign.readingPeriodId = object.readingPeriodId;
    this.pageSignsService.simafaSingle_pageSign.year = object.year;
    this.pageSignsService.simafaSingle_pageSign._canShowAddButton = true;

    this.utilsService.routeTo(EN_Routes.wrimpsimafardpgsingle);
  }
  routeToSimafa = () => {
    this.utilsService.compositeService.routeTo(EN_Routes.wrimpsimafardpg);
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
    this.allImportsService.allImports_batch._canShowImportBatchButton = true; // make to imported button enable/ show
    this.utilsService.routeTo(EN_Routes.wrimpsimafardpgbatch);
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
  insertToSimafaRdpgReq = (body: IImportSimafaReadingProgramsReq) => {
    this.simafaRDPGReq = body;
  }
  setSimafaSingleReq = (dataSourceReq: IReadingProgramRes) => {
    this._simafaSingleReq = dataSourceReq;
  }

}
