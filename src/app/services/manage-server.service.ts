import { Injectable } from '@angular/core';

import { serverTasts } from './DI/manageServer';

@Injectable({
  providedIn: 'root'
})
export class ManageServerService {

  constructor() { }
  getManageServerItems = () => {
    return serverTasts;
  }
}
