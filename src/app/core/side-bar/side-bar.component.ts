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
    this.currentRoute = sidebars.sidebarApps;
    // this.currentRoute = this.testSidebarService.getTestSideTest();
    // this.currentRoute = this.currentRoute.items;

  }
  toggleSubItems = (item: any): void => {
    console.log(item);
    if (item.title !== item.title) {
      item.isOpen = false;
      // a[i].classList.remove('_toggle_angule');
    }
    else {
      item.isOpen = !item.isOpen;
      // a[i].classList.toggle('_toggle_angule');
    }
  }
  toggleApps = (app: any): void => {
    console.log(app);

    let a = document.querySelectorAll('.app-angle');
    this.currentRoute.forEach((aApp, i) => {
      if (app.title !== aApp.title) {
        aApp.isOpen = false;
        a[i].classList.remove('_toggle_angule');
      }
      else {
        aApp.isOpen = !aApp.isOpen;
        a[i].classList.toggle('_toggle_angule');
      }
    })
  }

}
