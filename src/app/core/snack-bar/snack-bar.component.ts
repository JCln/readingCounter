import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISnackBar, ISnackBarSignal } from 'interfaces/ioverall-config';
import { SnackWrapperService } from 'services/snack-wrapper.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(private _snackBar: MatSnackBar, private snackWrapperService: SnackWrapperService) { }

  openSnackBar(snack: ISnackBar) {
    if (snack.message === '')
      return;
    this._snackBar.open(snack.message, '', {
      duration: snack.duration,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      direction: 'rtl',
      panelClass: [snack.backColor]
    });
  }
  openSnackBarSignal(snack: ISnackBarSignal) {
    if (snack.message === '')
      return;
    this._snackBar.open(snack.message, 'x', {
      duration: snack.duration,
      horizontalPosition: 'start',
      verticalPosition: 'top',
      direction: 'rtl',

      panelClass: [snack.backColor, 'newline']
    });
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
  ngOnInit(): void {
    this.snackSimple();
    this.snackSignal();
  }

}
