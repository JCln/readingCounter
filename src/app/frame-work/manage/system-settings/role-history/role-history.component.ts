import { RoleHistoryDetailsComponent } from './role-history-details/role-history-details.component';
import { IRoleHistory } from 'services/DI/privacies';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-role-history',
  templateUrl: './role-history.component.html',
  styleUrls: ['./role-history.component.scss']
})
export class RoleHistoryComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRoleHistory = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    console.log(this.closeTabService.saveDataForRoleHistory.length);
    if (!this.closeTabService.saveDataForRoleHistory.length) {
      this.closeTabService.saveDataForRoleHistory = await this.securityService.getDataSource(ENInterfaces.RoleHistory);
    }
  }
  showMoreDetails = (data: IRoleHistory) => {
    this.ref = this.dialogService.open(RoleHistoryDetailsComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }

}