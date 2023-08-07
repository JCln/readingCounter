import { UtilsService } from 'services/utils.service';
import { IFeedbackType } from 'interfaces/imobile-manager';
import { Injectable } from '@angular/core';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { ColumnManager } from '../classes/column-manager';
import { MathS } from '../classes/math-s';
import { EN_messages } from 'interfaces/enums.enum';

@Injectable({
  providedIn: 'root'
})
export class MobileAppService {

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public columnManager: ColumnManager,
    public utilsService: UtilsService
  ) { }

  verificationComplaint = (body: IFeedbackType): boolean => {
    if (MathS.isNull(body.title)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_title);
      return false;
    }
    return true;
  }
  firstConfirmDialog = (text: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      text: text,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}
