import { Injectable } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ISidebarItems } from 'interfaces/ioverall-config';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

import { InterfaceManagerService } from '../interface-manager.service';
import { sidebarItemsTest } from './sidebarItems';

@Injectable({
  providedIn: 'root'
})
export class SidebarItemsService {
  private tabItemsSource = new BehaviorSubject<any>([]);

  constructor(private interfaceServiceManager: InterfaceManagerService) { }

  getLatestItems = (): Observable<any> => {
    return this.tabItemsSource.asObservable();
  }
  getTestSideTest = () => {
    return sidebarItemsTest.addStaticSubRoutes;
  }
  getSideBarItems = (): Promise<ISidebarItems> => {
    return new Promise((resolve) => {
      this.interfaceServiceManager.GET(ENInterfaces.getSideBar).toPromise().then((res: any) => {
        this.tabItemsSource.next(res.items);
        this.tabItemsSource.next(this.getTestSideTest());
        resolve(res);
      })
    });
  }

}
