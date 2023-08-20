import { EnvService } from 'services/env.service';
import { MathS } from 'src/app/classes/math-s';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { INotificationMessage } from 'interfaces/isettings';
import { NotificationMediaTypeList } from 'interfaces/build';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent extends FactoryONE {
  edgeFilterDictionary = [];
  edgeFilterDictionaryTwo = [];
  messageType: any = -1;
  userInputType: any = -1;

  constructor(
    public profileService: ProfileService,
    public closeTabService: CloseTabService,
    public envService: EnvService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadGet);
    this.insertToEdgeDictionary();
    this.showItemOnSearch(-1);
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
  addEmptyValueToMediaTypeList = (): any => {
    console.log(this.envService.NotificationMediaTypeList);
    if (this.envService.NotificationMediaTypeList[0].value == -1)
      return this.envService.NotificationMediaTypeList;
    else {
      return this.envService.NotificationMediaTypeList.unshift(
        { title: '', value: -1, titleUnicode: 'بدون فیلتر' },
      );
    }
  }
  addEmptyValueToAlertTypeList = (): any => {
    if (this.envService.NotificationAlertTypesList[0].value == -1)
      return this.envService.NotificationAlertTypesList;
    else {
      return this.envService.NotificationAlertTypesList.unshift(
        { title: '', value: -1, titleUnicode: 'بدون فیلتر' },
      );
    }
  }
  insertToEdgeDictionary = () => {
    // -1 mean witout filter then filter should ignored and all data should showed
    if (this.messageType == -1) {
      this.edgeFilterDictionary = [];
    }
    if (this.messageType == 1) {
      this.edgeFilterDictionary = this.addEmptyValueToMediaTypeList();
    }
    if (this.messageType == 2) {
      this.edgeFilterDictionaryTwo = this.addEmptyValueToAlertTypeList();
    }
    console.log(this.edgeFilterDictionary);
    console.log(this.edgeFilterDictionaryTwo);

  }
  doFilter = (selectedIdValue: any): Promise<boolean> => {
    const origin = this.closeTabService.notificationMessages;
    console.log(selectedIdValue);
    console.log(this.userInputType);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (origin) {
          for (let index = 0; index < origin.length; index++) {
            if (selectedIdValue == -1) {
              // no value inserted to filter and should show all
              origin[index].canShow = true;
            }
            else {
              if (origin[index][selectedIdValue] == this.userInputType) {
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
  showItemOnSearch = async (selectedIdValue?: any) => {
    await this.doFilter(selectedIdValue);
  }


}
