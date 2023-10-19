import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IPolicies, IPrivacy, privacies } from './DI/privacies';
import { UtilsService } from './utils.service';
import { EN_messages } from 'interfaces/enums.enum';
import { MathS } from '../classes/math-s';
import { IUserLogginInfo, IUserManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { IIOPolicy, IOPolicy } from 'interfaces/iserver-manager';
import { ENRandomNumbers } from 'interfaces/ioverall-config';

export interface IRoleNessessities {
  id: string,
  changeOrInsertUserLogId?: string
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

  userRoleHistoryDetails_pageSign: IRoleNessessities = {
    id: null,
  };
  userMasterDetailsHistory_pageSign: IRoleNessessities = {
    id: null,
    changeOrInsertUserLogId: ''
  };
  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public utilsService: UtilsService
  ) { }

  // API CALLS
  getPrivacyToggle = (): IPrivacy => {
    return privacies;
  }
  getIOPolicyToggle = (): IIOPolicy => {
    return IOPolicy;
  }
  editPolicy = async (policies: any) => {
    const config = {
      messageTitle: EN_messages.insert_Key,
      minWidth: '19rem',
      isInput: true,
      placeHolder: 'کلید را وارد نمایید',
      inputMinLength: 3,
      isDelete: false,
      icon: 'pi pi-key'
    }
    const insertedKey = await this.utilsService.firstConfirmDialog(config);
    if (MathS.isNullTextValidation(insertedKey)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Key);
    }
    else {
      if (insertedKey == 'XML') {
        const res = await this.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.editPolicies, policies);
        this.utilsService.snackBarMessageSuccess(res.message);
      }
      else {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
  }
  updateUserLogginsInfo = (e: IUserManager) => {
    this.userLoggins_pageSign.GUid = e.id;
    this.userLoggins_pageSign.userCode = e.userCode;
    this.userLoggins_pageSign.userName = e.username;
    this.userLoggins_pageSign.displayName = e.displayName;

    this.utilsService.routeTo(EN_Routes.userLoggins);
  }
  verificationTimes = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['fromTime'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_startTime);
      return false;
    }
    if (MathS.isNull(dataSource['toTime'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_endTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(dataSource['fromTime'], ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(dataSource['toTime'], ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }

    return true;
  }
  verificationDates = (dataSource: object): boolean => {
    if (dataSource.hasOwnProperty('fromDate')) {
      if (MathS.isNull(dataSource['fromDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (MathS.isNull(dataSource['toDate'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_toDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('fromDate')) {
      if (!MathS.lengthControl(dataSource['fromDate'], dataSource['fromDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_fromDate);
        return false;
      }
    }
    if (dataSource.hasOwnProperty('toDate')) {
      if (!MathS.lengthControl(dataSource['toDate'], dataSource['toDate'], 9, 10)) {
        this.utilsService.snackBarMessageWarn(EN_messages.format_invalid_toDate);
        return false;
      }
    }
    return true;
  }
  verificationPolicy = (dataSource: IPolicies): boolean => {
    if (MathS.isNull(dataSource.deactiveTerminationMinutes)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_deactiveTerminationMinutes);
      return false;
    }
    if (MathS.isNull(dataSource.maxLogRecords)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_maxLogRecords);
      return false;
    }
    return true;
  }
  verificationIOPolicyAdd = (dataSource: object): boolean => {
    if (MathS.isNull(dataSource['inputExtensions'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_inputExtensions);
      return false;
    }
    if (MathS.isNull(dataSource['contentType'])) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_contentType);
      return false;
    }
    return true;

  }

}
