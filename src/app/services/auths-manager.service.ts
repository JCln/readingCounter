import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENSelectedColumnVariables, EN_messages } from 'interfaces/enums.enum';
import { VerificationService } from 'services/verification.service';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class AuthsManagerService {
  ENSelectedColumnVariables = ENSelectedColumnVariables;

  constructor(
    public dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService,
    private verificationService: VerificationService,
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  firstConfirmDialog = (text: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      text: text,
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }
  /* VERIFICATION & VALIDATION */
  verification = (dataSource: any): boolean => {
    if (!this.verificationService.sectionVertification(dataSource))
      return false;
    return true;
  }

}
