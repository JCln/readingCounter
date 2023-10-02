import { EN_messages } from 'interfaces/enums.enum';
import { Component, ViewChild } from '@angular/core';
import { ENSnackBarTimes, ENSnackBarColors, ENRandomNumbers } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IPrivacy } from 'services/DI/privacies';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

const enum ENMessages {
  maxLength = 'حداکثر تعداد ',
  minLength = 'حداقل تعداد ',
  is = ' می‌باشد',
}
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent extends FactoryONE {
  @ViewChild('#ref_true') ref;
  privacyOptions: IPrivacy;
  auxDataSource = {
    enableXSSProtection: true,
    enableObscureHeaderInfo: true,
    secureCookies: true,
    DOSProtection: true,
    STEALTH: false,
    useJWTDecoder: true,
    CSRFProtection: true,
    DDOSProtection: true,
    CSPProtection: true,
    HSTSProtection: false,
    SanitizeUserInputs: true,
    AES512Protection: true,
    autoClearData: true,
  }
  constructor(
    public securityService: SecurityService,
    public closeTabService: CloseTabService,
    private snackWrapperService: SnackWrapperService
  ) {
    super();
  }

  checkProtocol = () => {
    if (this.closeTabService.saveDataForPolicies)
      this.auxDataSource.HSTSProtection = location.protocol == 'http:' ? false : true;
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForPolicies.id = null;
    }
    if (this.closeTabService.saveDataForPolicies.id == 0 || this.closeTabService.saveDataForPolicies.id == null) {
      this.closeTabService.saveDataForPolicies = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.getPolicies);
    }
    this.checkProtocol();
    this.privacyOptions = this.securityService.getPrivacyToggle();
  }
  plusOrMinus = (value: number) => {
    if (value > this.privacyOptions.maxLength) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.sixteen + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.minLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.four + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.minPasswordLength = value;
  }
  lockInvalidAttemps = (value: number) => {
    if (value > this.privacyOptions.max_LockInvalidAttemps) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.ten + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.min_LockInvalidAttemps) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.one + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.lockInvalidAttempts = value;
  }
  lockMin = (value: number) => {
    if (value > this.privacyOptions.max_LockMin) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.oneHundredAndTwenty + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.min_LockMin) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.ten + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.lockMin = value;
  }
  captchaPlusMinus = (value: number) => {
    if (value > this.privacyOptions.max_captcha) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.ten + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.min_captcha) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.two + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.requireCaptchaInvalidAttempts = value;
  }
  reCaptchaPlusMinus = (value: number) => {
    if (value > this.privacyOptions.max_ReCaptcha) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.ten + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.min_ReCaptcha) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.two + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.requireRecaptchaInvalidAttempts = value;
  }
  openSnackBar(message: string, duration: ENSnackBarTimes) {
    this.snackWrapperService.openSnackBar(message, duration, ENSnackBarColors.warn);
  }
  accessDenied(event) {
    this.snackWrapperService.openSnackBar(EN_messages.needMoreAccess, ENSnackBarTimes.tenMili, ENSnackBarColors.warn);
    this.ref._checked = event;
  }
}

