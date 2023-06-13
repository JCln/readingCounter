import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-policy-history',
  templateUrl: './policy-history.component.html',
  styleUrls: ['./policy-history.component.scss']
})
export class PolicyHistoryComponent extends FactoryONE {
  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForPoliciesHistory = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForPoliciesHistory) {
      this.closeTabService.saveDataForPoliciesHistory = await this.securityService.getDataSource(ENInterfaces.policiesHistory);
    }
  }


}