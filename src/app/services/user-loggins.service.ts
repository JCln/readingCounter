import { UtilsService } from 'services/utils.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserLogginInfo, IUserLoggins, IUserManager } from 'interfaces/iuser-manager';
import { EN_Routes } from 'interfaces/routes.enum';
import { InterfaceManagerService } from 'services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogginsService {

  constructor(
    public utilsService: UtilsService,
    private interfaceManagerService: InterfaceManagerService
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
  getLogsDataSource = (UUID: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(ENInterfaces.userLOGINS, UUID).subscribe((res: IUserLoggins[]) => {
        resolve(res)
      });
    });
  }

}
