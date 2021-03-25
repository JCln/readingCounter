import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ISidebarItems, ITabs, ITabWrapperDetectDynamicRoute } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { SidebarItemsService } from 'src/app/services/DI/sidebar-items.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = []
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
  findDynamicRouteStatus = (): ITabWrapperDetectDynamicRoute => {
    if (this.getCurrentDynamicRoute('/wr/m/l/pd/'))
      return {
        _title: 'مامور', _dynamicRoute: '/wr/m/l/pd/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/l/all/'))
      return {
        _title: 'قرائت', _dynamicRoute: '/wr/m/l/all/'
      }
    if (this.getCurrentDynamicRoute('/wr/mu/edit/'))
      return {
        _title: 'ویرایش', _dynamicRoute: '/wr/mu/edit/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/track/fwu/'))
      return {
        _title: 'پیگیری', _dynamicRoute: '/wr/m/track/fwu/'
      }
    if (this.getCurrentDynamicRoute('/wr/mu/all/loggins/'))
      return {
        _title: 'ورود', _dynamicRoute: '/wr/mu/all/loggins/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/track/woui'))
      return {
        _title: 'صوت/تصویر', _dynamicRoute: '/wr/m/track/woui'
      }
    return null;
  }
  addDynamicRoute = () => {
    let dRoute: ITabWrapperDetectDynamicRoute = {
      _title: '',
      _dynamicRoute: ''
    }
    dRoute = this.findDynamicRouteStatus();
    if (this.utilsService.isNull(dRoute))
      return;
    const completeRoutePart = this.router.url.split('/').pop();
    const lastUrlPart = this.router.url.split('/').pop().substring(0, 5);
    const a = {
      route: `${dRoute._dynamicRoute}${completeRoutePart}`, title: `${dRoute._title}${lastUrlPart}`, cssClass: '', logicalOrder: 0, isClosable: true, isRefreshable: true
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
      this.addDynamicRoute();
      this.reFetchPageTitle();
    }
    ////// just check correct route
    this.subscription.push(this.router.events.subscribe(res => {
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
          this.addDynamicRoute();
        }
      }
    }))
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
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
}
