import { EN_Routes } from 'interfaces/routes.enum';
import { SecurityService } from 'services/security.service';
import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-user-details-history',
  templateUrl: './user-details-history.component.html',
  styleUrls: ['./user-details-history.component.scss']
})
export class UserDetailsHistoryComponent extends FactoryONE {

  constructor(
    private securityService: SecurityService,
    public closeTabService: CloseTabService

  ) {
    super();
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.securityService.userMasterDetailsHistory_pageSign.id) {
      this.securityService.utilsService.routeTo(EN_Routes.userMasterHistory);
    }
    else {
      this.closeTabService.saveDataForUserDetailsHistory = await this.securityService.getDataSourceByQuery(ENInterfaces.UserDetailsHistory, this.securityService.userMasterDetailsHistory_pageSign.id + `/${this.securityService.userMasterDetailsHistory_pageSign.changeOrInsertUserLogId}`);
      this.closeTabService.saveDataForUserMasterDetailsHistoryReq.id = this.securityService.userMasterDetailsHistory_pageSign.id;
    }
  }

}
