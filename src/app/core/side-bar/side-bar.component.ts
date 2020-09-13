import { Component, OnInit } from '@angular/core';
import { ISidebarItems } from 'src/app/Interfaces/isidebar-items';

import { SidebarItemsService } from './../../services/DI/sidebar-items.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  currentRoute: ISidebarItems[];
  // subItems: HTMLElement;

  constructor(private sideBarItemsService: SidebarItemsService) {
    this.currentRoute = this.sideBarItemsService.getSideBarItems();
  }

  ngOnInit(): void {
  }

  openDialog(val: string) {
    location.hash = val;
    event.preventDefault();
  }
  toggleSubItems = (item: ISidebarItems): void => {
    this.currentRoute.filter(aItem => {
      if (item.isOpenItems !== aItem.isOpenItems)
        aItem.isOpenItems = false
    })
    if (item.isOpenItems)
      item.isOpenItems = false;
    else
      item.isOpenItems = true;
  }

}
