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
  notifFilterDictionaryMedia = [];
  notifFilterDictionaryType = [];
  private noFilter: number = -1;
  readonly noFilterValue = { title: '', value: this.noFilter, titleUnicode: 'بدون فیلتر' };

  constructor(
    public profileService: ProfileService,
    public closeTabService: CloseTabService,
    public envService: EnvService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.ajaxReqWrapperService.getDataSource(ENInterfaces.NotifyManagerUnreadGet);
    this.showItemOnSearch(this.noFilter);
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
    const mediaList = this.envService.NotificationMediaTypeList;
    const find = mediaList.find(item => item.value == this.noFilter);
    if (find)
      this.notifFilterDictionaryMedia = mediaList;
    else {
      this.notifFilterDictionaryMedia = mediaList;
      this.notifFilterDictionaryMedia.unshift(this.noFilterValue);
    }
  }
  addEmptyValueToAlertTypeList = (): void => {
    const alertList = this.envService.NotificationAlertTypesList;
    const find = alertList.find(item => item.value == this.noFilter);
    if (find)
      this.notifFilterDictionaryType = alertList;
    else {
      this.notifFilterDictionaryType = alertList;
      this.notifFilterDictionaryType.unshift(this.noFilterValue);
    }
  }
  insertToEdgeDictionary = () => {
    this.addEmptyValueToMediaTypeList();
    this.addEmptyValueToAlertTypeList();
  }
  doFilter = (selectedIdValue: any): Promise<boolean> => {
    if (!selectedIdValue) {
      selectedIdValue = this.noFilter;
    }
    const origin = this.closeTabService.notificationMessages;
    return new Promise((resolve) => {
      setTimeout(() => {
        if (origin) {
          for (let index = 0; index < origin.length; index++) {
            if (selectedIdValue == this.noFilter) {
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
    if (this.closeTabService.notificationMessagesReq.messageType == this.noFilter ||
      this.closeTabService.notificationMessagesReq.userInputType == this.noFilter) {
      selectedIdValue = this.noFilter;
    }

    await this.doFilter(selectedIdValue);
  }

  searchInOrderChanged = () => {
    // if type of search change, notificationType should be update or the value should be -1 to better UX
    this.closeTabService.notificationMessagesReq.userInputType = this.noFilter;
    this.showItemOnSearch();
  }

}
