import { Component, ElementRef, Input, OnInit } from '@angular/core';

import { SidebarItemsService } from './../../services/DI/sidebar-items.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() sid_isSmall: boolean;
  currentRoute: any;
  // currentRoute: ITestSidebar[] = [];
  // test shows and !show
  testBoolean: boolean = false;
  // 


  constructor(private sideBarItemsService: SidebarItemsService, private testSidebarService: SidebarItemsService, private el: ElementRef) {
    // let myTag = this.el.nativeElement.getElementByClassName("toggle_items");


    this.sideBarItemsService.getSideBarItems().subscribe((sidebars: any) => {
      if (sidebars) {
        this.currentRoute = sidebars.items;
      }
    })
    // this.currentRoute = this.testSidebarService.getTestSideTest();
  }

  toggleTest = (i: number) => {
    // if (item.cssClass.contains(''))
    // const a = document.querySelector('.sub_item_1'[i]) as HTMLElement;
    // console.log(a);

    // a[i].classList.toggle('toggle_items');
  }
  ngOnInit(): void {
  }

  sid_isSmallStatus = () => {
    this.sid_isSmall = !this.sid_isSmall;
  }

}
