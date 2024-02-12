import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmTextDialogComponent } from '../shared/confirm-text-dialog/confirm-text-dialog.component';
import { IDialogMessage } from 'interfaces/ioverall-config';
import { InteractionService } from './interaction.service';

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {
  private readonly chunkFailedMessage = /Loading chunk [\d]+ failed/;
  private readonly newVersionAvailable = 'نسخه شما بروز نیست';
  private readonly needToRefresh = 'لازم است تا صفحه مجددا بارگیری شود';
  constructor(
    public dialog: MatDialog,
    private interactionService: InteractionService
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
  handleError(error: any) {
    if (this.chunkFailedMessage.test(error.message)) {
      this.interactionService.$getChunkFailedStatus().subscribe(async res => {
        if (res) {
          this.interactionService.dontShowFailedChunkDialogAnymore();
          const config = {
            messageTitle: this.newVersionAvailable,
            text: this.needToRefresh,
            minWidth: '20rem',
            isInput: false,
            isDelete: false,
            icon: 'pi pi-refresh',
          }
          await this.firstConfirmDialog(config)
          this.interactionService.canShowFailedChunkDialog();
          window.location.reload();
        }
      })
    }
  }

}
