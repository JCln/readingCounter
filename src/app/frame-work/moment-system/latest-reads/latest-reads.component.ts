import { Component } from '@angular/core';
import { ENRandomNumbers } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { InteractionService } from 'services/interaction.service';
import { ListManagerService } from 'services/list-manager.service';
import { MapService } from 'services/map.service';
import { AllListsFactory } from 'src/app/classes/factory';

declare let L;
@Component({
  selector: 'app-latest-reads',
  templateUrl: './latest-reads.component.html',
  styleUrls: ['./latest-reads.component.scss']
})
export class LatestReadsComponent extends AllListsFactory {
  private layerGroup2 = new L.FeatureGroup();
  private map2: L.Map;

  constructor(
    private interactionService: InteractionService,
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    public closeTabService: CloseTabService,
    private envService: EnvService,
    private mapService: MapService
  ) {
    super(dialogService, listManagerService);
  }

  /* TODO save latest data according to last view and show updating rows  */
  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup2
    };
  }
  private markMultipleLocations = (xyData: any) => {
    xyData.map((items) => {
      if (items.y > ENRandomNumbers.zero) {
        L.marker([items.y, items.x]).addTo(this.layerGroup2)
          .bindPopup(`${items.zoneTitle} <br> ${items.counterReaderName} <br>` + `${items.eshterak} <br> ${items.radif}`
          );
      }
    })
  }
  updateTableData = () => {
    this.markMultipleLocations(this.closeTabService.saveDataForMomentLastRead);
    this.closeTabService.saveDataForMomentLastRead = this.closeTabService.saveDataForMomentLastRead.slice();
  }

  initMap = () => {
    this.map2 = L.map('map2', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.eight,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.getFirstItemUrl(), this.layerGroup2]
    });

    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map2);
  }

  classWrapper = async (canRefresh?: boolean) => {
    this.initMap();
    if (this.closeTabService.saveDataForMomentLastRead) {
      this.markMultipleLocations(this.closeTabService.saveDataForMomentLastRead);
    }
    this.interactionService.getMomentLatestReads.subscribe(res => {
      this.closeTabService.saveDataForMomentLastRead.unshift(res);
      console.log(this.closeTabService.saveDataForMomentLastRead);

      if (this.closeTabService.saveDataForMomentLastRead.length > ENRandomNumbers.twenty)
        this.closeTabService.saveDataForMomentLastRead.pop();
      this.updateTableData();
    })
  }

}