import { Injectable } from '@angular/core';
import { InterfaceManagerService } from 'src/app/services/interface-manager.service';

import { IAPK } from './../Interfaces/iapk';

@Injectable({
  providedIn: 'root'
})
export class ApkService {

  constructor(private interfaceManagerService: InterfaceManagerService) { }

  upload = (file: IAPK) => {
    this.interfaceManagerService.postAPK(file).subscribe(res => {
      console.log(res);

    })
  }
}