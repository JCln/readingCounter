import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-role-history',
  templateUrl: './role-history.component.html',
  styleUrls: ['./role-history.component.scss']
})
export class RoleHistoryComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRoleHistory = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForRoleHistory.length) {
      this.closeTabService.saveDataForRoleHistory = await this.securityService.getDataSource(ENInterfaces.RoleHistory);
    }
  }

}