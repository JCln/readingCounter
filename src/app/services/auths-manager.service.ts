import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { ENSelectedColumnVariables } from 'interfaces/ioverall-config';
import { SectionsService } from 'services/sections.service';

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
    private sectionsService: SectionsService,
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
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }

}
