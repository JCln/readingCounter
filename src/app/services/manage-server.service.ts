import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ENRandomNumbers, ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';
import { IManageServerErrors } from 'interfaces/iserver-manager';

import { JwtService } from '../auth/jwt.service';
import { MathS } from '../classes/math-s';
import { serverErrors, serverTasts } from './DI/manageServer';
import { EnvService } from './env.service';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ManageServerService {

  serverErrors: IManageServerErrors[] = serverErrors;
  _isCollapsed: boolean = false;

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService,
    private envService: EnvService,
    private jwtService: JwtService
  ) { }

  getManageServerItems = () => {
    return serverTasts;
  }
  postDataServer = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(method).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  postBody = (method: ENInterfaces, val: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, val).subscribe((res) => {
        resolve(res)
      })
    });
  }

  postArray = (data: any[]): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTARRAYS(ENInterfaces.serverManagerErrors, data).toPromise().then(res => {
        resolve(res);
      })
    });
  }
  linkToElmah = (body: string) => {
    window.open(this.envService.API_URL + ENInterfaces.serverManagerErrorsElmah + body, '_blank');
  }
  linkToHangFire = () => {
    window.open(this.envService.API_URL + ENInterfaces.serverManagerHangFire + this.jwtService.getAuthorizationToken(), '_blank');
  }
  linkToHealthCheck = () => {
    window.open(this.envService.API_URL + ENInterfaces.serverManagerHealthCheck, '_blank');
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

}
