import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
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
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.notificationListByDate = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
    // this.convertIdToTitle();
  }
  connectToServer = async () => {
    this.closeTabService.notificationListByDate = await this.securityService.postDataSource(ENInterfaces.NotifyManagerListByDate, this.closeTabService.notificationListByDateReq);
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.notificationListByDateReq);
    if (temp)
      this.connectToServer();
  }
  // convertIdToTitle = (): any => {
  //   console.log(this.closeTabService.utilsService.getNotificationAlertTypesIds()[0]);

  //   this.closeTabService.notificationListByDate.forEach(origin => {
  //     this.closeTabService.utilsService.getNotificationAlertTypesIds().forEach((item, index) => {
  //       if (origin.alertTypeId == item[index]) {
  //         console.log(item);
  //         origin.alertTypeId = item[index];
  //       }
  //     })
  //   })
  // }


}