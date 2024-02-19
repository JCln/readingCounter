import { Component, EventEmitter, Output } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {
  showLocationButtons: boolean = false;

  @Output() sendlocations = new EventEmitter<any>();

  constructor(
    private dashboardService: DashboardService
  ) { }

  showLocations = async (showCluster: boolean) => {
    const res = await this.dashboardService.getDashboardDataSource(ENInterfaces.getCounterReaderLocations);
    this.showLocationButtons = false;
    this.dashboardService.utilsService.snackBarMessageInfo(EN_messages.counterReaderNumber + res.length);
    this.sendlocations.emit({ data: res, showCluster: showCluster });
  }

}
