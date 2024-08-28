import { UtilsService } from 'services/utils.service';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { Injectable } from '@angular/core';
import { IIOPolicy } from 'interfaces/iserver-manager';
import { EN_messages, ENRandomNumbers, ENSnackBarColors } from 'interfaces/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class IOService {
  private ioPolicy: IIOPolicy;

  constructor(
    private dictionaryWrapperService: DictionaryWrapperService,
    private utilsService: UtilsService
  ) { }

  policyContent = async (fileForm: FileList): Promise<boolean> => {
    this.ioPolicy = await this.dictionaryWrapperService.getIOPolicy(false);
    console.log(this.ioPolicy);
    return new Promise((resolve) => {
      if (fileForm[0].size / ENRandomNumbers.oneK > this.ioPolicy.inputMaxSizeKb) {
        this.utilsService.snackBarMessage(EN_messages.uploadMaxCountPassed, ENSnackBarColors.warn);
        resolve(false);
      }
      resolve(true);
    });

  }
}