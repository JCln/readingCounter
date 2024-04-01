import { VerificationService } from './verification.service';
import { PageSignsService } from 'services/page-signs.service';
import { Injectable } from '@angular/core';
import { EN_messages } from 'interfaces/enums.enum';
import { DictionaryWrapperService } from 'services/dictionary-wrapper.service';
import { UtilsService } from 'services/utils.service';

import { IFragmentMaster } from '../interfaces/ireads-manager';
import { EN_Routes } from '../interfaces/routes.enum';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class FragmentManagerService {

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public pageSignsService: PageSignsService,
    public utilsService: UtilsService,
    public verificationService: VerificationService
  ) { }

  routeToFragmentDetails = (body: IFragmentMaster) => {
    this.pageSignsService.fragmentDetails_pageSign.GUid = body.id;
    this.pageSignsService.fragmentDetails_pageSign.zoneTitle = body.changableZoneId;
    this.pageSignsService.fragmentDetails_pageSign.routeTitle = body.routeTitle;
    this.pageSignsService.fragmentDetails_pageSign.fromEshterak = body.fromEshterak;
    this.pageSignsService.fragmentDetails_pageSign.toEshterak = body.toEshterak;
    this.utilsService.routeToByUrl(EN_Routes.fragmentDetail);
  }
  routeToFragmentMaster = () => {
    this.utilsService.routeTo(EN_Routes.fragment);
  }
  firstConfirmDialog = (text?: string): Promise<any> => {
    const a = {
      messageTitle: EN_messages.confirm_remove,
      text: text,
      minWidth: '19rem',
      isInput: false,
      isDelete: true,
      icon: 'pi pi-trash'
    }
    return this.utilsService.firstConfirmDialog(a);
  }

}
