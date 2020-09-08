import { Injectable } from '@angular/core';

import { sidebarItems } from './sidebarItems';

@Injectable({
  providedIn: 'root'
})
export class SidebarItemsService {

  constructor() { }
  getSideBarItems = () => {
    return sidebarItems;
  }
}
