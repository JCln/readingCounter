import { Component, Input, OnInit } from '@angular/core';

import { SidebarItemsService } from './../../services/DI/sidebar-items.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() sid_isSmall: boolean;
  currentRoute: any;

  constructor(private sideBarItemsService: SidebarItemsService, private testSidebarService: SidebarItemsService) {

    // this.sideBarItemsService.getSideBarItems().subscribe((sidebars: any) => {
    //   if (sidebars) {
    //     this.currentRoute = sidebars.items;
    //   }
    // })
    this.testSidebarService.getSideBarItems();
  }

  ngOnInit(): void {
  }

  // toggleSubItems = (item: ISidebarItems): void => {
  //   this.currentRoute.items.subItems = this.currentRoute;
  //   this.currentRoute.filter(aItem => {
  //     if (item.sid_isOpenItems !== aItem.sid_isOpenItems)
  //       aItem.sid_isOpenItems = false
  //   })
  //   if (item.sid_isOpenItems)
  //     item.sid_isOpenItems = false;
  //   else
  //     item.sid_isOpenItems = true;
  // }
  sid_isSmallStatus = () => {
    this.sid_isSmall = !this.sid_isSmall;
  }

}
