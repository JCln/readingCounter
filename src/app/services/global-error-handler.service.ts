import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()

export class GlobalErrorHandlerService implements ErrorHandler {

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
  }

}
