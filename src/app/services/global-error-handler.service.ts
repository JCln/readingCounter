import { ErrorHandler, Injectable, ViewChild } from '@angular/core';
import { UtilsService } from './utils.service';
import { SpinnerComponent } from '../core/spinner/spinner.component';

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {
  @ViewChild("spinnerComponenet") spinnerComponent: SpinnerComponent
  constructor(private utilsService: UtilsService) { }

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      this.spinnerComponent.cancelMe();
      setTimeout(() => {
        this.openCodeMessageDialog();
      }, 10000);
    }
  }
  openCodeMessageDialog = async (): Promise<any> => {
    const message: string = 'شما دسترسی به شبکه ندارید و یا اختلال زیادی در شبکه وجود دارد';
    const text: string = 'لطفا پس از اطمینان از دسترسی به شبکه، مجددا تلاش نمایید';
    const config = {
      messageTitle: message,
      text: text,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-info',
      disableClose: false,
    }
    return this.utilsService.firstConfirmDialog(config);
  }

}
