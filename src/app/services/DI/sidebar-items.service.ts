import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { ISidebarItems } from 'src/app/Interfaces/ioverall-config';

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
  getSideBarItems = (): Promise<ISidebarItems> => {
    try {
      return new Promise((resolve) => {
        this.interfaceServiceManager.GET(ENInterfaces.getSideBar).subscribe(res => {
          this.tabItemsSource.next(res.items);
          resolve(res)
        })
      });
    } catch (error) {
      console.error(error);
    }
  }
  getTestSideTest = () => {
    return sidebarItemsTest;
  }
  /* TAB WRAPPER */
}
