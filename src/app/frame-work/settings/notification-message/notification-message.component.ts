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
  // userInputValue: any = { titleUnicode: 'نوع پیام', title: '', value: 'notificationMediaTypeId', insertedValue: '' };
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
  // insertToEdgeDictionary = () => {
  //   console.log(this.userInputValue);

  //   if (this.userInputValue.value == 'notificationMediaTypeId') {
  //     this.edgeFilterDictionary = this.envService.NotificationMediaTypeList;
  //     this.userInputValue.value = 'notificationMediaTypeId';
  //   }
  //   else {
  //     this.edgeFilterDictionary = this.envService.NotificationAlertTypesList;
  //     this.userInputValue.value = 'alertTypeId';
  //   }
  // }
  // doFilter = (selectedIdValue: number): Promise<boolean> => {
  //   const origin = this.closeTabService.notificationMessages;
  //   return new Promise((resolve) => {
  //     console.log(selectedIdValue);
  //     console.log(this.messageType);
  //     console.log(origin[0][this.messageType] == selectedIdValue);
  //     console.log(origin[1][this.messageType] == selectedIdValue);

  //     setTimeout(() => {
  //       if (origin) {
  //         for (let index = 0; index < origin.length; index++) {
  //           if (this.userInputType == -1) {
  //             // no value inserted to filter and should show all
  //             origin[index].canShow = true;
  //           }
  //           else {
  //             if (origin[index][this.messageType] == selectedIdValue) {
  //               origin[index].canShow = true;
  //             }
  //             else {
  //               origin[index].canShow = false;
  //             }
  //           }
  //         }
  //       }
  //       resolve(true);
  //     }, 0);
  //   });
  // }
  // showItemOnSearch = async (val?: any, selectedIdValue?: any) => {
  //   console.log(val);
  //   console.log(selectedIdValue);

  //   await this.doFilter(selectedIdValue.value);
  // }


}
