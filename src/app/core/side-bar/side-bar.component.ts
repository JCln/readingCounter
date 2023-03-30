import { Component, Input } from '@angular/core';
import { SidebarItemsService } from 'services/DI/sidebar-items.service';
import { transitionSideBar } from 'src/app/directives/animation.directive';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [transitionSideBar]
})
export class SideBarComponent {
  @Input() sid_isSmall: boolean;
  currentRoute: any;

  constructor(
    private sideBarItemsService: SidebarItemsService,
    private testSidebarService: SidebarItemsService
  ) {
    this.getSidebar();
  }
  getSidebar = async () => {
    const sidebars = await this.sideBarItemsService.getSideBarItems();
    this.currentRoute = sidebars.items;
    // this.currentRoute = this.testSidebarService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;

  }
  toggleSubItems = (item: any): void => {
    let a = document.querySelectorAll('.pi-angle-up');
    this.currentRoute.forEach((aItem, i) => {
      if (item.title !== aItem.title) {
        aItem.isOpen = false;
        a[i].classList.remove('_toggle_angule');
      }
      else {
        aItem.isOpen = !aItem.isOpen;
        a[i].classList.toggle('_toggle_angule');
      }
    })
  }
}
