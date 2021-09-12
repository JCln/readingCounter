import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IObjectIteratation } from 'interfaces/ioverall-config';
import { IUserLoggins } from 'interfaces/iuser-manager';
import { InterfaceManagerService } from 'services/interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogginsService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  columnSelectedUserLogs = (): IObjectIteratation[] => {
    return [
      { field: 'loginDateTime', header: 'زمان', isSelected: true },
      { field: 'loginIp', header: 'IP', isSelected: true },
      { field: 'wasSuccessful', header: 'موفق', isSelected: true, isBoolean: true },
      { field: 'browserVersion', header: 'نسخه مرورگر', isSelected: true },
      { field: 'browserTitle', header: 'عنوان مرورگر', isSelected: true },
      { field: 'browserShortTitle', header: 'عنوان مرورگر', isSelected: false },
      { field: 'browserEngine', header: 'موتور مرورگر', isSelected: false },
      { field: 'browserType', header: 'نوع مرورگر', isSelected: false },
      { field: 'osVersion', header: 'OS Version', isSelected: true },
      // { field: 'userId', header: 'کد کاربر', isSelected: true },
      { field: 'osTitle', header: 'OS', isSelected: true },
      { field: 'osPlatform', header: 'پلتفرم', isSelected: false },
      // { field: 'osShortTitle', header: 'عنوان سیستم عامل', isSelected: false },
      { field: 'wrongPassword', header: 'گذرواژه', isSelected: false },
      // { field: 'id', header: 'کد', isSelected: false },
      { field: 'userAgent', header: 'userAgent', isSelected: false },
    ];
  }
  getLogsDataSource = (UUID: string): Promise<any> => {
    return new Promise((resolve) => {
      this.interfaceManagerService.GETID(ENInterfaces.userLOGINS, UUID).subscribe((res: IUserLoggins[]) => {
        resolve(res)
      });
    });
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

}
