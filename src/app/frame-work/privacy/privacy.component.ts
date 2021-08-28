import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IPolicies, IPrivacy } from 'interfaces/inon-manage';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'services/interaction.service';
import { InterfaceManagerService } from 'services/interface-manager.service';
import { PrivacyService } from 'services/privacy.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent extends FactoryONE {
  privacyOptions: IPrivacy;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';

  subscription: Subscription[] = [];
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
    public interactionService: InteractionService,
    private privacyService: PrivacyService,
    private interfaceManagerService: InterfaceManagerService,
    private _snackBar: MatSnackBar
  ) {
    super(interactionService)
  }

  getPolicies = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETByQuote(ENInterfaces.getPolicies, true).subscribe((res: IPolicies) => {
        if (res)
          resolve(res);
      })
    });
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
    this.privacyOptions = this.privacyService.getPrivacyToggle();
    const a = await this.getPolicies();
    this.insertPolicies(a);

  }
  plusOrMinus = (value: number) => {
    if (value > this.privacyOptions.maxLength) {
      this.openSnackBar('حداکثر تعداد 16 می‌باشد', 2000);
      return;
    }

    if (value < this.privacyOptions.minLength) {
      this.openSnackBar('حداقل تعداد 4 حرف می‌باشد', 2000);
      return;
    }
    this.policies.minPasswordLength = value;

  }
  addPolicy = () => {
    this.interfaceManagerService.POSTBODY(ENInterfaces.addPolicies, this.policies);
  }
  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'بازگشت', {
      duration: duration,
      horizontalPosition: this.horizontalPosition
    });
  }

}

