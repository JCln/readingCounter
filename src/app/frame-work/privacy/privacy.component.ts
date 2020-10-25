import { Component, OnInit } from '@angular/core';

import { IPolicies, IPrivacy } from './../../Interfaces/iprivacy';
import { InterfaceService } from './../../services/interface.service';
import { PrivacyService } from './../../services/privacy.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {
  privacyOptions: IPrivacy;
  selectedCapacity: string = '';
  leastTextCapacity: string[] = ['4', '6', '8', '10'];
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

  _updatedSelectedToggles: string[] = [];
  isAllCompleted: boolean = false;

  constructor(private privacyService: PrivacyService, private interfaceService: InterfaceService) { }

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

  updateAllComplete() {
    this.isAllCompleted = this.privacyOptions.task != null && this.privacyOptions.task.every(t => t.isChecked);
  }

  someComplete(): boolean {
    if (this.privacyOptions.task == null) {
      return false;
    }
    return this.privacyOptions.task.filter(t => t.isChecked).length > 0 && !this.isAllCompleted;
  }

  setAll(completed: boolean) {
    this.isAllCompleted = completed;
    if (this.privacyOptions.task == null) {
      return;
    }
    this.privacyOptions.task.forEach(t => t.isChecked = completed);
  }
  addPolicy = () => {
    this.interfaceService.addPolicies(this.policies);
  }
  editPolicy = () => {
    this.interfaceService.editPolicies(this.policies);
  }
}

