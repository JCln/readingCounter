import { Component, Input, OnInit } from '@angular/core';
import { SidebarItemsService } from 'src/app/services/DI/sidebar-items.service';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  @Input() sid_isSmall: boolean;
  smallScreen: boolean = false;
  currentRoute: any;

  constructor(
    private sideBarItemsService: SidebarItemsService,
    private testSidebarService: SidebarItemsService
  ) {
    // this.sideBarItemsService.getSideBarItems().subscribe((sidebars: any) => {
    //   if (sidebars) {
    //     this.currentRoute = sidebars.items;
    //   }
    // })
    this.currentRoute = this.testSidebarService.getTestSideTest();
    this.currentRoute = this.currentRoute.items;

  }

  ngOnInit(): void {
    if (screen.width <= 520) {
      this.smallScreen = true;
    }
  }
  toggleSubItems = (item: any): void => {
    let a = document.querySelectorAll('.fa-arrow-circle-down');
    this.currentRoute.forEach((aItem, i) => {
      if (item.title !== aItem.title) {
        aItem.isOpen = false;
        a[i].classList.remove('tsConfig');
      }
      else {
        aItem.isOpen = !aItem.isOpen;
        a[i].classList.add('tsConfig');
      }
    })
  }
  sid_isSmallStatus = () => {
    this.sid_isSmall = !this.sid_isSmall;
  }

}
