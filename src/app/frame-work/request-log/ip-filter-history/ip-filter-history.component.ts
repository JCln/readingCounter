import { Component } from '@angular/core';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { IPrivacy } from 'services/DI/privacies';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { CompareComponent } from './compare/compare.component';

@Component({
  selector: 'app-ip-filter-history',
  templateUrl: './ip-filter-history.component.html',
  styleUrls: ['./ip-filter-history.component.scss']
})
export class IpFilterHistoryComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    await this.closeTabService.getIpFilterHisotry(canRefresh ? canRefresh : false);
  }
  // showMoreDetails = (data: IPrivacy) => {
  //   this.ref = this.dialogService.open(PolicyHistoryDetailsComponent, {
  //     data: data,
  //     rtl: true,
  //     width: '80%'
  //   })
  // }
  showCompare = (data: IPrivacy) => {
    this.ref = this.dialogService.open(CompareComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }

}