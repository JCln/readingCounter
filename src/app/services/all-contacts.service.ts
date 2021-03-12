import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { IObjectIteratation } from '../Interfaces/ioverall-config';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AllContactsService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  columnSelectedUserAllContacts = (): IObjectIteratation[] => {
    return [
      { field: 'isActive', header: 'فعال', isSelected: true, ltr: false },
      { field: 'isLocked', header: 'قفل', isSelected: true, ltr: false },
      { field: 'mobile', header: 'موبایل', isSelected: true, ltr: true },
      { field: 'displayName', header: 'نام مستعار', isSelected: true, ltr: false },
      { field: 'username', header: 'نام کاربری', isSelected: true, ltr: false },
      { field: 'userCode', header: 'کد', isSelected: true, ltr: false }
    ];
  }
  connectToServer = (): Observable<any> => {
    return this.interfaceManagerService.getAllUserContactsManager();
  }
}
