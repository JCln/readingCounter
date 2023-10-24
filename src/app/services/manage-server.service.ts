import { AjaxReqWrapperService } from './ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarTimes, EN_messages } from 'interfaces/enums.enum';
import { IManageServerErrors } from 'interfaces/iserver-manager';

import { JwtService } from '../auth/jwt.service';
import { MathS } from '../classes/math-s';
import { serverErrors, serverTasts } from './DI/manageServer';
import { UtilsService } from './utils.service';
import { DictionaryWrapperService } from './dictionary-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ManageServerService {

  serverErrors: IManageServerErrors[] = serverErrors;

  constructor(
    public ajaxReqWrapperService: AjaxReqWrapperService,
    public utilsService: UtilsService,
    private jwtService: JwtService,
    public dictionaryWrapperService: DictionaryWrapperService
  ) { }

  getManageServerItems = () => {
    return serverTasts;
  }
  linkToElmah = (body: string) => {
    window.open(this.utilsService.envService.API_URL + ENInterfaces.serverManagerErrorsElmah + body, '_blank');
  }
  linkToHangFire = () => {
    window.open(this.utilsService.envService.API_URL + ENInterfaces.serverManagerHangFire + this.jwtService.getAccessToken(), '_blank');
  }
  linkToHealthCheck = () => {
    window.open(this.utilsService.envService.API_URL + ENInterfaces.serverManagerHealthCheck, '_blank');
  }
  showSnack = (message: string, color: ENSnackBarColors) => {
    this.utilsService.snackBarMessage(message, ENSnackBarTimes.fourMili, color);
  }
  private datesValidation = (body: object): boolean => {
    if (body.hasOwnProperty('jalaliDay')) {
      if (MathS.isNull(body['jalaliDay'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_date);
        return false;
      }
    }
    if (body.hasOwnProperty('fromTime')) {
      if (MathS.isNull(body['fromTime'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_startTime);
        return false;
      }
    }
    if (body.hasOwnProperty('toTime')) {
      if (MathS.isNull(body['toTime'])) {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_endTime);
        return false;
      }
    }
    if (!MathS.isExactLengthYouNeed(body['fromTime'], ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }
    if (!MathS.isExactLengthYouNeed(body['toTime'], ENRandomNumbers.five)) {
      this.utilsService.snackBarMessageWarn(EN_messages.format_isNotExactLengthEndTime);
      return false;
    }

    return true;
  }
  verificationRequestLogInput = (body: object): boolean => {
    return this.datesValidation(body);
  }
  validationAddIpRules = (body: any): boolean => {
    if (MathS.isNull(body.ip)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_IP);
      return false;
    }
    if (MathS.isNull(body.period)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_Period);
      return false;
    }
    if (MathS.isNull(body.limit)) {
      this.utilsService.snackBarMessageWarn(EN_messages.insert_limit);
      return false;
    }
    return true;
  }

}
