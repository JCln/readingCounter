import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { INotificationAlertTypes } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-notif-list-bydate',
  templateUrl: './notif-list-bydate.component.html',
  styleUrls: ['./notif-list-bydate.component.scss'],
  animations: [transitionAnimation]
})
export class NotifListBydateComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) {
    super();
  }

  classWrapper = async () => {
  }
  convertIdToTitle = (dataSource: any, dictionary: INotificationAlertTypes[], toConvert: string) => {
    dictionary.map(dictionary => {
      dataSource.map(dataSource => {
        if (dictionary.value == dataSource[toConvert])
          dataSource[toConvert] = dictionary.titleUnicode;
      })
    });
  }
  connectToServer = async () => {
    this.closeTabService.notificationListByDate = await this.securityService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.NotifyManagerListByDate, this.closeTabService.notificationListByDateReq);

    this.convertIdToTitle(this.closeTabService.notificationListByDate, this.closeTabService.utilsService.getNotificationMediaTypes(), 'notificationMediaTypeId')
    this.convertIdToTitle(this.closeTabService.notificationListByDate, this.closeTabService.utilsService.getNotificationAlertTypes(), 'alertTypeId')
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.notificationListByDateReq);
    if (temp)
      this.connectToServer();
  }
  showMoreDetails = (dataSource: any) => {
    if (dataSource.notificationMediaTypeId == 'متن') {
      this.closeTabService.utilsService.snackWrapperService.openTextDialog(dataSource);
    }
    if (dataSource.notificationMediaTypeId == 'تصویر') {
      this.closeTabService.utilsService.snackWrapperService.openImgDialog(dataSource);
    }
    if (dataSource.notificationMediaTypeId == 'ویدیو') {
      this.closeTabService.utilsService.snackWrapperService.openVideoDialog(dataSource);
    }
    if (dataSource.notificationMediaTypeId == 'صوت') {

    }
  }

}