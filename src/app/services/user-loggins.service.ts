import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { IUserLogginInfo, IUserManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class UserLogginsService {

  constructor(
    public utilsService: UtilsService,
    public ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  userLoggins_pageSign: IUserLogginInfo = {
    GUid: null,
    userCode: null,
    userName: null,
    displayName: ''
  };

  updateUserLogginsInfo = (e: IUserManager) => {
    this.userLoggins_pageSign.GUid = e.id;
    this.userLoggins_pageSign.userCode = e.userCode;
    this.userLoggins_pageSign.userName = e.username;
    this.userLoggins_pageSign.displayName = e.displayName;

    this.utilsService.routeTo(EN_Routes.wrmuallloggins);
  }

}
