import { EN_messages } from 'interfaces/enums.enum';
import { Component, ViewChild } from '@angular/core';
import { MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { IPrivacy } from 'interfaces/inon-manage';
import { ENSnackBarTimes, ENSnackBarColors } from 'interfaces/ioverall-config';
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
  @ViewChild('#ref_true') ref;
  privacyOptions: IPrivacy;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
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

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForPolicies.id = null;
    }

    if (!this.closeTabService.saveDataForPolicies.id) {
      this.closeTabService.saveDataForPolicies = await this.securityService.getPolicy();
    }
    this.auxDataSource.HSTSProtection = location.protocol == 'http:' ? false : true;
    this.privacyOptions = this.securityService.getPrivacyToggle();
  }
  plusOrMinus = (value: number) => {
    if (value > this.privacyOptions.maxLength) {
      this.openSnackBar('حداکثر تعداد 16 می‌باشد', ENSnackBarTimes.threeMili);
      return;
    }

    if (value < this.privacyOptions.minLength) {
      this.openSnackBar('حداقل تعداد 4 می‌باشد', ENSnackBarTimes.threeMili);
      return;
    }
    this.closeTabService.saveDataForPolicies.minPasswordLength = value;

  }
  openSnackBar(message: string, duration: ENSnackBarTimes) {
    this.snackWrapperService.openSnackBar(message, duration, ENSnackBarColors.warn);
  }
  accessDenied(event) {
    this.snackWrapperService.openSnackBar(EN_messages.needMoreAccess, ENSnackBarTimes.tenMili, ENSnackBarColors.warn);
    this.ref._checked = event;
  }
}

