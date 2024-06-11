import { Component } from '@angular/core';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  currentRoute: any;
  constructor(
    private sideBarItemsService: SidebarItemsService
  ) {
    this.getSidebar();
  }

  getSidebar = async () => {
    const sidebars = await this.sideBarItemsService.getSideBarItems();
    this.currentRoute = sidebars.sidebarApps;
    // this.currentRoute = this.testSidebarService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;
  }
  appClicked(item: any) {
    this.currentRoute.forEach((aApp) => {
      if (item.title !== aApp.title) {
        aApp.isOpen = false;
        console.log(item.title);
      }
      else {
        aApp.isOpen = true;
        aApp.items.forEach((_item) => {
          _item.isOpen = true;
        })
      }
    })
    console.log(this.currentRoute);
  }
  moduleClicked(item: any) {
    this.currentRoute.forEach((aApp) => {
      aApp.items.forEach((_item) => {
        if (item.title !== _item.title) {
          _item.isOpen = false;
        }
        else {
          _item.isOpen = true;
        }
      })
    })
  }
  backToModule(item: any) {
    this.currentRoute.forEach((aApp) => {
      aApp.items.forEach((_item) => {
        if (item.title !== _item.title) {
          _item.isOpen = true;
        }
      })
    })
  }
}
