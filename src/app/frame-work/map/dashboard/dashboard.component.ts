import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { DashboardService } from 'services/dashboard.service';
import { InteractionService } from 'services/interaction.service';
import { EN_Routes } from 'interfaces/routes.enum';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {  
  _analyzer_interface: any[];
  zoneDictionary: IDictionaryManager[] = [];

  receiveAnalyzeData($event) {
    setTimeout(() => {
      this._analyzer_interface = $event;
    }, 0);
  }
  constructor(
    public dashboardService: DashboardService,
    private interactionService: InteractionService
  ) {
    this.getZoneDictionary();
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = JSON.parse(JSON.stringify(await this.dashboardService.getZoneDictionary()));
    if (this.zoneDictionary[0].id !== 0)
      this.zoneDictionary.unshift({ id: 0, title: 'مناطق مجاز', isSelected: true })
  }
  refreshPageToRebuild = () => {
    this.interactionService.setRefresh(EN_Routes.wrdb);
  }

}