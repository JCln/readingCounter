import { PolicyHistoryDetailsComponent } from './policy-history-details/policy-history-details.component';
import { IPrivacy } from 'services/DI/privacies';
import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-policy-history',
  templateUrl: './policy-history.component.html',
  styleUrls: ['./policy-history.component.scss']
})
export class PolicyHistoryComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForPoliciesHistory = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForPoliciesHistory.length) {
      this.closeTabService.saveDataForPoliciesHistory = await this.securityService.getDataSource(ENInterfaces.policiesHistory);
    }
  }
  showMoreDetails = (data: IPrivacy) => {
    this.ref = this.dialogService.open(PolicyHistoryDetailsComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }

}