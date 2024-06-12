import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  currentRoute: any;
  @Output() routeClick = new EventEmitter<any>();

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
  routeClicked = () => {
    this.routeClick.emit();
  }
  appClicked(item: any) {
    this.currentRoute.forEach((aApp) => {
      if (item.title !== aApp.title) {
        aApp.isOpen = false;
      }
      else {
        aApp.isOpen = true;
        aApp.items.forEach((_item) => {
          _item.isOpen = true;
          _item.isInController = false;
        })
      }
      //when app clicked all controllers should hide
      aApp.items.forEach((_item) => {
        _item.subItems.forEach((_subItem) => {
          _subItem.isOpen = false;
        })
      })
    })
  }
  moduleClicked(item: any) {
    this.currentRoute.forEach((aApp) => {
      aApp.items.forEach((_item) => {
        if (item.title !== _item.title) {
          _item.isOpen = false;
          _item.isInController = true;
        }
        else {
          _item.isOpen = true;
          _item.isInController = true;
          _item.subItems.forEach((_subItem) => {
            _subItem.isOpen = true;
          })
        }
      })
    })
  }
  backToModule(item: any) {
    this.currentRoute.forEach((aApp) => {
      if (item.title !== aApp.title) {
        aApp.isOpen = false;
      }
      else {
        aApp.isOpen = true;
        aApp.items.forEach((_item) => {
          // _item.isOpen = true;
          _item.isInController = false;
        })
      }
    })
    this.currentRoute.forEach(aApp => {
      aApp.items.forEach((item2) => {
        item2.isInController = false;
      })
    })
    console.log(this.currentRoute);
  }
}
