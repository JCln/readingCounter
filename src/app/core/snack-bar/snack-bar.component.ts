import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBar, ISnackBarSignal } from 'interfaces/ioverall-config';
import { MessageService } from 'primeng/api';
import { SnackWrapperService } from 'services/snack-wrapper.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(
    private _snackBar: MatSnackBar,
    private snackWrapperService: SnackWrapperService,
    private messageService: MessageService
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
        this.messageService.add({ severity: res.color, summary: res.title, detail: res.text, sticky: true });
      }
    })
  }
  ngOnInit(): void {
    this.snackSimple();
    this.snackSignal();
    this.toast();
  }

}
