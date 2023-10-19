import { DateJalaliService } from 'services/date-jalali.service';
import { EN_Routes } from 'interfaces/routes.enum';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { Component, ViewChild } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ICredentials, ICredentialsResponse, ILogin2 } from 'interfaces/iauth-guard-permission';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { BrowserSupportService } from 'services/browser-support.service';
import { infoVersion } from 'services/DI/info-version';
import { UtilsService } from 'services/utils.service';
import { Converter } from 'src/app/classes/converter';
import { MathS } from 'src/app/classes/math-s';
import { transitionLoginHelp } from 'src/app/directives/animation.directive';
import { CaptchaComponent } from 'src/app/shared/captcha/captcha.component';

import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CodeMessageDgComponent } from 'src/app/shared/code-message-dg/code-message-dg.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [transitionLoginHelp]
})
export class LoginComponent {
  aboutUsImage = 'assets/imgs/header/logo_Atlas.png';
  btnLoginId: string = 'btnLogin';
  private readonly returnUrl: string = 'returnUrl';
  userData: ICredentials = {
    username: '',
    password: '',
    dntCaptchaText: '',
    dntCaptchaToken: '',
    dntCaptchaInputText: '',
    appVersion: this.utilsService.getAppVersion(),
    clientDateTime: this.dateJalaliService.getGregorianDate()
  };
  userDataInput2: ILogin2 = {
    deviceSerial: '',
    appVersion: this.utilsService.getAppVersion(),
    clientDateTime: this.dateJalaliService.getGregorianDate(),
    expire_seconds: 0,
    loginId: '',
    code: null
  };
  showVersionInfo: boolean = false;
  infoVersionItems: IDictionaryManager[] = [];
  @ViewChild("appDntCaptcha") appDntCaptcha: CaptchaComponent;
  captchaApiShow: ENInterfaces.AuthsCaptchaApiShow;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private browserSupportService: BrowserSupportService,
    private dateJalaliService: DateJalaliService,
    public matDialog: MatDialog
  ) { }

  convertNumbers = () => {
    this.userData.password = Converter.persianToEngNumbers(this.userData.password);
    this.userData.username = Converter.persianToEngNumbers(this.userData.username);
    this.userData.dntCaptchaInputText = Converter.persianToEngNumbers(this.userData.dntCaptchaInputText);
  }
  openCodeMessageDialog = (): Promise<any> => {
    return new Promise((resolve) => {
      const dialogRef = this.matDialog.open(CodeMessageDgComponent, {
        minWidth: '20rem',
        data: this.userDataInput2,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
        else {
          this.doRefreshButtonAndCaptcha();
        }
      })
    })
  }
  doRefreshButtonAndCaptcha = () => {
    // if loggin failed refresh captcha, enable loginButton needs
    (<HTMLInputElement>document.getElementById(this.btnLoginId)).disabled = false;
    this.userData.dntCaptchaInputText = '';
    this.appDntCaptcha.doShow();
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
        const returnUrl = this.authService.utilsService.compositeService.getRouterQueryParamMap(this.returnUrl);
        const res: ICredentialsResponse = await this.authService.logging(this.userData);
        if (res) {
          // TODO: Dynamic add to Local or Session Storage
          // two steps vertification
          if (res.two_steps) {
            this.userDataInput2.loginId = res.login_id;
            this.userDataInput2.expire_seconds = res.expire_seconds;
            const bbb = await this.openCodeMessageDialog();
            console.log(bbb);

          }
          else {
            this.authService.saveToStorage(res);
            this.authService.routeToReturnUrl(returnUrl);
          }
        }
        else {
          this.doRefreshButtonAndCaptcha();
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