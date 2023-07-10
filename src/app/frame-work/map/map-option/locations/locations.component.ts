import { Component, EventEmitter, Output } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { DashboardService } from 'services/dashboard.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent {

  @Output() sendlocations = new EventEmitter<any>();

  constructor(
    private dashboardService: DashboardService
  ) { }

  showLocations = async () => {
    this.sendlocations.emit(await this.dashboardService.getDashboardDataSource(ENInterfaces.getCounterReaderLocations));
  }

}
