import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ITabs, ITabWrapperDetectDynamicRoute } from 'interfaces/ioverall-config';
import { EN_Routes } from 'interfaces/routes.enum';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';
import { InteractionService } from 'services/interaction.service';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = []
  currentRoute: ITabs[] = [];
  @Output() childPageTitle = new EventEmitter<string>();

  constructor(
    private router: Router,
    private sideBarItemsService: SidebarItemsService,
    private interactionService: InteractionService,
    public closeTabService: CloseTabService
  ) {
    if (!this.DoesTabsHaveThisRouteNow())
      this.closeTabService.tabs.push(this.addDashboardTab());
  }
  reFetchPageTitle = () => {
    let a;
    this.closeTabService.tabs.map(item => {
      if (item.route === this.getRouterUrl())
        a = item.title;
    })
    this.childPageTitle.emit(a);
  }
  DoesCurrentRouteFound = (): ITabs => {
    return this.currentRoute.find((item: any) => {
      return item.route === this.getRouterUrl()
    })
  }
  DoesTabsHaveThisRouteNow = (): ITabs => {
    const found = this.closeTabService.tabs.find((item: any) => {
      return item.route === this.getRouterUrl()
    })
    if (found)
      return found;
    return null;
  }
  getCurrentDynamicRoute = (route: string): string => {
    if (this.getRouterUrl().includes(route))
      return route;
    return null;
  }
  filterTabs = (routerUrl: string): ITabs[] => {
    return this.closeTabService.tabs.filter((item: any) => {
      return item.route !== routerUrl
    })
  }
  findDynamicRouteStatus = (): ITabWrapperDetectDynamicRoute => {
    if (this.getCurrentDynamicRoute(EN_Routes.wrmlallfalse))
      return {
        _title: 'لیست', _dynamicRoute: EN_Routes.wrmlallfalse
      }
    if (this.getCurrentDynamicRoute(EN_Routes.wrmlalltrue))
      return {
        _title: 'لیست', _dynamicRoute: EN_Routes.wrmlalltrue
      }
    if (this.getCurrentDynamicRoute(EN_Routes['wrmtrackoffloadedoffloadMfy/']))
      return {
        _title: 'اصلاح', _dynamicRoute: EN_Routes['wrmtrackoffloadedoffloadMfy/']
      }
    return null;
  }
  dynamicRouteValidation = () => {
    let lastUrlPart: string = '';
    let completeRoutePart: string = '';

    let dRoute: ITabWrapperDetectDynamicRoute = {
      _title: '',
      _dynamicRoute: ''
    }
    dRoute = this.findDynamicRouteStatus();
    if (MathS.isNull(dRoute))
      return;
    else {
      lastUrlPart = this.router.url.split('/').pop().substring(0, 5);
      completeRoutePart = this.router.url.split('/').pop();
    }
    // console.log(completeRoutePart);
    // console.log(dRoute._dynamicRoute);
    // console.log(lastUrlPart);

    const a = {
      route: `${dRoute._dynamicRoute}${completeRoutePart}`, title: `${dRoute._title}${lastUrlPart}`, cssClass: '', logicalOrder: 0, isClosable: true, isRefreshable: true
    };

    if (MathS.isNull(this.DoesTabsHaveThisRouteNow())) {
      this.closeTabService.tabs.push(a);
      // this.reFetchPageTitle();
    }
    this.reFetchPageTitle();
  }
  getRouterUrl = (): string => { return this.router.url; }
  staticRouteValidation = () => {
    if (!this.DoesTabsHaveThisRouteNow()) {
      this.getRouterUrl() === EN_Routes.wrprofile ? this.closeTabService.tabs.push(this.addProfileTab()) : ''
    }
  }
  verification = () => {
    const currentRouteFound = this.DoesCurrentRouteFound();
    this.staticRouteValidation();
    if (currentRouteFound) {
      if (this.DoesTabsHaveThisRouteNow()) {
        this.reFetchPageTitle();
      }
      else {
        this.closeTabService.tabs.push(currentRouteFound);
        this.reFetchPageTitle();
      }
    } else {
      this.dynamicRouteValidation();
    }
    this.reFetchPageTitle();
  }
  getTabWrapper = async () => {
    this.sideBarItemsService.getLatestItems().subscribe(res => {
      res.map((items: any) => {
        items.subItems.map((subItems: any) => {
          this.currentRoute.push(subItems);
          this.verification();
        })
      })
    })
  }
  changedRouteListener = () => {
    this.subscription.push(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          this.verification();
        })
    )
  }
  ngOnInit(): void {
    this.getTabWrapper();
    this.changedRouteListener();
  }
  isLatestTab = () => {
    const a = this.closeTabService.tabs.map(item => {
      return item;
    })

    if (MathS.isNull(a[0])) {
      this.router.navigateByUrl(EN_Routes.wr);
      this.reFetchPageTitle();
    }
    else {
      this.backToPreviousPage();
      this.reFetchPageTitle();
    }
  }
  backToPreviousPage = () => {
    const b = this.closeTabService.tabs.slice(-1).map((item: any) => item.route);
    this.router.navigate(b);
    this.reFetchPageTitle();
  }
  closeAllTabs = async () => {
    await this.setCloseAllTabs();
    this.router.navigateByUrl(EN_Routes.wr);
    this.closeAllExeptOne();
    this.reFetchPageTitle();
  }
  closeButtonClicked = (routerUrl: string) => {
    this.closeTabService.tabs = this.filterTabs(routerUrl);
    if (this.router.url === routerUrl) {
      this.backToPreviousPage();
    }
    this.closeCurrentPage(routerUrl);
  }
  addDashboardTab = () => {
    return {
      route: EN_Routes.wr, title: 'نقشه/ داشبورد', cssClass: '', logicalOrder: 0, isClosable: false, isRefreshable: false
    };
  }
  addProfileTab = () => {
    return {
      route: EN_Routes.wrprofile, title: 'تنظیمات کاربری', cssClass: '', logicalOrder: 0, isClosable: true, isRefreshable: true
    }
  }
  refreshCurrentPage = (tabRoute: string) => {
    this.interactionService.setRefresh(tabRoute);
  }
  closeCurrentPage = (tabRoute: string) => {
    this.closeTabService.cleanData(tabRoute);
  }
  closeAllExeptOne = () => this.closeTabService.tabs.length = 1;
  setCloseAllTabs = (): Promise<boolean> => {
    try {
      return new Promise((resolve) => {
        this.closeTabService.tabs.forEach(val => {
          return this.closeTabService.cleanData(val.route)
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
