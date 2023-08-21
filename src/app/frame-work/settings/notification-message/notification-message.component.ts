import { EnvService } from 'services/env.service';
import { MathS } from 'src/app/classes/math-s';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';
import { INotificationMessage } from 'interfaces/isettings';
import { NotificationAlertTypesList, NotificationMediaTypeList } from 'interfaces/build';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent extends FactoryONE {
  notifFilterDictionaryMedia = [];
  notifFilterDictionaryType = [];

  constructor(
    public profileService: ProfileService,
    public closeTabService: CloseTabService,
    public envService: EnvService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadGet);
    this.showItemOnSearch(-1);
  }

  classWrapper = (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.notificationMessages = [];
    }
    this.insertToEdgeDictionary();
    this.searchInOrderChanged();
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
  addEmptyValueToMediaTypeList = (): void => {
    const find = this.envService.NotificationMediaTypeList.find(item => item.value == -1);
    if (find)
      this.notifFilterDictionaryMedia = this.envService.NotificationMediaTypeList;
    else {
      this.notifFilterDictionaryMedia = this.envService.NotificationMediaTypeList;
      this.notifFilterDictionaryMedia.unshift(
        { title: '', value: -1, titleUnicode: 'بدون فیلتر' },
      );
    }
  }
  addEmptyValueToAlertTypeList = (): void => {
    const find = this.envService.NotificationAlertTypesList.find(item => item.value == -1);
    if (find)
      this.notifFilterDictionaryType = this.envService.NotificationAlertTypesList;
    else {
      this.notifFilterDictionaryType = this.envService.NotificationAlertTypesList;
      this.notifFilterDictionaryType.unshift(
        { title: '', value: -1, titleUnicode: 'بدون فیلتر' }
      )
    }
  }
  insertToEdgeDictionary = () => {
    this.addEmptyValueToMediaTypeList();
    this.addEmptyValueToAlertTypeList();
  }
  doFilter = (selectedIdValue: any): Promise<boolean> => {
    if (!selectedIdValue) {
      selectedIdValue = -1;
    }
    const origin = this.closeTabService.notificationMessages;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (origin) {
          for (let index = 0; index < origin.length; index++) {
            if (selectedIdValue == -1) {
              // no value inserted to filter and should show all
              origin[index].canShow = true;
            }
            else {
              if (origin[index][selectedIdValue] == this.closeTabService.notificationMessagesReq.userInputType) {
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
    if (this.closeTabService.notificationMessagesReq.messageType == -1 ||
      this.closeTabService.notificationMessagesReq.userInputType == -1) {
      selectedIdValue = -1;
    }

    await this.doFilter(selectedIdValue);
  }
  searchInOrderChanged = () => {
    // if type of search change, notificationType should be update or the value should be -1 to better UX
    this.closeTabService.notificationMessagesReq.userInputType = -1;
    this.showItemOnSearch();
  }

}
