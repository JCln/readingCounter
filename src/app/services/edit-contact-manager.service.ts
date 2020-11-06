import { Injectable } from '@angular/core';

import { InterfaceManagerService } from './interface-manager.service';

@Injectable({
  providedIn: 'root'
})
export class EditContactManagerService {

  constructor(private interfaceManagerService: InterfaceManagerService) { }

 
}
