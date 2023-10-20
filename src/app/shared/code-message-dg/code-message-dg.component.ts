import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EN_messages } from 'interfaces/enums.enum';
import { ILogin2 } from 'interfaces/iauth-guard-permission';
import { ENRandomNumbers } from 'interfaces/ioverall-config';
import { UtilsService } from 'services/utils.service';
import { AuthService } from 'src/app/auth/auth.service';
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

  setInterval = () => {
    this.interval = setInterval(() => {
      this.data.expire_seconds--;
      if (this.data.expire_seconds < 1) {
        this.cancelDialog();
        this.utilsService.snackBarMessageWarn(EN_messages.timoutInterval);
      }
    }, this.delayTime);
  }
  ngOnInit(): void {
    this.setInterval();
  }
  public cancelDialog = () => {
    clearInterval(this.interval);
    this.mdDialogRef.close(false);
  }
  login2 = async () => {
    if (MathS.isNullTextValidation(this.codeValue)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insertTwoStep);
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
      this.authService.routeToReturnUrl(this.data.returnUrl);
      this.cancelDialog();
    }
    else {
      this.mdDialogRef.close(false);
    }
  }

}