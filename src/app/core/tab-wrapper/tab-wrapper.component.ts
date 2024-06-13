import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ITabs } from 'interfaces/ioverall-config';
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
  currentRoute;
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
    console.log(1);
    console.log(this.currentRoute);
    return this.currentRoute.find((item: any) => {
      console.log(item);

      return item.route === this.getRouterUrl()
    })
  }
  DoesTabsHaveThisRouteNow = (): ITabs => {
    const found = this.closeTabService.tabs.find((item: any) => {
      console.log(item);
      console.log(this.getRouterUrl());

      return item.route === this.getRouterUrl()
    })
    if (found)
      return found;
    return null;
  }
  filterTabs = (routerUrl: string): ITabs[] => {
    return this.closeTabService.tabs.filter((item: any) => {
      return item.route !== routerUrl
    })
  }
  getRouterUrl = (): string => { return this.router.url; }
  verification = () => {
    console.log(1);

    const currentRouteFound = this.DoesCurrentRouteFound();
    console.log(currentRouteFound);

    if (currentRouteFound) {
      if (this.DoesTabsHaveThisRouteNow()) {
        this.reFetchPageTitle();
      }
      else {
        this.closeTabService.tabs.push(currentRouteFound);
        this.reFetchPageTitle();
      }
    }
  }
  getTabWrapper = async () => {
    this.sideBarItemsService.getLatestItems().subscribe(res => {
      res.forEach((apps: any) => {
        // console.log(apps);
        apps.items.forEach((subItem: any) => {
          // console.log(subItem);
          subItem.subItems.forEach((subItems: any) => {
            console.log(subItems);
            this.currentRoute.push(subItems);
            this.verification();
          })
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
