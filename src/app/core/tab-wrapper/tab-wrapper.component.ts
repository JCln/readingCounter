import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ITabs, ITabWrapperDetectDynamicRoute } from 'interfaces/ioverall-config';
import { filter } from 'rxjs/internal/operators/filter';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';
import { InteractionService } from 'services/interaction.service';
import { UtilsService } from 'services/utils.service';

@Component({
  selector: 'app-tab-wrapper',
  templateUrl: './tab-wrapper.component.html',
  styleUrls: ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit, OnDestroy {
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
    this.tabs.push(this.addDashboardTab());
  }
  reFetchPageTitle = () => {
    let a;
    this.tabs.map(item => {
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
    const found = this.tabs.find((item: any) => {
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
  findDynamicRouteStatus = (): ITabWrapperDetectDynamicRoute => {
    if (this.getCurrentDynamicRoute('/wr/m/l/pd/'))
      return {
        _title: 'مامور(ها)', _dynamicRoute: '/wr/m/l/pd/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/l/all/false/'))
      return {
        _title: 'لیست', _dynamicRoute: '/wr/m/l/all/false/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/l/all/true/'))
      return {
        _title: 'لیست', _dynamicRoute: '/wr/m/l/all/true/'
      }
    if (this.getCurrentDynamicRoute('/wr/mu/edit/'))
      return {
        _title: 'ویرایش', _dynamicRoute: '/wr/mu/edit/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/s/fwu/'))
      return {
        _title: 'پیگیری', _dynamicRoute: '/wr/m/s/fwu/'
      }
    if (this.getCurrentDynamicRoute('/wr/mu/all/loggins/'))
      return {
        _title: 'ورود', _dynamicRoute: '/wr/mu/all/loggins/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/r/nob/'))
      return {
        _title: 'نوبتی', _dynamicRoute: '/wr/m/r/nob/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/track/woui/false/'))
      return {
        _title: 'صوت/تصویر', _dynamicRoute: '/wr/m/track/woui/false/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/track/woui/true/'))
      return {
        _title: 'غیر مجاز', _dynamicRoute: '/wr/m/track/woui/true/'
      }
    if (this.getCurrentDynamicRoute('/wr/m/track/offloaded/offloadMfy/'))
      return {
        _title: 'اصلاح', _dynamicRoute: '/wr/m/track/offloaded/offloadMfy/'
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
    if (this.utilsService.isNull(dRoute))
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

    if (this.utilsService.isNull(this.DoesTabsHaveThisRouteNow())) {
      this.tabs.push(a);
      this.reFetchPageTitle();
    }
    this.reFetchPageTitle();
  }
  getRouterUrl = (): string => { return this.router.url; }
  staticRouteValidation = () => {
    if (!this.DoesTabsHaveThisRouteNow()) {
      this.getRouterUrl() === '/wr/profile' ? this.tabs.push(this.addProfileTab()) : ''
    }
  }
  verification = () => {
    const currentRouteFound = this.DoesCurrentRouteFound();
    this.staticRouteValidation();
    if (currentRouteFound) {
      if (this.DoesTabsHaveThisRouteNow()) {
        this.reFetchPageTitle();
        return;
      }
      this.tabs.push(currentRouteFound);
      this.reFetchPageTitle();
    }
    else
      this.dynamicRouteValidation();
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
    const a = this.tabs.map(item => {
      return item;
    })

    if (this.utilsService.isNull(a[0])) {
      this.router.navigateByUrl('/wr');
      this.reFetchPageTitle();
    }
    else {
      this.backToPreviousPage();
      this.reFetchPageTitle();
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
    return {
      route: '/wr', title: 'نقشه/داشبورد', cssClass: '', logicalOrder: 0, isClosable: false, isRefreshable: false
    };
  }
  addProfileTab = () => {
    return {
      route: '/wr/profile', title: 'تنظیمات کاربری', cssClass: '', logicalOrder: 0, isClosable: true, isRefreshable: true
    }
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
