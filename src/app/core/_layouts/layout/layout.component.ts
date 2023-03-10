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
    const a = document.querySelector('app-side-bar') as HTMLElement;
    const framework = document.querySelector('app-frame-work') as HTMLElement;
    if (screen.width >= 1200) {
      framework.classList.toggle('framework_conf_s');
    }
    else if (screen.width >= 1000) {
      a.classList.toggle('page_conf_6');
    }
    else if (screen.width >= 700) {
      a.classList.toggle('page_conf_8');
    }
    else if (screen.width >= 550) {
      a.classList.toggle('page_conf_13');
    }
    else {
      a.classList.toggle('page_conf_13');
    }

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
