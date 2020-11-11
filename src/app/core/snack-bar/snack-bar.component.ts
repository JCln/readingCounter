import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { ISnackBar } from './../../Interfaces/isnack-bar';
import { SnackWrapperService } from './../../services/snack-wrapper.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar, private snackWrapperService: SnackWrapperService) { }

  openSnackBar(snack: ISnackBar) {
    if (snack.message === '')
      return;
    this._snackBar.open(snack.message, '', {
      duration: snack.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      direction: 'rtl',
      panelClass: [snack.backColor]
    });
  }
  ngOnInit(): void {
    this.snackWrapperService.snackStatus.subscribe(res => {
      if (res) {
        console.log(res);

        this.openSnackBar(res);
      }
    })
  }

}
