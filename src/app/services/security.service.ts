import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IResponses } from 'interfaces/ioverall-config';

import { IPrivacy, privacies } from './DI/privacies';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';
import { EN_messages } from 'interfaces/enums.enum';
import { MathS } from '../classes/math-s';

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
  getDataSource = (method: ENInterfaces): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GET(method).toPromise().then((res: IResponses) => {
        resolve(res);
      })
    });
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

        return new Promise((resolve) => {
          this.interfaceManagerService.POSTBODY(ENInterfaces.editPolicies, policies).toPromise().then((res: IResponses) => {
            this.utilsService.snackBarMessageSuccess(res.message);
            resolve(res);
          })
        })
      }
      else {
        this.utilsService.snackBarMessageWarn(EN_messages.needMoreAccess)
      }
    }
  }

}
