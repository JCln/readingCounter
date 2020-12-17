import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionService } from 'src/app/services/interaction.service';

import { IPolicies, IPrivacy } from './../../Interfaces/iprivacy';
import { InterfaceService } from './../../services/interface.service';
import { PrivacyService } from './../../services/privacy.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit, AfterViewInit, OnDestroy {
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

  constructor(private interactionService: InteractionService,
    private router: Router, private privacyService: PrivacyService, private interfaceService: InterfaceService, private _snackBar: MatSnackBar) { }

  getPolicies = (): Promise<IPolicies> => {
    return new Promise((resolve) => {
      this.interfaceService.getPolicies(true).subscribe(res => {
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
  classWrapper = async () => {
    const a = await this.getPolicies();
    this.insertPolicies(a);

  }
  ngOnInit(): void {
    this.privacyOptions = this.privacyService.getPrivacyToggle();
    this.classWrapper();
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
    this.interfaceService.addPolicies(this.policies);
  }
  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, 'بازگشت', {
      duration: duration,
      horizontalPosition: this.horizontalPosition
    });
  }
  closeTabStatus = () => {
    this.subscription.push(this.interactionService.getClosedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/privacy') {
          console.log('there is nothing to clear on close page !!');

        }
      }
    })
    )
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/privacy')
          this.ngOnInit();
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.closeTabStatus();
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}

