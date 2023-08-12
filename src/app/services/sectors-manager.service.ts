import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IResponses } from 'interfaces/ioverall-config';
import { UtilsService } from 'services/utils.service';

import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { SectionsService } from './sections.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsManagerService {

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService,
    private sectionsService: SectionsService
  ) { }

  postByIdSuccessBool = async (method: ENInterfaces, id: number) => {
    const res = await this.ajaxReqWrapperService.postDataSourceById(method, id);
    this.utilsService.snackBarMessageSuccess(res.message);
    return true;
  }
  firstConfirmDialog = (text?: string): Promise<any> => {
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
  postObjectBySuccessMessage = async (method: ENInterfaces, result: object): Promise<any> => {
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(method, result);
    this.utilsService.snackBarMessageSuccess(res.message);
    return res;
  }
  /* VALIDATION & VERIFICATION */
  verification = (dataSource: any): boolean => {
    this.sectionsService.setSectionsValue(dataSource);
    if (!this.sectionsService.sectionVertification())
      return false;
    return true;
  }

}
