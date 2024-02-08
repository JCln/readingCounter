import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTextDialogComponent } from '../shared/confirm-text-dialog/confirm-text-dialog.component';
import { IDialogMessage } from 'interfaces/ioverall-config';

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly newVersionAvailable = 'نسخه شما بروز نیست';
  private readonly needToRefresh = 'لازم است تا صفحه مجددا بارگیری شود';
  constructor(public dialog: MatDialog) { }

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
  async handleError(error: any): Promise<void> {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      const config = {
        messageTitle: this.newVersionAvailable,
        text: this.needToRefresh,
        minWidth: '20rem',
        isInput: false,
        isDelete: false,
        icon: 'pi pi-refresh',
      }
      if (await this.firstConfirmDialog(config))
        window.location.reload();
    }
  }

}
