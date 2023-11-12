import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { IUserMasterHistory } from 'services/DI/privacies';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-master-history',
  templateUrl: './user-master-history.component.html',
  styleUrls: ['./user-master-history.component.scss']
})
export class UserMasterHistoryComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) {
    super();
  }

  routeToUserDetailsHistory(e: IUserMasterHistory) {
    this.securityService.userMasterDetailsHistory_pageSign.changeOrInsertUserLogId = e.changeOrInsertLogId;
    this.securityService.utilsService.routeTo(EN_Routes.userDetailsHistory);
  }
  routeToUserCompare(e: IUserMasterHistory) {
    this.securityService.userMasterDetailsHistory_pageSign.changeOrInsertUserLogId = e.changeOrInsertLogId;
    this.securityService.utilsService.routeTo(EN_Routes.userCompare);
  }
  nullSavedSource = () => this.closeTabService.saveDataForUserMasterHistory = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.securityService.userMasterDetailsHistory_pageSign.id) {
      this.securityService.utilsService.routeToByUrl(EN_Routes.userRoleHistory);
      return;
    }

    if (canRefresh) {
      this.closeTabService.saveDataForUserMasterHistory = [];
    }

    if (
      !this.closeTabService.saveDataForUserMasterHistory ||
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id !=
      this.securityService.userMasterDetailsHistory_pageSign.id
    ) {
      this.closeTabService.saveDataForUserMasterHistory = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.UserMasterHistory, this.securityService.userMasterDetailsHistory_pageSign.id);
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id = this.securityService.userMasterDetailsHistory_pageSign.id;
    }
  }

}