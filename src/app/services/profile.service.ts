import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENLocalStorageNames, EN_messages } from 'interfaces/enums.enum';
import { IChangePassword } from 'interfaces/inon-manage';
import { DownloadManagerService } from 'services/download-manager.service';
import { UtilsService } from 'services/utils.service';
import { JwtService } from 'src/app/auth/jwt.service';
import { ColumnManager } from 'src/app/classes/column-manager';

import { MathS } from '../classes/math-s';
import { LocalClientConfigsService } from './local-client-configs.service';
import { ENFontFamily, ENFontFamilyExactName, ENFontStyle } from 'interfaces/istyles';

export interface imageOption {
  width: string,
  height: string,
  objectFit: string,
}
export interface IOutputConfig {
  shouldFilteredValue: boolean,
  shouldFreezeHeader: boolean,
  defaultColWidth: number,
  defaultFontFamily: ENFontFamilyExactName
}
export interface ITableDetails {
  selectedAggregate: string,
  selectedAggregateMaster: string,
  selectedAggregateSimpleSearch: string,
  flag: boolean,
  hasGeneralSearch: boolean,
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  showStateVals = {
    groupImgs: false,
    searchBasedOnDate: false,
    hasCanclableSpinner: false,
    defaultFontStyle: 1,
    defaultFontFamily: ENFontFamily.BLotus,// value of default is sync with font.service.ts
    reOrderableTable: false,
    twoStepsAuth: false,
    virtualScrollStatus: false,
    notifyPosition: 'top-right',
    imgOptions: {
      width: '40rem',
      height: '40rem',
      objectFit: 'contain'
    },
    outputConfig: {
      shouldFilteredValue: false,
      shouldFreezeHeader: false,
      defaultColWidth: 13,
      defaultFontFamily: ENFontFamilyExactName.BKoodak
    }
  }

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    private utilsService: UtilsService,
    public columnManager: ColumnManager,
    private localClientConfigsService: LocalClientConfigsService,
    private jwtService: JwtService,
    private downloadManagerService: DownloadManagerService
  ) { }
  searchInOrderNotificationMessages: any[] = [
    { title: '', value: -1, titleUnicode: 'بدون فیلتر' },
    { title: 'notificationMediaTypeId', value: 1, titleUnicode: 'نوع پیام' },
    { title: 'alertTypeId', value: 2, titleUnicode: 'نوع اعلان' }
  ]
  getToken = (): string => {
    return this.jwtService.getAccessToken();
  }
  getUseCarouselMedia = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.shouldUseCarouselGallery, false);
  }
  getImg = (): any => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.imageOption,
      {
        width: '40rem',
        height: '40rem',
        objectFit: 'contain'
      });
  }
  downloadImg = (src: any) => {
    this.downloadManagerService.downloadImg(src);
  }
  setImg = (imageOption: imageOption) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.imageOption, imageOption);
  }
  setOutputConfigs = (val: IOutputConfig) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.outputConfigs, val);
  }
  setUseCarouselMedia = (useCarousel: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.shouldUseCarouselGallery, useCarousel);
  }
  setLocalValue = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.shouldUseBaseOnDate, bol);
  }
  setLocalNotifyPosition = (val: string) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.notifyPosition, val);
  }
  setLocalReOrderable = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.reOrderableTable, bol);
  }
  setLocalVirtuallScrollStatus = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.virtuallScrollable, bol);
  }
  setLocaldefaultAggregateTracks = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.defaultAggregateTracks, bol);
  }
  setLocalTableGeneralSearch = (bol: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.tablesGeneralSearch, bol);
  }
  setCanclableSpinner = (hasCanclableSpinner: boolean) => {
    this.localClientConfigsService.saveToLocalStorage(ENLocalStorageNames.hasCanclableSpinner, hasCanclableSpinner);
  }
  setFontStyle = (fontStyle: number) => {
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.fontStyle, fontStyle);
  }
  setFontFamily = (name: string) => {
    console.log(name);
    
    this.localClientConfigsService.saveToLocalStorageType(ENLocalStorageNames.fontFamily, name);
  }
  getLocalValue = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.shouldUseBaseOnDate, false);
  }
  getTwoStepsAuth = async (): Promise<any> => {
    // TODO return from server value
    this.showStateVals.twoStepsAuth = await this.ajaxReqWrapperService.getDataSource(ENInterfaces.getTwoStepAuth);
  }
  getLocalNotifyPosition = (): string => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.notifyPosition, 'top-right');
  }
  getLocalReOrderable = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.reOrderableTable, this.utilsService.envService.reOrderableTable);
  }
  getLocalVirtuallScrollStatus = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.virtuallScrollable, false);
  }
  getLocalDefaultAggregateTracks = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.defaultAggregateTracks, this.utilsService.envService.defaultAggregateTracks);
  }
  getHasCanclableSpinner = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorage(ENLocalStorageNames.hasCanclableSpinner, this.utilsService.envService.hasCanclableSpinner);
  }
  getFontStyle = (): number => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.fontStyle, ENFontStyle.fontXS);
  }
  getOutputConfigs = (): IOutputConfig => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.outputConfigs,
      {
        shouldFilteredValue: false,
        shouldFreezeHeader: false,
        defaultColWidth: 13,
        defaultFontFamily: ENFontFamilyExactName.BKoodak
      }
    );
  }
  getFontFamily = (): ENFontFamily => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.fontFamily, ENFontFamily.BLotus);
  }
  getTableGeneralSearch = (): boolean => {
    return this.localClientConfigsService.getFromLocalStorageType(ENLocalStorageNames.tablesGeneralSearch, false);
  }
  verification = (password: IChangePassword) => {
    if (MathS.isNull(password.oldPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (MathS.isNull(password.newPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (MathS.isNull(password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.allowed_empty);
      return false;
    }
    if (!MathS.isExactEqual(password.newPassword, password.confirmPassword)) {
      this.utilsService.snackBarMessageWarn(EN_messages.password_notExactly);
      return false;
    }
    return true;
  }
  showMessage = (message: string) => {
    this.utilsService.snackBarMessageSuccess(message);
  }
  changePassword = async (password: IChangePassword): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_yourPassword,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'fas fa-user-lock'
    }
    if (this.verification(password)) {
      if (await this.utilsService.firstConfirmDialog(a)) {
        const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.changePassword, password);
        if (res)
          this.showMessage(res.message);
      }
    }
  }
  setTwoStepsStatus = async (status: boolean): Promise<any> => {
    const messageTitle: string = status ? EN_messages.twoStepsAuthEnabledWarn : EN_messages.twoStepsAuthDisabledWarn;
    const a = {
      messageTitle: messageTitle,
      text: EN_messages.areYouSure,
      minWidth: '19rem',
      isInput: false,
      isDelete: false,
      icon: 'fas fa-user-check'
    }
    if (await this.utilsService.firstConfirmDialog(a)) {
      const req = { twoStepAuthenticationValue: status };
      const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.changeTwoStepAuth, req);
      this.showMessage(res.message);
    }
  }
  resetAllSavedLocals = async (): Promise<any> => {
    const a = {
      messageTitle: EN_messages.ResetLocalStorage,
      minWidth: '20rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-refresh'
    }
    if (await this.utilsService.firstConfirmDialog(a))
      this.jwtService.removeAllExceptAuths();
  }
  // TODO: get access aggregating from trackingManager(کارتابل)
  _agg: ITableDetails = {
    selectedAggregate: 'listNumber',
    selectedAggregateMaster: 'zoneTitle',
    selectedAggregateSimpleSearch: 'listNumber',
    flag: this.getLocalDefaultAggregateTracks(),
    hasGeneralSearch: this.getTableGeneralSearch()
  }

}
