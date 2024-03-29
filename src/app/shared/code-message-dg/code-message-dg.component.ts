import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ENRandomNumbers, EN_messages } from 'interfaces/enums.enum';
import { ILogin2 } from 'interfaces/iauth-guard-permission';
import { UtilsService } from 'services/utils.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Converter } from 'src/app/classes/converter';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-code-message-dg',
  templateUrl: './code-message-dg.component.html',
  styleUrls: ['./code-message-dg.component.scss'],
})
export class CodeMessageDgComponent implements OnInit {
  codeValue: string = '';
  interval: any;
  private readonly delayTime: number = 1000;

  constructor(
    private mdDialogRef: MatDialogRef<CodeMessageDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILogin2,
    private utilsService: UtilsService,
    private authService: AuthService
  ) {
  }

  public cancelDialog = (val: boolean) => {
    clearInterval(this.interval);
    this.mdDialogRef.close(val);
  }
  setInterval = () => {
    this.interval = setInterval(() => {
      this.data.expire_seconds--;
      if (this.data.expire_seconds < 1) {
        this.cancelDialog(false);
        this.utilsService.snackBarMessageWarn(EN_messages.timoutInterval);
      }
    }, this.delayTime);
  }
  ngOnInit(): void {
    this.setInterval();
  }
  login2 = async () => {
    this.codeValue = Converter.persianToEngNumbers(this.codeValue);
    if (MathS.isNullTextValidation(this.codeValue)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertTwoStep);
      return;
    }
    if (MathS.isNaN(this.codeValue)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertTwoStep2);
      return;
    }
    if (!MathS.isExactLengthYouNeed(this.codeValue, ENRandomNumbers.four)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertTwoStepLength);
      return;
    }
    this.data.code = +this.codeValue;
    const res = await this.authService.logging2(this.data);
    if (res) {
      this.authService.saveToStorage(res);
      this.cancelDialog(true);
      this.authService.routeToReturnUrl(this.data.returnUrl);
    }
    else {
      this.cancelDialog(false);
    }
  }

}