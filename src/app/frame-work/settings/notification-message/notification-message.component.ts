import { EnvService } from 'services/env.service';
import { MathS } from 'src/app/classes/math-s';
import { Component, ViewChild } from '@angular/core';
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
  constructor(
    private profileService: ProfileService,
    public closeTabService: CloseTabService,
    public envService: EnvService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.getMyInfoDataSource(ENInterfaces.NotifyManagerUnreadGet);
  }

  classWrapper = (canRefresh?: boolean) => {
   if (canRefresh) {
      this.closeTabService.notificationMessages = [];
    }
    console.log(this.closeTabService.notificationMessages);
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

}
