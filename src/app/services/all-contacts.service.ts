import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AllContactsService {

  constructor(
    private interfaceManagerService: InterfaceManagerService
  ) { }

  connectToServer = (): Observable<any> => {
    return this.interfaceManagerService.getAllUserContactsManager();
  }
}
