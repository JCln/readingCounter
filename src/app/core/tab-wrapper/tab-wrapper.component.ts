import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ISidebarItems, ITabs } from 'src/app/Interfaces/isidebar-items';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { SidebarItemsService } from 'src/app/services/DI/sidebar-items.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UtilsService } from 'src/app/services/utils.service';

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
    private interactionService: InteractionService,
    private closeTabService: CloseTabService
  ) {
  }
  reFetchPageTitle = () => this.childPageTitle.emit(Object.values(this.tabs).pop().title);
  DoesCurrentRouteFound = (): ITabs => {
    const currentRouteFound = this.currentRoute.find((item: any) => {
      return item.route === this.router.url
    })
    return currentRouteFound;
  }
  DoesTabsHaveThisRouteNow = (): ITabs => {
    const found = this.tabs.find((item: any) => {
      return item.route === this.router.url
    })
    return found;
  }
  getCurrentDynamicRoute = (route: string): string => {
    if (this.router.url.includes(route))
      return route;
    return null;
  }
  doSth = () => {
    let title: string = 'ویرایش'
    let _dynamicRoute = this.getCurrentDynamicRoute('/wr/mu/edit/');
    if (this.utilsService.isNull(_dynamicRoute)) {
      _dynamicRoute = this.getCurrentDynamicRoute('/wr/m/l/pd/');
      title = 'مامور';
      if (this.utilsService.isNull(_dynamicRoute)) {
        _dynamicRoute = this.getCurrentDynamicRoute('/wr/m/l/all/');
        title = 'قرائت';
        if (this.utilsService.isNull(_dynamicRoute)) {
          return;
        }
      }
    }
    const completeRoutePart = this.router.url.split('/').pop();
    const lastUrlPart = this.router.url.split('/').pop().substring(0, 5);
    console.log(completeRoutePart);
    console.log(lastUrlPart);


    const a = {
      route: `${_dynamicRoute}${completeRoutePart}`, title: `${title}${lastUrlPart}`, cssClass: '', logicalOrder: 0, isClosable: true, isRefreshable: true
    };
    if (!this.DoesTabsHaveThisRouteNow())
      this.tabs.push(a);
  }
  testCheck = () => {
    if (this.router.url !== '/wr') {
      const currentRouteFound = this.currentRoute.find((item: any) => {
        return item.route === this.router.url
      })
      if (currentRouteFound)
        this.tabs.push(currentRouteFound);
      this.doSth();
      this.reFetchPageTitle();
    }
    ////// just check correct route
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        const currentRouteFound = this.DoesCurrentRouteFound();
        if (currentRouteFound) {
          if (this.DoesTabsHaveThisRouteNow()) {
            console.log('we have this route now !');
            return;
          }
          else {
            this.tabs.push(currentRouteFound);
            this.reFetchPageTitle();
          }
        } else {
          this.doSth();
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
    await this.setCloseAllTabs();
    this.router.navigateByUrl('/wr');
    this.closeAllExeptOne();
    this.reFetchPageTitle();
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
    this.closeTabService.setClose(tabRoute);
  }
  closeAllExeptOne = () => this.tabs.length = 1;
  setCloseAllTabs = (): Promise<boolean> => {
    try {
      return new Promise((resolve) => {
        this.tabs.forEach(val => {
          return this.closeTabService.setClose(val.route)
        })
        resolve(true)
      });
    } catch (error) {
      console.error(error);
    }
  };

}
