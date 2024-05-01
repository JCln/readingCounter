import { DictionaryWrapperService } from './dictionary-wrapper.service';
import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IPrivacy, IUserMasterHistory, privacies } from './DI/privacies';
import { UtilsService } from './utils.service';
import { IUserLogginInfo, IUserManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { IIOPolicy, IOPolicy, IUserActivation } from 'interfaces/iserver-manager';
import { VerificationService } from './verification.service';

export interface IRoleNessessities {
  id: string,
  changeOrInsertUserLogId?: string,
  username?: string,
  displayName?: string,
  defaultZoneTitle?: string
}
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  userLoggins_pageSign: IUserLogginInfo = {
    GUid: null,
    userCode: null,
    userName: null,
    displayName: ''
  };
  blockedUsers_pageSign: IUserLogginInfo = {
    GUid: null,
    userCode: null,
    userName: null,
    displayName: ''
  };
  userActivationByUserId_pageSign: IUserLogginInfo = {
    GUid: null,
    userCode: null,
    userName: null,
    displayName: ''
  };

  userRoleHistoryDetails_pageSign: IRoleNessessities = {
    id: null,
    changeOrInsertUserLogId: ''
  };
  userMasterDetailsHistory_pageSign: IRoleNessessities = {
    id: null,
    changeOrInsertUserLogId: '',
    username: '',
    displayName: '',
    defaultZoneTitle: ''
  };
  userCompare_pageSign: IRoleNessessities = {
    id: null,
    changeOrInsertUserLogId: '',
    username: '',
    displayName: '',
    defaultZoneTitle: ''
  };
  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public dictionaryWrapperService: DictionaryWrapperService,
    public utilsService: UtilsService,
    public verificationService: VerificationService
  ) { }

  // API CALLS
  getPrivacyToggle = (): IPrivacy => {
    return privacies;
  }
  getIOPolicyToggle = (): IIOPolicy => {
    return IOPolicy;
  }
  editPolicy = async (policies: any) => {
    const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.editPolicies, policies);
    this.utilsService.snackBarMessageSuccess(res.message);
  }
  updateUserLogginsInfo = (e: IUserManager) => {
    this.userLoggins_pageSign.GUid = e.id;
    this.userLoggins_pageSign.userCode = e.userCode;
    this.userLoggins_pageSign.userName = e.username;
    this.userLoggins_pageSign.displayName = e.displayName;

    this.utilsService.routeTo(EN_Routes.userLoggins);
  }
  routeToUserCompare = (e: IUserMasterHistory) => {
    this.userCompare_pageSign.changeOrInsertUserLogId = e.changeOrInsertLogId;
    this.utilsService.routeTo(EN_Routes.userCompare);
  }
  updateBlockedUser = (e: IUserManager) => {
    this.blockedUsers_pageSign.GUid = e.id;
    this.utilsService.routeTo(EN_Routes.reqLogBlockedUsers);
  }
  routeToUserActivationByUserId = (e: IUserActivation) => {
    this.userActivationByUserId_pageSign.GUid = e.id;
    this.utilsService.routeTo(EN_Routes.userActivationByuserId);
  }

}
