import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


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
  iOPolicyOptions: IIOPolicy;
  @ViewChild('#ref_true') ref;

  constructor(
    public securityService: SecurityService,
    public closeTabService: CloseTabService,
    private snackWrapperService: SnackWrapperService,
  ) {
    super();
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.iOPolicyOptions = this.securityService.getIOPolicyToggle();
    if (canRefresh) {
      this.closeTabService.IOPolicy.id = 0;
    }
    if (MathS.isNull(this.closeTabService.IOPolicy.id)) {
      this.closeTabService.IOPolicy = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIOPolicy);
    }
  }

  plusOrMinusOutputMaxCountPerDay = (value: number) => {
    if (value < this.iOPolicyOptions.outputMaxCountPerDayMinLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.zero + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.IOPolicy.outputMaxCountPerDay = value;
  }
  plusOrMinusOutputMaxCountPerUser = (value: number) => {
    if (value < this.iOPolicyOptions.outputMaxCountPerUserMinLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.zero + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.IOPolicy.outputMaxCountPerUser = value;
  }
  plusOrMinusInputMaxCountPerDay = (value: number) => {
    if (value < this.iOPolicyOptions.inputMaxCountPerDayMinLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.zero + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.IOPolicy.inputMaxCountPerDay = value;
  }
  plusOrMinusInputMaxCountPerUser = (value: number) => {
    if (value < this.iOPolicyOptions.inputMaxCountPerUserMinLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.zero + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.IOPolicy.inputMaxCountPerUser = value;
  }
  plusOrMinusInputMaxSizeKb = (value: number) => {
    if (value < this.iOPolicyOptions.inputMaxSizeKbMinLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.zero + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.IOPolicy.inputMaxSizeKb = value;
  }

  verification = async () => {
    // join input values time     
    const _addOrEditInterface = MathS.isNull(this.closeTabService.IOPolicy.id) ? ENInterfaces.AddIOPolicy : ENInterfaces.EditIOPolicy

    if (this.securityService.verificationIOPolicyAdd(this.closeTabService.IOPolicy)) {
      this.securityService.ajaxReqWrapperService.interfaceManagerService.POSTBODY(_addOrEditInterface, this.closeTabService.IOPolicy)
        .toPromise()
        .then((res: any) => {
          this.securityService.utilsService.snackBarMessageSuccess(res.message);
        }).catch(error => {
          console.log(error);
          const config = {
            messageTitle: EN_messages.checkPlease,
            text: error.error.message,
            minWidth: '20rem',
            isInput: false,
            isDelete: false,
            icon: 'pi pi-file-edit',
          }
          this.securityService.utilsService.firstConfirmDialog(config);
        });
    }
  }
  openSnackBar(message: string, duration: ENSnackBarTimes) {
    this.snackWrapperService.openSnackBar(message, duration, ENSnackBarColors.warn);
  }
  accessDenied(event) {
    this.snackWrapperService.openSnackBar(EN_messages.needMoreAccess, ENSnackBarTimes.tenMili, ENSnackBarColors.warn);
    this.ref._checked = event;
  }
}

