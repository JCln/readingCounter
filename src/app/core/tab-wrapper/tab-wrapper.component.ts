import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ISidebarItems, ITabs } from 'src/app/Interfaces/isidebar-items';
import { SidebarItemsService } from 'src/app/services/DI/sidebar-items.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { UtilsService } from './../../services/utils.service';



@Component({
  selector: 'app-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit, AfterViewInit {
  tabs: ITabs[] = [];
  currentRoute: ITabs[] = [];
  @Output() childPageTitle = new EventEmitter<string>();

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private sideBarItemsService: SidebarItemsService,
    private interactionService: InteractionService
  ) {
  }
  reFetchPageTitle = () => this.childPageTitle.emit(Object.values(this.tabs).pop().title);
  testCheck = () => {
    if (this.router.url !== '/wr') {
      const currentRouteFound = this.currentRoute.find((item: any) => {
        return item.route === this.router.url
      })
      this.tabs.push(currentRouteFound);
      this.reFetchPageTitle();
    }
    ////// just check correct route
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {

        const currentRouteFound = this.currentRoute.find((item: any) => {
          return item.route === this.router.url
        })

        if (currentRouteFound) {
          const found = this.tabs.find((item: any) => {
            return item.route === this.router.url
          })
          if (found) {
            console.log('we have this route now !');
            return;
          }
          else {
            this.tabs.push(currentRouteFound);
            this.reFetchPageTitle();
          }
        }
      }
    })
  }
  isLatestTab = () => {
    const a = this.tabs.map(item => {
      return item;
    })

    if (this.utilsService.isNull(a[0]))
      this.router.navigateByUrl('/wr');
    else {
      this.backToPreviousPage();
    }
  }
  backToPreviousPage = () => {
    const b = this.tabs.slice(-1).map((item: any) => item.route);
    this.router.navigate(b);
    this.reFetchPageTitle();
  }
  closeAllTabs = async () => {
    this.router.navigateByUrl('/wr');
    await this.setCloseAllTabs();
    this.reFetchPageTitle();
    this.closeAllExeptOne();
  }
  closeButtonClicked = (routerUrl: string) => {
    const a = this.tabs.filter((item: any) => {
      return item.route !== routerUrl;
    })
    this.tabs = a;
    this.backToPreviousPage();
    this.closeCurrentPage(routerUrl);
  }
  addDashboardTab = () => {
    const a = {
      route: '/wr', title: 'نقشه/داشبورد', cssClass: '', logicalOrder: 0, isClosable: false, isRefreshable: false
    };
    this.tabs.push(a);
  }
  getTabItems = (): Promise<ISidebarItems> => {
    return new Promise((resolve) => {
      this.sideBarItemsService.getLatestItems().subscribe((sidebars: ISidebarItems) => {
        if (sidebars) {
          resolve(sidebars);
        }
      })
    });
  }
  getTabWrapper = async () => {
    const a = await this.getTabItems();
    if (a) {
      const temp = a.items;
      temp.map((items: any) => {
        items.subItems.map((subItems: any) => {
          this.currentRoute.push(subItems);
        })
      })
      this.testCheck();
    }

  }
  ngOnInit(): void {
    this.addDashboardTab();
    this.getTabWrapper();
    // this.currentRoute = this.sideBarItemsService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;
    // this.currentRoute.map((items: any) => {
    //   items.subItems.map((subItems: any) => {
    //     this.currentRoute.push(subItems);
    //   })
    // })
  }
  ngAfterViewInit(): void {
  }
  refreshCurrentPage = (tabRoute: string) => {
    this.interactionService.setRefresh(tabRoute);
  }
  closeCurrentPage = (tabRoute: string) => {
    this.interactionService.setClose(tabRoute);
  }
  closeAllExeptOne = () => this.tabs.length = 1;
  setCloseAllTabs = (): Promise<boolean> => {
    try {
      return new Promise((resolve) => {
        this.tabs.forEach(val => {
          console.log(val.route);
          return this.interactionService.setClose(val.route)
        })
        resolve(true)
      });
    } catch (error) {
      console.error(error);
    }
  };

}
