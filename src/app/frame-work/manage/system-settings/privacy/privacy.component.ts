import { ENRandomNumbers, ENSnackBarColors, EN_messages } from 'interfaces/enums.enum';
import { Component, ViewChild } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IPrivacy } from 'services/DI/privacies';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { MathS } from 'src/app/classes/math-s';

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
    HSTSProtection: false,
  }
  constructor(
    public securityService: SecurityService,
    public closeTabService: CloseTabService,
  ) {
    super();
  }

  checkProtocol = () => {
    if (this.closeTabService.saveDataForPolicies)
      this.auxDataSource.HSTSProtection = this.closeTabService.utilsService.checkProtocol();
  }
  classWrapper = async (canRefresh?: boolean) => {
    // console.log(this.closeTabService.saveDataForPolicies.id);
    // console.log(MathS.isNull(this.closeTabService.saveDataForPolicies.id));


    // if (canRefresh) {
    //   this.closeTabService.saveDataForPolicies.id = null;
    // }
    // if (!this.closeTabService.saveDataForPolicies.id) {
    this.closeTabService.saveDataForPolicies = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.getPolicies);
    // }
    this.checkProtocol();
    this.privacyOptions = this.securityService.getPrivacyToggle();
  }
  plusOrMinusPasswordLength = (value: number) => {
    this.closeTabService.saveDataForPolicies.minPasswordLength = value;
  }
  plusOrMinusDeactiveTerminationMinutes = (value: number) => {
    this.closeTabService.saveDataForPolicies.deactiveTerminationMinutes = MathS.isNull(this.closeTabService.saveDataForPolicies.deactiveTerminationMinutes) ? 2 : this.closeTabService.saveDataForPolicies.deactiveTerminationMinutes;
    if (value > this.privacyOptions.maxLengthDeactiveTerminationMinutes) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.oneHundredAndTwenty + ENMessages.is);
      return;
    }

    if (value < this.privacyOptions.minLengthDeactiveTerminationMinutes) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.three + ENMessages.is);
      return;
    }
    this.closeTabService.saveDataForPolicies.deactiveTerminationMinutes = value;
  }
  lockInvalidAttemps = (value: number) => {
    if (value > this.privacyOptions.max_LockInvalidAttemps) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.ten + ENMessages.is);
      return;
    }

    if (value < this.privacyOptions.min_LockInvalidAttemps) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.one + ENMessages.is);
      return;
    }
    this.closeTabService.saveDataForPolicies.lockInvalidAttempts = value;
  }
  lockMin = (value: number) => {
    if (value > this.privacyOptions.max_LockMin) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.oneHundredAndTwenty + ENMessages.is);
      return;
    }

    if (value < this.privacyOptions.min_LockMin) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.ten + ENMessages.is);
      return;
    }
    this.closeTabService.saveDataForPolicies.lockMin = value;
  }
  captchaPlusMinus = (value: number) => {
    if (value > this.privacyOptions.max_captcha) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.ten + ENMessages.is);
      return;
    }

    if (value < this.privacyOptions.min_captcha) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.two + ENMessages.is);
      return;
    }
    this.closeTabService.saveDataForPolicies.requireCaptchaInvalidAttempts = value;
  }
  reCaptchaPlusMinus = (value: number) => {
    if (value > this.privacyOptions.max_ReCaptcha) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.ten + ENMessages.is);
      return;
    }

    if (value < this.privacyOptions.min_ReCaptcha) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.two + ENMessages.is);
      return;
    }
    this.closeTabService.saveDataForPolicies.requireRecaptchaInvalidAttempts = value;
  }
  verification = async () => {
    if (this.closeTabService.saveDataForPolicies.maxLogRecords < this.privacyOptions.minLengthMaxLogRecords) {
      this.securityService.utilsService.snackBarMessageWarn(EN_messages.insert_minLengthMaxLogRecord);
      return;
    }
    if (this.closeTabService.saveDataForPolicies.minPasswordLength > this.privacyOptions.maxPasswordLength) {
      this.securityService.utilsService.snackBarMessageWarn(EN_messages.insert_maxPasswordLength);
      return;
    }

    if (this.closeTabService.saveDataForPolicies.minPasswordLength < this.privacyOptions.minPasswordLength) {
      this.securityService.utilsService.snackBarMessageWarn(EN_messages.insert_minPasswordLength);
      return;
    }
    if (!this.securityService.verificationService.verificationTimes(this.closeTabService.saveDataForPolicies))
      return;
    if (!this.securityService.verificationService.verificationDates(this.closeTabService.saveDataForPolicies))
      return;
    if (!this.securityService.verificationService.verificationPolicy(this.closeTabService.saveDataForPolicies))
      return;
    this.closeTabService.utilsService.getIsAdminRole() ?
      this.securityService.editPolicy(this.closeTabService.saveDataForPolicies) :
      this.closeTabService.utilsService.snackBarMessageWarn(EN_messages.needMoreAccess);
  }
  openSnackBar(message: string) {
    this.closeTabService.utilsService.snackBarMessage(message, ENSnackBarColors.warn);
  }
  accessDenied(event) {
    this.closeTabService.utilsService.snackBarMessage(EN_messages.needMoreAccess, ENSnackBarColors.warn);
    this.ref._checked = event;
  }
}