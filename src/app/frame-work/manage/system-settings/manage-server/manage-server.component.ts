import { MathS } from 'src/app/classes/math-s';
import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { ENManageServers, IManageServer } from 'interfaces/iserver-manager';
import { ManageServerService } from 'services/manage-server.service';


@Component({
  selector: 'app-manage-server',
  templateUrl: './manage-server.component.html',
  styleUrls: ['./manage-server.component.scss']
})
export class ManageServerComponent implements OnInit {
  manageTasks: IManageServer[];

  constructor(private manageServerService: ManageServerService) { }

  ngOnInit(): void {
    this.manageTasks = this.manageServerService.getManageServerItems();
  }
  serverDelete = async () => {
    const temp: any = await this.manageServerService.ajaxReqWrapperService.postDataServer(ENInterfaces.serverManagerDelete);
    if (temp)
      this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
  }
  linkToHangfire = () => {
    this.manageServerService.linkToHangFire();
  }
  linkToHealthCheck = () => {
    this.manageServerService.linkToHealthCheck();
  }
  resetApp = async () => {
    const temp = await this.manageServerService.ajaxReqWrapperService.postDataServer(ENInterfaces.serverManagerResetApp);
    if (temp)
      this.manageServerService.showSnack(temp.message, ENSnackBarColors.success);
  }
  expireLicense = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: 'کلید را وارد نمایید',
      inputMinLength: 4,
      isDelete: false,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (MathS.isNullTextValidation(insertedKey)) {
      this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
    }
    else {
      if (await this.manageServerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.settingsExpireLicense, insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageSuccess(EN_messages.done);
      }
    }
  }
  extendLicenseTime = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: 'کلید را وارد نمایید',
      isDelete: false,
      inputMinLength: 4,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (MathS.isNullTextValidation(insertedKey)) {
      this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
    }
    else {
      if (await this.manageServerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.settingsExtendTime, insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageSuccess(EN_messages.done);
      }
    }
  }
  compressLicenseTime = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: 'کلید را وارد نمایید',
      isDelete: false,
      inputMinLength: 4,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (MathS.isNullTextValidation(insertedKey)) {
      this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
    }
    else {
      if (await this.manageServerService.ajaxReqWrapperService.getDataSourceByQuote(ENInterfaces.settingsExtendTime, insertedKey)) {
        this.manageServerService.utilsService.snackBarMessageSuccess(EN_messages.done);
      }
    }
  }
  checkAuthenticity = async () => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: 'کلید را وارد نمایید',
      inputMinLength: 3,
      isDelete: false,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.manageServerService.utilsService.firstConfirmDialog(config);
    if (MathS.isNullTextValidation(insertedKey)) {
      this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
    }
    else {
      if (insertedKey == 'XML') {
        const res = await this.manageServerService.ajaxReqWrapperService.getDataSource(ENInterfaces.serverManagerCheckAuthenticity);
        this.manageServerService.utilsService.snackBarMessageSuccess(res.message);
      }
      else {
        this.manageServerService.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey)
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
