import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IUserLoggins } from 'interfaces/iuser-manager';
import { InterfaceManagerService } from 'services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogginsService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  getLogsDataSource = (UUID: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(ENInterfaces.userLOGINS, UUID).subscribe((res: IUserLoggins[]) => {
        resolve(res)
      });
    });
  }

}
