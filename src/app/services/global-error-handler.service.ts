import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTextDialogComponent } from '../shared/confirm-text-dialog/confirm-text-dialog.component';
import { IDialogMessage } from 'interfaces/ioverall-config';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {
  private chunkFailedStatus = new BehaviorSubject<boolean>(true);
  private readonly chunkFailedMessage = /Loading chunk [\d]+ failed/;
  private readonly newVersionAvailable = 'نسخه شما بروز نیست';
  private readonly needToRefresh = 'لازم است تا صفحه مجددا بارگیری شود';

  $getChunkFailedStatus = (): Observable<boolean> => {
    return this.chunkFailedStatus.asObservable();
  }
  private setChunkFailedStatus(status: boolean) {
    this.chunkFailedStatus.next(status);
  }
  canShowFailedChunkDialog() {
    this.setChunkFailedStatus(true);
  }
  dontShowFailedChunkDialogAnymore() {
    this.setChunkFailedStatus(false);
  }
  constructor(
    public dialog: MatDialog
  ) { }

  firstConfirmDialog = (config: IDialogMessage): Promise<any> => {
    config.doesNotReturnButton = config.doesNotReturnButton == false ? false : true
    config.changePassword = !!config.changePassword ? true : false

    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(ConfirmTextDialogComponent, {
        minWidth: config.minWidth,
        disableClose: config.disableClose,
        data: {
          messageTitle: config.messageTitle,
          messageTitleTwo: config.messageTitleTwo,
          text: config.text,
          isInput: config.isInput,
          inputMinLength: config.inputMinLength,
          placeHolder: config.placeHolder,
          isDelete: config.isDelete,
          icon: config.icon,
          doesNotReturnButton: config.doesNotReturnButton,
          isSelectableDate: config.isSelectableDate,
          changePassword: config.changePassword,
          tooltipText: config.tooltipText,
        }
      });
      dialogRef.afterClosed().subscribe(desc => {
        if (desc) {
          resolve(desc);
        }
        else {
          resolve(false);
        }
      })
    })
  }

  // Multi time operation problem should fix
  handleError(error: any) {
    if (this.chunkFailedMessage.test(error.message)) {
      this.$getChunkFailedStatus().subscribe(async res => {
        if (res) {
          this.dontShowFailedChunkDialogAnymore();
          const config = {
            messageTitle: this.newVersionAvailable,
            text: this.needToRefresh,
            minWidth: '20rem',
            isInput: false,
            isDelete: false,
            icon: 'pi pi-refresh',
          }
          this.firstConfirmDialog(config)
          this.canShowFailedChunkDialog();
          window.location.reload();
        }
      })
    }
  }

}
