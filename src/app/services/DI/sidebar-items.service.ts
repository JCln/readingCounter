import { AjaxReqWrapperService } from 'services/ajax-req-wrapper.service';
import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ISidebarItems } from 'interfaces/ioverall-config';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { sidebarItemsTest } from './sidebarItems';

@Injectable({
  providedIn: 'root'
})
export class SidebarItemsService {
  private tabItemsSource = new BehaviorSubject<any>({ sidebarApps: [] });

  constructor(
    private ajaxReqWrapperService: AjaxReqWrapperService
  ) { }

  getLatestItems = (): Observable<any> => {
    return this.tabItemsSource.asObservable();
  }
  getTestSideTest = () => {
    return sidebarItemsTest.sidebarApps;
  }
  getSideBarItems = async (): Promise<ISidebarItems> => {
    const res = await this.ajaxReqWrapperService.getDataSource(ENInterfaces.getSideBar);
    console.log(res);
    console.log(res.sidebarApps);

    this.tabItemsSource.next(res.sidebarApps);
    this.tabItemsSource.next(this.getTestSideTest());
    return res;
  }

}
