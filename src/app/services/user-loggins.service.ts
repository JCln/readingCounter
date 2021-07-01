import { Injectable } from '@angular/core';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { ENInterfaces } from '../Interfaces/en-interfaces.enum';
import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { IUserLoggins } from './../Interfaces/iuser-manager';

@Injectable({
  providedIn: 'root'
})
export class UserLogginsService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  columnSelectedUserLogs = (): IObjectIteratation[] => {
    return [
      { field: 'loginDateTime', header: 'زمان', isSelected: false },
      { field: 'loginIp', header: 'IP', isSelected: true },
      { field: 'wasSuccessful', header: 'موفق', isSelected: true },
      { field: 'browserVersion', header: 'نسخه مرورگر', isSelected: true },
      { field: 'browserTitle', header: 'عنوان مرورگر', isSelected: true },
      { field: 'browserShortTitle', header: 'عنوان مرورگر', isSelected: false },
      { field: 'browserEngine', header: 'موتور مرورگر', isSelected: true },
      { field: 'browserType', header: 'نوع مرورگر', isSelected: false },
      { field: 'osVersion', header: 'نسخه سیستم عامل', isSelected: true },
      // { field: 'userId', header: 'کد کاربر', isSelected: true },
      { field: 'osTitle', header: 'عنوان سیستم عامل', isSelected: true },
      { field: 'osPlatform', header: 'پلتفرم', isSelected: true },
      // { field: 'osShortTitle', header: 'عنوان سیستم عامل', isSelected: false },
      { field: 'wrongPassword', header: 'گذرواژه', isSelected: true },
      // { field: 'id', header: 'کد', isSelected: false },
      { field: 'userAgent', header: 'userAgent', isSelected: false },
    ];
  }
  getLogsDataSource = (UUID: string): Promise<any> => {
    try {
      return new Promise((resolve) => {
        this.interfaceManagerService.GETID(ENInterfaces.userLOGINS, UUID).subscribe((res: IUserLoggins[]) => {
          resolve(res)
        });
      });
    } catch (e) {
      console.error(e);

    }
  }
  customizeSelectedColumns = (_selectCols: any) => {
    return _selectCols.filter(items => {
      if (items.isSelected)
        return items
    })
  }

}
