import { Injectable } from '@angular/core';

import { IUserEditManager } from '../Interfaces/iuser-manager';
import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {

  constructor(private interfaceManagerService: InterfaceManagerService) { }

  getContactSource = (uuid: string): Promise<IUserEditManager> => {
    console.log(uuid);
    
    return new Promise((resolve, reject) => {
      this.interfaceManagerService.getUserContactManager(uuid).subscribe(res => {
        if (res) {
          
          resolve(res);
        }
      });
    });
  }
}
