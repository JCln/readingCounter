import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Component, ViewChild } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ICredentials } from 'interfaces/iauth-guard-permission';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BrowserSupportService } from 'services/browser-support.service';
import { infoVersion } from 'services/DI/info-version';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { MathS } from 'src/app/classes/math-s';
import { transitionLoginHelp } from 'src/app/directives/animation.directive';
import { CaptchaComponent } from 'src/app/shared/captcha/captcha.component';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [transitionLoginHelp]
})
export class LoginComponent {
  userData: ICredentials = {
    username: '',
    password: '',
    captcha: {
      DNTCaptchaText: '',
      DNTCaptchaToken: '',
      DNTCaptchaInputText: ''
    },
    hasCaptcha: false,
    appVersion: this.utilsService.getAppVersion()
  };
  showVersionInfo: boolean = false;
  infoVersionItems: IDictionaryManager[] = [];
  @ViewChild("appDntCaptcha") appDntCaptcha: CaptchaComponent;
  captchaApiShow: ENInterfaces.AuthsCaptchaApiShow;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private browserSupportService: BrowserSupportService
  ) { }

  convertNumbers = () => {
    this.userData.password = Converter.persianToEngNumbers(this.userData.password);
    this.userData.username = Converter.persianToEngNumbers(this.userData.username);
  }
  logging = () => {
    if (this.browserSupportService.isValidBrowserVersion()) {
      this.convertNumbers();
      if (MathS.isNull(this.userData.password) || MathS.isNull(this.userData.username)) {
        this.utilsService.snackBarMessageWarn(EN_messages.userPass_empty);
        this.appDntCaptcha.doRefresh(); // when refresh should call?
      }
      if (MathS.isNull(this.userData.captcha.DNTCaptchaInputText)) {
        this.utilsService.snackBarMessageWarn(EN_messages.userPassEnterCaptcha);
      }
      else {
        this.authService.logging(this.userData);
      }
    }
    else {
      this.utilsService.snackBarMessageWarn(EN_messages.browserSupport_alarm);
    }
  }
  getVersionInfos = () => {
    this.infoVersionItems = infoVersion.getInfoItems();
  }
}
