import { Injectable } from '@angular/core';
import { ENSnackBarColors, ENSnackBarTimes, ISnackBar, ISnackBarSignal } from 'interfaces/ioverall-config';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SnackWrapperService {

  private snackBar = new BehaviorSubject<ISnackBar>({ message: '', duration: 0, backColor: ENSnackBarColors.danger });
  private snackBarSignal = new BehaviorSubject<ISnackBarSignal>({ message: '', duration: 0, backColor: ENSnackBarColors.danger });

  get snackStatus(): Observable<ISnackBar> {
    return this.snackBar.asObservable();
  }
  get snackStatusSignal(): Observable<ISnackBarSignal> {
    return this.snackBarSignal.asObservable();
  }
  private snack(snack: ISnackBar) {
    this.snackBar.next(snack);
  }
  private snackSignal(snack: ISnackBarSignal) {
    this.snackBarSignal.next(snack);
  }
  openSnackBar(message: string, duration: ENSnackBarTimes, backColor?: ENSnackBarColors) {
    const a: ISnackBar = {
      message,
      duration,
      backColor
    }
    this.snack(a);
  }
  openSnackBarSignal(message: string, duration: ENSnackBarTimes, backColor?: ENSnackBarColors) {
    const a: ISnackBarSignal = {
      message,
      duration,
      backColor
    }
    this.snackSignal(a);
  }

}
