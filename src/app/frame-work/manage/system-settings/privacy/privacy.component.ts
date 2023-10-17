import { EN_messages } from 'interfaces/enums.enum';
import { Component, ViewChild } from '@angular/core';
import { ENSnackBarTimes, ENSnackBarColors, ENRandomNumbers } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { SecurityService } from 'services/security.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { FactoryONE } from 'src/app/classes/factory';
import { IPrivacy } from 'services/DI/privacies';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DateJalaliService } from 'services/date-jalali.service';
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
    private snackWrapperService: SnackWrapperService,
    private dateJalaliService: DateJalaliService
  ) {
    super();
  }

  checkProtocol = () => {
    if (this.closeTabService.saveDataForPolicies)
      this.auxDataSource.HSTSProtection = location.protocol == 'http:' ? false : true;
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForPolicies.id = 0;
    }
    if (MathS.isNull(this.closeTabService.saveDataForPolicies.id)) {
      this.closeTabService.saveDataForPolicies = await this.securityService.ajaxReqWrapperService.getDataSource(ENInterfaces.getPolicies);
    }
    this.checkProtocol();
    this.privacyOptions = this.securityService.getPrivacyToggle();
    this.insertToTimes();
  }
  plusOrMinus = (value: number) => {
    if (value > this.privacyOptions.maxLength) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.sixteen + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.minLength) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.eight + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.minPasswordLength = value;
  }
  plusOrMinusDeactiveTerminationMinutes = (value: number) => {
    if (value > this.privacyOptions.maxLengthDeactiveTerminationMinutes) {
      this.openSnackBar(ENMessages.maxLength + ENRandomNumbers.fourHundredEighty + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.minLengthDeactiveTerminationMinutes) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.two + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.deactiveTerminationMinutes = value;
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
  plusOrMinusMaxRecords = (value: number) => {
    if (value < this.privacyOptions.minLengthMaxLogRecords) {
      this.openSnackBar(ENMessages.minLength + ENRandomNumbers.oneHundred + ENMessages.is, ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.maxLogRecords = value;
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
  insertToTimes = () => {
    let temp = this.dateJalaliService.getCurrentTime();
    const hour = temp.split(':').shift();
    const minute = temp.split(':').pop();

    this.closeTabService.saveDataForPolicies.fromTimeM = minute;
    this.closeTabService.saveDataForPolicies.fromTimeH = hour - 1;
    this.closeTabService.saveDataForPolicies.toTimeM = minute;
    this.closeTabService.saveDataForPolicies.toTimeH = hour;
    // add zero before single digits even if it is zero
    if (this.closeTabService.saveDataForPolicies.fromTimeH < ENRandomNumbers.ten) {
      this.closeTabService.saveDataForPolicies.fromTimeH = '0'.concat(this.closeTabService.saveDataForPolicies.fromTimeH.toString());
    }
    if (hour == '00') {
      this.closeTabService.saveDataForPolicies.fromTimeH = '23';
    }
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

