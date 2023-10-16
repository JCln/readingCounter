import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { IPrivacy } from 'services/DI/privacies';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { IOPolicyHistoryCompareComponent } from './io-policy-history-compare/io-policy-history-compare.component';

@Component({
  selector: 'app-input-output-policy-history',
  templateUrl: './input-output-policy-history.component.html',
  styleUrls: ['./input-output-policy-history.component.scss']
})
export class InputOutputPolicyHistoryComponent extends FactoryONE {
  ref: DynamicDialogRef;

  constructor(
    public closeTabService: CloseTabService,
    public securityService: SecurityService,
    private dialogService: DialogService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.IOPolicyHistory = [];
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (MathS.isNull(this.closeTabService.IOPolicyHistory)) {
      this.closeTabService.IOPolicyHistory = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIOPolicy);
    }
  }
  // showMoreDetails = (data: IPrivacy) => {
  //   this.ref = this.dialogService.open(PolicyHistoryDetailsComponent, {
  //     data: data,
  //     rtl: true,
  //     width: '80%'
  //   })
  // }
  showCompare = (data: IPrivacy) => {
    this.ref = this.dialogService.open(IOPolicyHistoryCompareComponent, {
      data: data,
      rtl: true,
      width: '80%'
    })
  }

}