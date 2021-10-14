import { Component } from '@angular/core';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { IPolicies, IPrivacy } from 'interfaces/inon-manage';
import { ENSnackBarTimes } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent extends FactoryONE {
  privacyOptions: IPrivacy;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';


  policies: IPolicies = {
    id: 0,
    enableValidIpCaptcha: false,
    requireCaptchaInvalidAttempts: 0,
    enableValidIpRecaptcha: false,
    requireRecaptchaInvalidAttempts: 0,
    lockInvalidAttempts: 0,
    lockMin: 0,
    minPasswordLength: 0,
    passwordContainsNumber: false,
    passwordContainsLowercase: false,
    passwordContainsUppercase: false,
    passwordContainsNonAlphaNumeric: false,
    canUpdateDeviceId: false
  };

  constructor(
     
    public securityService: SecurityService,
    private closeTabService: CloseTabService,
    private snackWrapperService: SnackWrapperService
  ) {
    super();
  }

  insertPolicies = (policies: IPolicies) => {
    this.policies.id = policies.id;
    this.policies.enableValidIpCaptcha = policies.enableValidIpCaptcha;
    this.policies.requireCaptchaInvalidAttempts = policies.requireCaptchaInvalidAttempts;
    this.policies.enableValidIpRecaptcha = policies.enableValidIpRecaptcha;
    this.policies.requireRecaptchaInvalidAttempts = policies.requireRecaptchaInvalidAttempts;
    this.policies.lockInvalidAttempts = policies.lockInvalidAttempts;
    this.policies.lockMin = policies.lockMin;
    this.policies.minPasswordLength = policies.minPasswordLength;
    this.policies.passwordContainsNumber = policies.passwordContainsNumber;
    this.policies.passwordContainsLowercase = policies.passwordContainsLowercase;
    this.policies.passwordContainsUppercase = policies.passwordContainsUppercase;
    this.policies.passwordContainsNonAlphaNumeric = policies.passwordContainsNonAlphaNumeric;
    this.policies.canUpdateDeviceId = policies.canUpdateDeviceId;
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForPolicies = '';
    }

    console.log(this.closeTabService.saveDataForPolicies);
    if (this.closeTabService.saveDataForPolicies) {
      this.policies = this.closeTabService.saveDataForPolicies;
      this.insertPolicies(this.policies);
    }
    else {
      this.policies = await this.securityService.getPolicy();
      this.closeTabService.saveDataForPolicies = this.policies;
      this.insertPolicies(this.policies);
    }

    this.privacyOptions = this.securityService.getPrivacyToggle();
  }
  plusOrMinus = (value: number) => {
    if (value > this.privacyOptions.maxLength) {
      this.openSnackBar('حداکثر تعداد 16 می‌باشد', 2000);
      return;
    }

    if (value < this.privacyOptions.minLength) {
      this.openSnackBar('حداقل تعداد 4 می‌باشد', 2000);
      return;
    }
    this.policies.minPasswordLength = value;

  }
  openSnackBar(message: string, duration: ENSnackBarTimes) {
    this.snackWrapperService.openSnackBar(message, duration);
  }

}

