import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarItemsService } from 'src/app/services/DI/sidebar-items.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { ITabs } from './../../Interfaces/isidebar-items';


@Component({
  selector: 'app-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit {
  tabs: ITabs[] = [];
  // currentRoute: any[] = [];
  currentRoute: any;
  @Output() childPageTitle = new EventEmitter<string>();

  constructor(
    private router: Router,
    private sideBarItemsService: SidebarItemsService,
    private interactionService: InteractionService
  ) {
    this.sideBarItemsService.getSideBarItems().subscribe((sidebars: any) => {
      if (sidebars) {
        this.currentRoute = sidebars.items;
        this.currentRoute.map((items: any) => {
          items.subItems.map((subItems: any) => {
            this.currentRoute.push(subItems);
          })
        })
      }
    })
    // this.currentRoute = this.sideBarItemsService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;
    // this.currentRoute.map((items: any) => {
    //   items.subItems.map((subItems: any) => {
    //     this.currentRoute.push(subItems);
    //   })
    // })
  }

  checkRouteStatus = () => {
    const refreshPage = window.location.pathname;

    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd || refreshPage !== '/wr') {

        ////// just check correct route
        const currentRouteFound = this.currentRoute.find((items: any) => {
          return items.route === this.router.url
        })

        if (currentRouteFound) {
          //////    //  
          const found = this.tabs.find((item: any) => {
            return item.route === this.router.url
          })
          if (found) {
            console.log('we have this route now !');
            return;
          }
          else {
            this.tabs.push(currentRouteFound);
            this.childPageTitle.emit(Object.values(this.tabs).pop().title);
          }
        }
      }
    })
  }
  isNull = (value: any) => typeof value === 'undefined' || !value || value.length === 0;
  isLatestTab = () => {
    const a = this.tabs.map(item => {
      return item;
    })

    if (this.isNull(a[0]))
      this.router.navigateByUrl('/wr');
    else {
      this.backToPreviousPage();
    }
  }
  backToPreviousPage = () => {
    const b = this.tabs.slice(-1).map((item: any) => item.route);
    this.router.navigate(b);
    this.childPageTitle.emit(Object.values(this.tabs).pop().title);
  }
  closeAllTabs = () => {
    this.tabs.length = 1;
    this.router.navigateByUrl('/wr');
    this.childPageTitle.emit(Object.values(this.tabs).pop().title);
  }
  closeButtonClicked = (routerUrl: string) => {
    const a = this.tabs.filter((item: any) => {
      return item.route !== routerUrl;
    })
    this.tabs = a;
    this.backToPreviousPage();
  }
  addDashboardTab = () => {
    const a = {
      route: '/wr', title: 'نقشه/داشبورد', cssClass: '', logicalOrder: 0, isClosable: false, isRefreshable: false
    };
    this.tabs.push(a);
  }
  ngOnInit(): void {
    this.addDashboardTab();
    this.checkRouteStatus();
  }
  refreshCurrentPage = (tabRoute: string) => {
    this.interactionService.setRefresh(tabRoute);
  }

}
