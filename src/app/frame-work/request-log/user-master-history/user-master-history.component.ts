import { AfterViewInit, Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_Routes } from 'interfaces/routes.enum';
import { IUserMasterHistory } from 'services/DI/privacies';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-user-master-history',
  templateUrl: './user-master-history.component.html',
  styleUrls: ['./user-master-history.component.scss']
})
export class UserMasterHistoryComponent implements AfterViewInit {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) { }

  routeToUserDetailsHistory(e: IUserMasterHistory) {
    this.securityService.userMasterDetailsHistory_pageSign.changeOrInsertUserLogId = e.changeOrInsertLogId;
    this.securityService.utilsService.routeTo(EN_Routes.userDetailsHistory);
  }
  nullSavedSource = () => this.closeTabService.saveDataForUserMasterHistory = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (MathS.isNull(this.securityService.userMasterDetailsHistory_pageSign.id)) {
      this.securityService.utilsService.routeToByUrl(EN_Routes.userRoleHistory);
      return;
    }

    if (canRefresh) {
      this.closeTabService.saveDataForUserMasterHistory = [];
    }

    if (
      MathS.isNull(this.closeTabService.saveDataForUserMasterHistory) ||
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id !=
      this.securityService.userMasterDetailsHistory_pageSign.id
    ) {
      this.closeTabService.saveDataForUserMasterHistory = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.UserMasterHistory, this.securityService.userMasterDetailsHistory_pageSign.id);
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id = this.securityService.userMasterDetailsHistory_pageSign.id;
    }
  }

  ngAfterViewInit(): void {
    this.classWrapper();
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
}