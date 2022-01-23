import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IManageServerErrors } from 'interfaces/imanage';
import { ENSnackBarColors, ENSnackBarTimes } from 'interfaces/ioverall-config';

import { JwtService } from '../auth/jwt.service';
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
  postDataServer = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POST(ENInterfaces.serverManagerDelete).toPromise().then(res => {
        resolve(res);
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

}
