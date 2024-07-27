import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  currentRoute: any;
  @Output() routeClick = new EventEmitter<any>();
  searchItem: string = '';

  constructor(
    private sideBarItemsService: SidebarItemsService,
    public utilsService: UtilsService
  ) {
    this.getSidebar();
  }

  getSidebar = async () => {
    const sidebars = await this.sideBarItemsService.getSideBarItems();
    this.currentRoute = sidebars.sidebarApps;
    this.showFirstModuleView();
    // this.currentRoute = this.testSidebarService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;
  }
  routeClicked = () => {
    this.routeClick.emit();
  }
  showFirstModuleView() {
    const showElement: number = 0;
    this.currentRoute[showElement].isOpen = true;
    this.currentRoute[showElement].items.forEach(element => {
      element.isOpen = true;
    })
    for (let index = 0; index < this.currentRoute.length; index++) {

      for (let j = 0; j < this.currentRoute[index].items.length; j++) {
        this.currentRoute[index].items[j].isInController = false;
      }
    }
  }
  emptyTheSearchInput() {
    this.searchItem = '';
    this.currentRoute.forEach((aApp) => {
      aApp.items.forEach((_item) => {
        _item.isOpen = true;
        _item.isInController = false;
        _item.subItems.forEach((_subItem) => {
          _subItem.isOpen = false;
        })
      })
    })
  }
  appClicked(item: any) {
    this.emptyTheSearchInput();
    item.cssClass = 'fa fa-folder-open-o';
    this.currentRoute.forEach((aApp) => {
      if (item.title !== aApp.title) {
        aApp.isOpen = false;
        aApp.cssClass = 'pi pi-folder';
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
  doGatherCleanToBackToModule(test, item): any {
    test.forEach((aApp) => {
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
    return test;
  }
  backToModule(item: any) {
    let test = JSON.parse(JSON.stringify(this.currentRoute));
    this.currentRoute = this.doGatherCleanToBackToModule(test, item);
  }
  searchSubItems() {
    if (this.searchItem.length === 0) {
      this.emptyTheSearchInput();
    }
    else {
      this.currentRoute.forEach((aApp) => {
        aApp.items.forEach((_item) => {
          _item.subItems.forEach((_subItem) => {
            if (_subItem.title.includes(this.searchItem)) {
              _item.isOpen = true;
              _subItem.isOpen = true;
            }
            else {
              _subItem.isOpen = false;
            }
          })
        })
      })
    }
  }

}
