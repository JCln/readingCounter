import { ReqlogUsersLoginsDetailsComponent } from './reqlog-users-logins-details/reqlog-users-logins-details.component';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IUsersLoginBriefInfo } from 'services/DI/privacies';
import { transitionAnimation } from 'src/app/directives/animation.directive';
import { EN_Routes } from 'interfaces/routes.enum';

@Component({
  selector: 'app-reqlog-users-logins',
  templateUrl: './reqlog-users-logins.component.html',
  styleUrls: ['./reqlog-users-logins.component.scss'],
  animations: [transitionAnimation]
})
export class ReqlogUsersLoginsComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.usersLogins = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
      this.verification();
    }
  }
  routeToUserLogginsDetails = (data: IUsersLoginBriefInfo) => {
    this.ref = this.dialogService.open(ReqlogUsersLoginsDetailsComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }
  connectToServer = async () => {
    this.closeTabService.usersLogins = await this.securityService.postDataSource(ENInterfaces.requestLogUsersLogins, this.closeTabService.usersLoginsReq);
  }
  verification = async () => {
    const temp = this.securityService.verificationDates(this.closeTabService.usersLoginsReq);
    if (temp)
      this.connectToServer();
  }

}