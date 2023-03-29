import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarStatus: boolean;
  pageTitle: string = 'نقشه/ داشبورد';
  refreshPage: boolean;

  sideBarPageSize = () => {
    const a = document.querySelector('._sidebar_container') as HTMLElement;
    a.classList.toggle('_sidebar_width_6');
  }

  changeSidebarStatus($event: boolean) {
    this.sidebarStatus = $event;
    this.sideBarPageSize();
  }
  changePageTitle($vent: string) {
    this.pageTitle = $vent;
  }
  refreshCurrentPage($event: boolean) {
    this.refreshPage = $event;
  }

}
