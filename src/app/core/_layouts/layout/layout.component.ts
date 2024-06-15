import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  pageTitle: string = 'نقشه/ داشبورد';
  refreshPage: boolean;

  changePageTitle($vent: string) {
    this.pageTitle = $vent;
  }
  refreshCurrentPage($event: boolean) {
    this.refreshPage = $event;
  }

}
