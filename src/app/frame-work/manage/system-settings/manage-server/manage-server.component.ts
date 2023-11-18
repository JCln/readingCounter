import { MathS } from 'src/app/classes/math-s';
import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { ENManageServers, IManageServer } from 'interfaces/iserver-manager';
import { ManageServerService } from 'services/manage-server.service';
import { DateJalaliService } from 'services/date-jalali.service';


@Component({
  selector: 'app-manage-server',
  templateUrl: './manage-server.component.html',
  styleUrls: ['./manage-server.component.scss']
})
export class ManageServerComponent implements OnInit {
  manageTasks: IManageServer[];
  private readonly localPass: string = 'XML';

  constructor(
    private manageServerService: ManageServerService,
    private dateJalaliService: DateJalaliService
  ) { }

  ngOnInit(): void {
    this.manageTasks = this.manageServerService.getManageServerItems();
  }
  serverDelete = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          const temp: any = await this.manageServerService.ajaxReqWrapperService.postDataServer(ENInterfaces.serverManagerDelete);
          if (temp)
            this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
        }
        else
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
  }
  linkToHangfire = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          this.manageServerService.linkToHangFire();
        }
        else {
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
        }
      }
    }
  }
  linkToHealthCheck = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          this.manageServerService.linkToHealthCheck();
        }
        else
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
  }
  toggleDbConnection = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          const temp = await this.manageServerService.ajaxReqWrapperService.postDataServer(ENInterfaces.AuthenticityLogToggleDBConnection);
          if (temp)
            this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
        }
        else
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
  }
  resetApp = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          const temp = await this.manageServerService.ajaxReqWrapperService.postDataServer(ENInterfaces.serverManagerResetApp);
          if (temp)
            this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
        }
        else
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
  }
  expireLicense = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insert_Key,
      inputMinLength: 3,
      isDelete: false,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
      }
      else {
        if (await this.manageServerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.settingsExpireLicense, insertedKey)) {
          this.manageServerService.utilsService.snackBarMessageSuccess(EN_messages.done);
        }
      }
    }
  }
  extendLicenseTime = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insert_Key,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
      }
      else {
        if (await this.manageServerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.settingsExtendTime, insertedKey)) {
          this.manageServerService.utilsService.snackBarMessageSuccess(EN_messages.done);
        }
      }
    }
  }
  compressLicenseTime = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insert_Key,
      isDelete: false,
      inputMinLength: 3,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
      }
      else {
        if (await this.manageServerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.settingsExtendTime, insertedKey)) {
          this.manageServerService.utilsService.snackBarMessageSuccess(EN_messages.done);
        }
      }
    }
  }
  checkAuthenticity = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      inputMinLength: 3,
      isDelete: false,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          const res = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.serverManagerCheckAuthenticity);
          this.manageServerService.utilsService.snackBarMessageSuccess(res.message);
        }
        else {
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
        }
      }
    }
  }
  nTPServer = async () => {
    const config = {
      messageTitle: EN_messages.insertLocalKey,
      minWidth: '19rem',
      isInput: true,
      placeHolder: EN_messages.insertLocalKey,
      inputMinLength: 3,
      isDelete: false,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (insertedKey) {
      if (MathS.isNullTextValidation(insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insertLocalKey);
      }
      else {
        if (insertedKey == this.localPass) {
          let res = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.serverManagerNTPServer);
          res = this.dateJalaliService.getDate(res) + '   ' + this.dateJalaliService.getTime(res);
          const config = {
            messageTitle: EN_messages.NTPResult,
            messageTitleTwo: res,
            minWidth: '19rem',
            isInput: false,
            isDelete: false,
            icon: 'pi pi-clock'
          }
          this.manageServerService.utilsService.firstConfirmDialog(config);
        } else
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
  }
  manageFuncs = async (clickFunction: ENManageServers, description: string) => {
    if (this.manageServerService.utilsService.getIsAdminRole()) {
      const config = {
        messageTitle: description,
        minWidth: '19rem',
        isInput: false,
        isDelete: true,
        icon: ''
      }
      if (clickFunction == ENManageServers.serverDelete) {
        config.icon = 'fa fa-eraser';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.serverDelete();
      }
      if (clickFunction == ENManageServers.linkToHangfire) {
        this.linkToHangfire();
      }
      if (clickFunction == ENManageServers.linkToHealthCheck) {
        this.linkToHealthCheck();
      }
      if (clickFunction == ENManageServers.resetApp) {
        config.icon = 'fa fa-desktop';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.resetApp();
      }
      if (clickFunction == ENManageServers.extendLicenseTime) {
        config.icon = 'fas fa-expand-arrows-alt';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.extendLicenseTime();
      }
      if (clickFunction == ENManageServers.compressLicenseTime) {
        config.icon = 'fas fa-compress-arrows-alt';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.compressLicenseTime();
      }
      if (clickFunction == ENManageServers.expireLicense) {
        config.icon = 'pi pi-stopwatch';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.expireLicense();
      }
      if (clickFunction == ENManageServers.checkAuthenticiy) {
        config.icon = 'pi pi-check-square';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.checkAuthenticity();
      }
      if (clickFunction == ENManageServers.ntpServer) {
        config.icon = 'pi pi-clock';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.nTPServer();
      }
      if (clickFunction == ENManageServers.toggleDbConnection) {
        config.icon = 'pi pi-database';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.toggleDbConnection();
      }
      if (clickFunction == ENManageServers.resetIIS) {
        config.icon = 'fa fa-repeat';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.needMoreAccess);//fooling around
      }
      if (clickFunction == ENManageServers.offlineTheAPP) {
        config.icon = 'fa fa-stop-circle';
        if (await this.manageServerService.utilsService.firstConfirmDialog(config))
          this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.needMoreAccess);//fooling around
      }
    }
    else {
      this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.needMoreAccess);
    }
  }

}
