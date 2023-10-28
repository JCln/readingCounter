import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-byuserid',
  templateUrl: './byuserid.component.html',
  styleUrls: ['./byuserid.component.scss']
})
export class ByuseridComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.reqLogUserActivationByUserId = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (!this.securityService.userActivationByUserId_pageSign.GUid) {
      this.securityService.utilsService.backToPreviousPage();
    }
    else {
      if (canRefresh) {
        this.nullSavedSource();
      }
      this.closeTabService.reqLogUserActivationByUserId = await this.securityService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.requestLogUserActivationByUserId, this.securityService.userActivationByUserId_pageSign.GUid);
    }
  }

}