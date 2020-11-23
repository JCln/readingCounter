import { Component, ViewChild } from '@angular/core';

import { TabWrapperComponent } from './../../tab-wrapper/tab-wrapper.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarStatus: boolean;
  @ViewChild(TabWrapperComponent) childPageTitle;
  pageTitle: string = 'نقشه/ داشبورد';

  sideBarPageSize = () => {
    const a = document.querySelector('app-side-bar') as HTMLElement;
    const b = document.querySelector('app-tab-wrapper') as HTMLElement;
    const framework = document.querySelector('app-frame-work') as HTMLElement;
    framework.classList.toggle('framework_conf');
    a.classList.toggle('page_conf');
    b.classList.toggle('tabWrapper_conf');
  }

  changeSidebarStatus($event: boolean) {
    this.sidebarStatus = $event;
    this.sideBarPageSize();
  }
  changePageTitle($vent: string) {
    this.pageTitle = $vent;
  }
}
