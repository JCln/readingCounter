import { EnvService } from 'services/env.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBar, ISnackBarSignal } from 'interfaces/ioverall-config';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProfileService } from 'services/profile.service';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  ref: DynamicDialogRef;
  _notifTimer: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private snackWrapperService: SnackWrapperService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public profileService: ProfileService,
    private envService: EnvService
  ) { }

  openSnackBar(snack: ISnackBar) {
    if (!MathS.isNull(snack.message)) {
      this._snackBar.open(snack.message, '', {
        duration: snack.duration,
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        direction: 'rtl',
        panelClass: [snack.backColor]
      });
    }
  }
  openSnackBarSignal(snack: ISnackBarSignal) {
    if (!MathS.isNull(snack.message)) {
      this._snackBar.open(snack.message, 'x', {
        duration: snack.duration,
        horizontalPosition: 'start',
        verticalPosition: 'top',
        direction: 'rtl',
        panelClass: [snack.backColor, 'newline']
      });
    }
  }
  snackSignal = () => {
    this.snackWrapperService.snackStatusSignal.subscribe(res => {
      if (res) {
        this.openSnackBarSignal(res);
      }
    })
  }
  snackSimple = () => {
    this.snackWrapperService.snackStatus.subscribe(res => {
      if (res) {
        this.openSnackBar(res);
      }
    })
  }
  toast = () => {
    this.snackWrapperService.toastStatusSignal.subscribe((res) => {
      if (res) {
        if (res.life) {
          this.setInterval(res.life);
        }
        this.messageService.add(res);
      }
    })
  }
  ngOnInit(): void {
    this.snackSimple();
    this.snackSignal();
    this.toast();
  }
  openNotifyType = (message: any) => {
    const envNotif = this.envService.NotificationMediaTypeIds;
    switch (message.clickName) {
      case envNotif.image:
        this.snackWrapperService.openImgDialog(message);
        break;
      case envNotif.text:
        this.snackWrapperService.openTextDialog(message);
        break;
      case envNotif.video:
        this.snackWrapperService.openVideoDialog(message);
        break;

      default:
        break;
    }
  }
  setInterval = (life: number) => {
    this._notifTimer = life / 1000;

    const interval = setInterval(() => {
      this._notifTimer--;

      if (this._notifTimer < 1) {
        clearInterval(interval);
      }
    }, 1000);
  }

}
