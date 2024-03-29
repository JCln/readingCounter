import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ShowImgDgComponent } from '../shared/show-img-dg/show-img-dg.component';
import { ShowVideoDgComponent } from '../shared/show-video-dg/show-video-dg.component';
import { ShowTextDgComponent } from '../shared/show-text-dg/show-text-dg.component';
import { ENSnackBarTimes, ENSnackBarColors } from 'interfaces/enums.enum';
import { ISnackBar, ISnackBarSignal } from 'interfaces/ioverall-config';

@Injectable({
  providedIn: 'root'
})
export class SnackWrapperService {
  ref: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
  ) { }

  private snackBar = new BehaviorSubject<ISnackBar>({ message: '', duration: ENSnackBarTimes.zero, backColor: ENSnackBarColors.danger });
  private snackBarSignal = new BehaviorSubject<ISnackBarSignal>({ message: '', duration: ENSnackBarTimes.zero, backColor: ENSnackBarColors.danger });
  private signalToast = new BehaviorSubject<any>({});

  get snackStatus(): Observable<ISnackBar> {
    return this.snackBar.asObservable();
  }
  get snackStatusSignal(): Observable<ISnackBarSignal> {
    return this.snackBarSignal.asObservable();
  }
  get toastStatusSignal(): Observable<any> {
    return this.signalToast.asObservable();
  }
  private snack(snack: ISnackBar) {
    this.snackBar.next(snack);
  }
  private snackSignal(snack: ISnackBarSignal) {
    this.snackBarSignal.next(snack);
  }
  private toastSignal(snack: any) {
    this.signalToast.next(snack);
  }
  openSnackBar(message: string, backColor?: ENSnackBarColors) {
    const duration: number = message?.length * ENSnackBarTimes.snackTimeMultipleTo;
    const a: ISnackBar = {
      message,
      duration,
      backColor
    }
    this.snack(a);
  }
  openSnackBarSignal(message: string, backColor?: ENSnackBarColors) {
    const duration: number = message?.length * ENSnackBarTimes.snackTimeMultipleTo;
    const a: ISnackBarSignal = {
      message,
      duration,
      backColor
    }
    this.snackSignal(a);
  }
  openToastSignal(body: any) {
    this.toastSignal(body);
  }
  openImgDialog = (body: object) => {
    this.ref = this.dialogService.open(ShowImgDgComponent, {
      data: { body },
      rtl: true,
      width: '80%',
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }
  openVideoDialog = (body: object) => {
    this.ref = this.dialogService.open(ShowVideoDgComponent, {
      data: { body },
      rtl: true,
      width: '80%',
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }
  openTextDialog = (body: object) => {
    this.ref = this.dialogService.open(ShowTextDgComponent, {
      data: { body },
      rtl: true,
      width: '80%',
    })
    this.ref.onClose.subscribe(async res => {
      if (res)
        console.log(res);

    });
  }

}
