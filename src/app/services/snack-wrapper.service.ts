import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ENSnackBarTimes } from 'src/app/Interfaces/ioverall-config';

import { ENSnackBarColors, ISnackBar } from '../Interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class SnackWrapperService {

  private snackBar = new BehaviorSubject<ISnackBar>({ message: '', duration: 0, backColor: '' });

  get snackStatus(): Observable<ISnackBar> {
    return this.snackBar.asObservable();
  }
  private snack(snack: ISnackBar) {
    this.snackBar.next(snack);
  }
  openSnackBar(message: string, duration: ENSnackBarTimes, backColor?: ENSnackBarColors) {
    const a: ISnackBar = {
      message,
      duration,
      backColor
    }
    this.snack(a);
  }

}
