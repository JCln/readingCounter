import { CloseTabService } from 'services/close-tab.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { SecurityService } from 'services/security.service';
import { Component } from '@angular/core';
import { FactoryONE } from 'src/app/classes/factory';
import { UserRoleHistoryDetailsComponent } from '../user-role-history-details/user-role-history-details.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-role-history-summary',
  templateUrl: './user-role-history-summary.component.html',
  styleUrls: ['./user-role-history-summary.component.scss']
})
export class UserRoleHistorySummaryComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public securityService: SecurityService,
    public closeTabService: CloseTabService,
    public dialogService: DialogService
  ) {
    super();
  }

  async classWrapper(canRefresh?: boolean) {
    if (!this.securityService.userRoleHistoryDetails_pageSign.id) {
      this.securityService.utilsService.routeToByUrl(EN_Routes.userRoleHistory);
      return;
    }

    if (canRefresh) {
      this.closeTabService.saveDataForUserRoleHistory = [];
    }
    if (
      !this.closeTabService.saveDataForUserRoleHistory.length ||
      this.closeTabService.saveDataForUserRoleHistorySumReq.id !=
      this.securityService.userRoleHistoryDetails_pageSign.id
    ) {
      this.closeTabService.saveDataForUserRoleHistory = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.UserRoleHistory, this.securityService.userRoleHistoryDetails_pageSign.id);
      this.closeTabService.saveDataForUserRoleHistorySumReq.id = this.securityService.userRoleHistoryDetails_pageSign.id;
    }

  }
  showMoreDetails = (data: any) => {
    this.ref = this.dialogService.open(UserRoleHistoryDetailsComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }

}
