import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
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
  getSideBarItems = (): Observable<ISidebarItems[]> => {
    const a = this.interfaceService.getSideBar();
    this.tabItemsSource.next(a);
    return a;
  }
  getTestSideTest = () => {
    return sidebarItemsTest;
  }
}
