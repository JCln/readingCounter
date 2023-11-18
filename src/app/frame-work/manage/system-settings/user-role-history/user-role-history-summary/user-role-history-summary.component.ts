import { CloseTabService } from 'services/close-tab.service';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { SecurityService } from 'services/security.service';
import { Component, AfterViewInit } from '@angular/core';
import { UserRoleHistoryDetailsComponent } from '../user-role-history-details/user-role-history-details.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { UserRoleCompareComponent } from '../user-role-compare/user-role-compare.component';
import { IRoleHistory } from 'services/DI/privacies';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-role-history-summary',
  templateUrl: './user-role-history-summary.component.html',
  styleUrls: ['./user-role-history-summary.component.scss']
})
export class UserRoleHistorySummaryComponent implements AfterViewInit {
  ref: DynamicDialogRef;

  constructor(
    public securityService: SecurityService,
    public closeTabService: CloseTabService,
    public dialogService: DialogService
  ) { }

  async classWrapper(canRefresh?: boolean) {
    if (MathS.isNull(this.securityService.userRoleHistoryDetails_pageSign.id)) {
      this.securityService.utilsService.routeToByUrl(EN_Routes.userRoleHistory);
      return;
    }

    if (canRefresh) {
      this.closeTabService.saveDataForUserRoleHistory = [];
    }
    if (
      this.closeTabService.saveDataForUserRoleHistory.length == 0 ||
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
  showCompare = (data: IRoleHistory) => {
    this.securityService.userRoleHistoryDetails_pageSign.changeOrInsertUserLogId = data.changeOrInsertLogId;
    this.ref = this.dialogService.open(UserRoleCompareComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }
  ngAfterViewInit(): void {
    this.classWrapper();
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
}
