import { EnvService } from 'services/env.service';
import { MathS } from 'src/app/classes/math-s';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { INotificationMessage } from 'interfaces/isettings';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent extends FactoryONE {
  edgeFilterDictionary = [];
  userInputValue: any = { name: 'نوع پیام', value: 'notificationMediaTypeId', insertedValue: '' };
  userInputType: number = -1;

  constructor(
    public profileService: ProfileService,
    public closeTabService: CloseTabService,
    public envService: EnvService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.getMyInfoDataSource(ENInterfaces.NotifyManagerUnreadGet);
    this.insertToEdgeDictionary(this.profileService.searchInOrderNotificationMessages[0]);
    this.showItemOnSearch();
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
    const a = await this.profileService.postDataSourceByQuery(ENInterfaces.NotifyManagerConfirmDelivery, object.id);
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
  insertToEdgeDictionary = (number: any) => {
    if (this.userInputValue.value == 'notificationMediaTypeId') {
      this.edgeFilterDictionary = this.envService.NotificationMediaTypeList;
    }
    else {
      this.edgeFilterDictionary = this.envService.NotificationAlertTypesList;
    }
  }
  showItemOnSearch = () => {
    const origin = this.closeTabService.notificationMessages;
    if (origin) {
      for (let index = 0; index < origin.length; index++) {
        if (this.userInputType == -1) {
          // no value inserted to filter and should show all
          origin[index].canShow = true;
        }
        else {
          if (origin[index][this.userInputValue.value].toString().includes(this.userInputType)) {
            origin[index].canShow = true;
          }
          else {
            origin[index].canShow = false;
          }
        }

      }
    }
  }


}
