import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  _isCollapsedAnalyzePrfm: boolean = false;
  _analyzer_interface: any[];

  receiveAnalyzeData($event) {
    setTimeout(() => {
      this._analyzer_interface = $event;
    }, 0);
  }
}
