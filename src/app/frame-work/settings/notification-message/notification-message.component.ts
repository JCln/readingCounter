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
  messageType: any;
  userInputType: any;
  // _updateObjectDropdown is just for change name interactively
  _updateObjectDropdown;

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
  addEmptyValueToMediaTypeList = (): any[] => {
    console.log(this.envService.NotificationMediaTypeList);
    return [
      { title: 'text', value: 0, titleUnicode: 'متن' },
      { title: 'image', value: 1, titleUnicode: 'تصویر' },
      { title: 'video', value: 2, titleUnicode: 'ویدیو' },
      { title: 'audio', value: 4, titleUnicode: 'صوت' },
    ]
    // return this.envService.NotificationMediaTypeList.unshift(
    //   { title: '', value: -1, titleUnicode: 'بدون فیلتر' },
    // );
  }
  addEmptyValueToAlertTypeList = (): any[] => {
    console.log(this.envService.NotificationMediaTypeList);
    return [
      { title: 'confidential', value: 0, titleUnicode: 'محرمانه' },
      { title: 'ordinary', value: 1, titleUnicode: 'عادی' },
      { title: 'sensitive', value: 2, titleUnicode: 'حساس' },
      { title: 'memory_full', value: 4, titleUnicode: 'حافظه' },
      { title: 'security', value: 8, titleUnicode: 'امنیتی' },
      { title: 'license', value: 16, titleUnicode: 'مجوز دسترسی' },
      { title: 'incorrect_time', value: 32, titleUnicode: 'زمان نادرست' },
    ]
    // return this.envService.NotificationAlertTypesList.unshift(
    //   { title: '', value: -1, titleUnicode: 'بدون فیلتر' },        
    // );
  }
  insertToEdgeDictionary = () => {
    // -1 mean witout filter then filter should ignored and all data should showed
    console.log(this.messageType);

    if (this.messageType == -1) {

    }
    if (this.messageType == 'notificationMediaTypeId') {
      this.edgeFilterDictionary = this.addEmptyValueToMediaTypeList();
    }
    else {
      this.edgeFilterDictionary = this.addEmptyValueToAlertTypeList();
    }
  }
  doFilter = (selectedIdValue: number): Promise<boolean> => {
    const origin = this.closeTabService.notificationMessages;
    console.log(this.userInputType);

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
  showItemOnSearch = async (val?: any, selectedIdValue?: any) => {
    console.log(selectedIdValue);

    await this.doFilter(selectedIdValue.value);
  }


}
