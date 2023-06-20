import { MathS } from 'src/app/classes/math-s';
import { INotificationMessage } from 'interfaces/isettings';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ProfileService } from 'services/profile.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss']
})
export class NotificationMessageComponent extends FactoryONE {
  constructor(
    private profileService: ProfileService,
    public closeTabService: CloseTabService
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.notificationMessages = await this.profileService.getMyInfoDataSource(ENInterfaces.NotifyManagerUnreadGet);
  }

  classWrapper = (canRefresh?: boolean) => {
    console.log(canRefresh);

    if (canRefresh) {
      console.log(1);

      this.closeTabService.notificationMessages = [];
    }
    console.log(this.closeTabService.notificationMessages);
    console.log(MathS.isNull(this.closeTabService.notificationMessages));

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

}
