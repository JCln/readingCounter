import { Injectable } from '@angular/core';

import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor(private mainService: MainService) { }

  getRole = () => {
    this.mainService.GET('V1.Test/Role/All');
  }

}
