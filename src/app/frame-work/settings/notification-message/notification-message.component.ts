import { EnvService } from 'services/env.service';
import { MathS } from 'src/app/classes/math-s';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { INotificationMessage } from 'interfaces/isettings';
import { NotificationMediaTypeIds, NotificationMediaTypeList } from 'interfaces/build';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent extends FactoryONE {
  edgeFilterDictionary = [];
  messageType: any;
  userInputType: number = -1;

  constructor(
    public profileService: ProfileService,
    public closeTabService: CloseTabService,
    public envService: EnvService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadGet);
    // this.insertToEdgeDictionary();
    // this.showItemOnSearch();
  }

  classWrapper = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.notificationMessages = [];
    }
    if (MathS.isNull(this.closeTabService.notificationMessages)) {
      this.connectToServer();
    }

  }
  confirmDelivery = async (object: INotificationMessage) => {
    const a = await this.profileService.ajaxReqWrapperService.postDataSourceByIdStringly(ENInterfaces.NotifyManagerConfirmDelivery, object.id);
    if (a) {
      this.profileService.showMessage(a.message);
      object.deliverConfirm = true;
    }
  }
  openNotifyType = (message: any) => {
    switch (message.notificationMediaTypeId) {
      case this.envService.NotificationMediaTypeIds.image:
        this.closeTabService.utilsService.snackWrapperService.openImgDialog(message);
        break;
      case this.envService.NotificationMediaTypeIds.video:
        this.closeTabService.utilsService.snackWrapperService.openVideoDialog(message);
        break;
      case this.envService.NotificationMediaTypeIds.text:
        this.closeTabService.utilsService.snackWrapperService.openTextDialog(message);
        break;

      default:
        break;
    }
  }
  addEmptyValueToMediaTypeList = () => {//: any[]
    console.log(this.envService.NotificationMediaTypeList);

    // return this.envService.NotificationMediaTypeList.unshift(
    //   { title: '', value: -1, titleUnicode: 'بدون فیلتر' },
    // );
  }
  addEmptyValueToAlertTypeList = () => {//: any[]
    console.log(this.envService.NotificationMediaTypeList);

    // return this.envService.NotificationAlertTypesList.unshift(
    //   { title: '', value: -1, titleUnicode: 'بدون فیلتر' },        
    // );
  }
  insertToEdgeDictionary = () => {

    if (this.messageType == NotificationMediaTypeIds) {
      this.addEmptyValueToMediaTypeList();
    }
    else {
      this.addEmptyValueToAlertTypeList();
    }
  }
  doFilter = (selectedIdValue: number): Promise<boolean> => {
    const origin = this.closeTabService.notificationMessages;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (origin) {
          for (let index = 0; index < origin.length; index++) {
            if (this.userInputType == -1) {
              // no value inserted to filter and should show all
              origin[index].canShow = true;
            }
            else {
              if (origin[index][this.messageType] == selectedIdValue) {
                origin[index].canShow = true;
              }
              else {
                origin[index].canShow = false;
              }
            }
          }
        }
        resolve(true);
      }, 0);
    });
  }
  // showItemOnSearch = async (val?: any, selectedIdValue?: any) => {
  //   console.log(val);
  //   console.log(selectedIdValue);

  //   await this.doFilter(selectedIdValue.value);
  // }


}
