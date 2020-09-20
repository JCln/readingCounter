import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  sidebarStatus: boolean;

  sideBarPageSize = () => {
    const a = document.querySelector('app-side-bar') as HTMLElement;
    const b = document.querySelector('app-tab-wrapper') as HTMLElement;
    a.classList.toggle('page_conf');
    b.classList.toggle('tabWrapper_conf');
  }

  changeSidebarStatus($event: boolean) {
    this.sidebarStatus = $event;
    this.sideBarPageSize();
  }
}
