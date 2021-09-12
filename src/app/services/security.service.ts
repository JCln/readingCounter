import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IPrivacy } from 'interfaces/inon-manage';
import { IResponses } from 'interfaces/ioverall-config';

import { privacies } from './DI/privacies';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private interfaceManagerService: InterfaceManagerService,
    private utilsService: UtilsService
  ) { }

  // API CALLS
  getPrivacyToggle = (): IPrivacy => {
    return privacies;
  }
  getPolicy = (): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(ENInterfaces.getPolicies).toPromise().then((res: IResponses) => {
        resolve(res);
      })
    });
  }
  editPolicy = (policies: any) => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(ENInterfaces.editPolicies, policies).toPromise().then((res: IResponses) => {
        this.utilsService.snackBarMessageSuccess(res.message);
        resolve(res);
      })
    })
  }

}
