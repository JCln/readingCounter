import { DateJalaliService } from 'services/date-jalali.service';
import { EN_Routes } from 'interfaces/routes.enum';
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
  aboutUsImage = 'assets/imgs/header/logo_Atlas.png';
  btnLoginId: string = 'btnLogin';
  userData: ICredentials = {
    username: '',
    password: '',
    dntCaptchaText: '',
    dntCaptchaToken: '',
    dntCaptchaInputText: '',
    appVersion: this.utilsService.getAppVersion(),
    clientDateTime: this.dateJalaliService.getGregorianDate()
  };
  showVersionInfo: boolean = false;
  infoVersionItems: IDictionaryManager[] = [];
  @ViewChild("appDntCaptcha") appDntCaptcha: CaptchaComponent;
  captchaApiShow: ENInterfaces.AuthsCaptchaApiShow;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private browserSupportService: BrowserSupportService,
    private dateJalaliService: DateJalaliService
  ) { }

  convertNumbers = () => {
    this.userData.password = Converter.persianToEngNumbers(this.userData.password);
    this.userData.username = Converter.persianToEngNumbers(this.userData.username);
    this.userData.dntCaptchaInputText = Converter.persianToEngNumbers(this.userData.dntCaptchaInputText);
  }
  logging = async () => {
    if (this.browserSupportService.isValidBrowserVersion()) {
      this.convertNumbers();
      if (MathS.isNull(this.userData.password) || MathS.isNull(this.userData.username)) {
        this.utilsService.snackBarMessageWarn(EN_messages.userPass_empty);
        return;
      }
      if (MathS.isNullTextValidation(this.userData.dntCaptchaInputText)) {
        this.utilsService.snackBarMessageWarn(EN_messages.userPassEnterCaptcha);
      }
      else {
        // button should disable after logging
        (<HTMLInputElement>document.getElementById(this.btnLoginId)).disabled = true;
        const returnUrl = this.authService.utilsService.compositeService.getRouterQueryParamMap('returnUrl');
        const res = await this.authService.logging(this.userData);

        if (res) {
          // TODO: Dynamic add to Local or Session Storage
          console.log(this.utilsService.envService.shouldSaveTokensInLocal);

          if (this.utilsService.envService.shouldSaveTokensInLocal) {
            this.authService.saveTolStorage(res);
          }
          else {
            this.authService.saveToSessionStorage(res);
          }
          this.authService.routeToReturnUrl(returnUrl);
        }
        else {
          // if loggin failed refresh captcha, enable loginButton needs
          (<HTMLInputElement>document.getElementById(this.btnLoginId)).disabled = false;
          this.userData.dntCaptchaInputText = '';
          this.appDntCaptcha.doShow();
        }
      }
    }
    else {
      this.utilsService.snackBarMessageWarn(EN_messages.browserSupport_alarm);
    }
  }
  getVersionInfos = () => {
    this.infoVersionItems = infoVersion.getInfoItems();
  }
  gotToAbout = () => {
    this.utilsService.compositeService.routeTo(EN_Routes.aboutUs);
  }
}