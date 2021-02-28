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
      { field: 'isActive', header: 'قفل', isSelected: true },
      { field: 'isLocked', header: 'فعال', isSelected: true },
      { field: 'mobile', header: 'موبایل', isSelected: true },
      { field: 'displayName', header: 'نام متخصار', isSelected: true },
      { field: 'username', header: 'نام کاربری', isSelected: true },
      { field: 'userCode', header: 'کد', isSelected: true }
    ];
  }
  connectToServer = (): Observable<any> => {
    return this.interfaceManagerService.getAllUserContactsManager();
  }
}
