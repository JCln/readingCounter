import { INotificationMessage } from 'interfaces/isettings';
import { Component, OnInit } from '@angular/core';
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
  test: any = [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "notificationMediaTypeId": 0,
      "alertTypeId": 0,
      "fileRepositoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "caption": "caption",
      "sender": "sender",
      "receiver": "receiver",
      "insertDateTimeJalali": "1402/03/10",
      "deliverConfirm": true,
      "deliverDateTimeJalali": "1402/03/10"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "notificationMediaTypeId": 1,
      "alertTypeId": 0,
      "fileRepositoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "caption": "caption",
      "sender": "sender",
      "receiver": "receiver",
      "insertDateTimeJalali": "1402/03/10",
      "deliverConfirm": true,
      "deliverDateTimeJalali": "1402/03/10"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "notificationMediaTypeId": 2,
      "alertTypeId": 0,
      "fileRepositoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "caption": "caption",
      "sender": "sender",
      "receiver": "receiver",
      "insertDateTimeJalali": "1402/03/10",
      "deliverConfirm": false,
      "deliverDateTimeJalali": "1402/03/10"
    },
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "notificationMediaTypeId": 4,
      "alertTypeId": 0,
      "fileRepositoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "caption": "caption",
      "sender": "sender",
      "receiver": "receiver",
      "insertDateTimeJalali": "1402/03/10",
      "deliverConfirm": false,
      "deliverDateTimeJalali": "1402/03/10"
    },
  ]
  constructor(
    private profileService: ProfileService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (!this.closeTabService.notificationMessages)
      // this.closeTabService.notificationMessages = await this.profileService.getMyInfoDataSource(ENInterfaces.NotifyManagerUnreadGet);
      this.closeTabService.notificationMessages = this.test;
    console.log(this.closeTabService.notificationMessages);

  }
  confirmDelivery = async (object: INotificationMessage) => {
    console.log(object);

    // const a = await this.profileService.postDataSourceByQuery(ENInterfaces.NotifyManagerConfirmDelivery, object.id);
    // if (a) {
    //   this.profileService.showMessage(a.message);
    // }
  }


}
