import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { ISidebarItems } from 'src/app/Interfaces/ioverall-config';

import { InterfaceService } from '../interface.service';
import { sidebarItemsTest } from './sidebarItems';

@Injectable({
  providedIn: 'root'
})
export class SidebarItemsService {
  private tabItemsSource = new BehaviorSubject<any>({});

  constructor(private interfaceService: InterfaceService) { }

  getLatestItems = (): Observable<ISidebarItems> => {
    return this.tabItemsSource.value;
  }
  getSideBarItems = (): Promise<ISidebarItems> => {
    try {
      return new Promise((resolve) => {
        this.interfaceService.getSideBar().subscribe(res => {
          this.tabItemsSource.next(res);
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
