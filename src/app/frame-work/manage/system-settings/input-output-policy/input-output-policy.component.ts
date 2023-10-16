import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENRandomNumbers, ENSnackBarTimes, ENSnackBarColors } from 'interfaces/ioverall-config';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { IPrivacy } from 'services/DI/privacies';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { FactoryONE } from 'src/app/classes/factory';

const enum ENMessages {
  maxLength = 'حداکثر تعداد ',
  minLength = 'حداقل تعداد ',
  is = ' می‌باشد',

}
@Component({
  selector: 'app-input-output-policy',
  templateUrl: './input-output-policy.component.html',
  styleUrls: ['./input-output-policy.component.scss']
})
export class InputOutputPolicyComponent extends FactoryONE {
  @ViewChild('#ref_true') ref;
  iOPolicyOptions: IIOPolicy;
  
  constructor(
    public securityService: SecurityService,
    public closeTabService: CloseTabService,
    private snackWrapperService: SnackWrapperService,
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForPolicies.id = null;
    }
    if (this.closeTabService.saveDataForPolicies.id == 0 || this.closeTabService.saveDataForPolicies.id == null) {
      this.closeTabService.saveDataForPolicies = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.getPolicies);
    }
    this.iOPolicyOptions = this.securityService.getIOPolicyToggle();
  }
  plusOrMinus = (value: number) => {
    // if (value > this.iOPolicyOptions.maxLength) {
    //   this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.sixteen + ENMessages.is, ENSnackBarTimes.threeMili);
    //   return;
    // }

    // if (value < this.iOPolicyOptions.minLength) {
    //   this.openSnackBar(ENMessages.minLength + ENRandomNumbers.eight + ENMessages.is, ENSnackBarTimes.threeMili);
    //   return;
    // }
    // this.closeTabService.saveDataForPolicies.minPasswordLength = value;
  }

  verification = async () => {
    // join input values time 
    this.closeTabService.saveDataForPolicies.fromTime = this.closeTabService.saveDataForPolicies.fromTimeH + ':' + this.closeTabService.saveDataForPolicies.fromTimeM;
    this.closeTabService.saveDataForPolicies.toTime = this.closeTabService.saveDataForPolicies.toTimeH + ':' + this.closeTabService.saveDataForPolicies.toTimeM;
    console.log(this.closeTabService.saveDataForPolicies);

    const temp = this.securityService.verificationDates(this.closeTabService.saveDataForPolicies);
    console.log(temp);

    // if (temp)
    //   this.securityService.editPolicy(this.closeTabService.saveDataForPolicies);
  }
  openSnackBar(message: string, duration: ENSnackBarTimes) {
    this.snackWrapperService.openSnackBar(message, duration, ENSnackBarColors.warn);
  }
  accessDenied(event) {
    this.snackWrapperService.openSnackBar(EN_messages.needMoreAccess, ENSnackBarTimes.tenMili, ENSnackBarColors.warn);
    this.ref._checked = event;
  }
}

