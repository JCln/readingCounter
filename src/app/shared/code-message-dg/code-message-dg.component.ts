import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ILogin2 } from 'interfaces/iauth-guard-permission';
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

  constructor(
    private mdDialogRef: MatDialogRef<CodeMessageDgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILogin2,
    private utilsService: UtilsService,
    private authService: AuthService
  ) {
  }

  setInterval = () => {
    const interval = setInterval(() => {
      this.data.expire_seconds--;
      if (this.data.expire_seconds < 1) {
        clearInterval(interval);
      }
    }, 1000);
  }
  ngOnInit(): void {
    this.setInterval();
  }
  public confirmWithoutText = () => {
    this.mdDialogRef.close();
    //   this.mdDialogRef.close(this._selectedDate);
    //   return;
    //   this.mdDialogRef.close(true);  
  }
  login2 = async () => {
    this.data.code = +this.codeValue;
    const res = await this.authService.logging2(this.data);
    if (res) {
      this.authService.saveToStorage(res);
      this.authService.routeToReturnUrl(this.data.returnUrl);
      this.mdDialogRef.close();
    }
    else {
      this.mdDialogRef.close(false);
    }
  }
}