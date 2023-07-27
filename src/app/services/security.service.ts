import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IResponses } from 'interfaces/ioverall-config';
import { IPrivacy, privacies } from './DI/privacies';
import { InterfaceManagerService } from './interface-manager.service';
import { UtilsService } from './utils.service';
import { EN_messages } from 'interfaces/enums.enum';
import { MathS } from '../classes/math-s';

export interface IRoleNessessities {
  id: string,
  changeOrInsertUserLogId?: string
}
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  userRoleHistoryDetails_pageSign: IRoleNessessities = {
    id: null,
  };
  userMasterDetailsHistory_pageSign: IRoleNessessities = {
    id: null,
    changeOrInsertUserLogId: ''
  };
  constructor(
    private interfaceManagerService: InterfaceManagerService,
    public utilsService: UtilsService
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
  getDataSourceByQuery = (method: ENInterfaces, queryString: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(method, queryString).toPromise().then((res: IResponses) => {
        resolve(res);
      })
    });
  }
  postDataSource = (method: ENInterfaces, body: object): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.POSTBODY(method, body).toPromise().then((res: IResponses) => {
        resolve(res);
      })
    })
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
        const res = await this.postDataSource(ENInterfaces.editPolicies, policies);
        this.utilsService.snackBarMessageSuccess(res.message);
      }
      else {
        this.utilsService.snackBarMessageWarn(EN_messages.insert_TrueKey);
      }
    }
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

}
