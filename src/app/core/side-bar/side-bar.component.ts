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
    // let myTag = this.el.nativeElement.getElementByClassName("toggle_items");


    // this.sideBarItemsService.getSideBarItems().subscribe((sidebars: any) => {
    //   if (sidebars) {
    //     this.currentRoute = sidebars.items;
    //   }
    // })
    this.currentRoute = this.testSidebarService.getTestSideTest();
    this.currentRoute = this.currentRoute.items;

  }

  ngOnInit(): void {
  }
  toggleSubItems = (item: any): void => {
    this.currentRoute.forEach(aItem => {
      if (item.title !== aItem.title)
        aItem.isOpen = false
      else
        aItem.isOpen = !aItem.isOpen
    })
  }
  sid_isSmallStatus = () => {
    this.sid_isSmall = !this.sid_isSmall;
  }

}
