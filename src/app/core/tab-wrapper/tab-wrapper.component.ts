import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarItemsService } from 'src/app/services/DI/sidebar-items.service';

import { ISidebarItems } from './../../Interfaces/isidebar-items';

@Component({
  selector: 'app-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit {
  tabs: ISidebarItems[] = [];
  currentRoute: ISidebarItems[];

  constructor(private router: Router, private sidebarItems: SidebarItemsService) {
    this.currentRoute = this.sidebarItems.getSideBarItems();
  }

  checkRouteStatus = () => {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        ////// just check correct route
        const currentRouteFound = this.currentRoute.find(items => {
          return items.routerUrl === this.router.url
        })
        if (currentRouteFound) {
          //////    //  
          const found = this.tabs.find(item => {
            return item.routerUrl === this.router.url
          })
          if (found) {
            console.log('we have this route now !');
            return;
          }
          else {
            this.tabs.push(currentRouteFound);
          }
        }
      }
    })
  }

  closeButtonClicked = (routerUrl: string) => {
    const a = this.tabs.filter(item => {
      return item.routerUrl !== routerUrl;
    })
    this.tabs = a;
  }

  ngOnInit(): void {


    this.checkRouteStatus();
  }

}
