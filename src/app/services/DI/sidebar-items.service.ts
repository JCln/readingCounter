import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISidebarItems } from 'src/app/Interfaces/isidebar-items';

import { InterfaceService } from '../interface.service';
import { sidebarItemsTest } from './sidebarItems';

@Injectable({
  providedIn: 'root'
})
export class SidebarItemsService {

  constructor(private interfaceService: InterfaceService) { }

  getSideBarItems = (): Observable<ISidebarItems[]> => {
    return this.interfaceService.getSideBar();
  }
  getTestSideTest = () => {
    return sidebarItemsTest;
  }
}
