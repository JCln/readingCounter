import { Component } from '@angular/core';
import { Imap } from 'interfaces/imap';
import { ENRandomNumbers } from 'interfaces/ioverall-config';
import { DialogService } from 'primeng/dynamicdialog';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { InteractionService } from 'services/interaction.service';
import { ListManagerService } from 'services/list-manager.service';
import { MapService } from 'services/map.service';
import { AllListsFactory } from 'src/app/classes/factory';
import { ILatestReads } from 'src/app/Interfaces/imoment';

declare let L;
@Component({
  selector: 'app-latest-reads',
  templateUrl: './latest-reads.component.html',
  styleUrls: ['./latest-reads.component.scss']
})
export class LatestReadsComponent extends AllListsFactory {
  dataSource2: ILatestReads[] = [];

  constructor(
    private interactionService: InteractionService,
    public listManagerService: ListManagerService,
    public dialogService: DialogService,
    private closeTabService: CloseTabService,
    private envService: EnvService,
    private mapService: MapService
  ) {
    super(dialogService, listManagerService);
  }

  /* TODO save latest data according to last view and show updating rows  */
  classWrapper = async (canRefresh?: boolean) => {
    this.getMapItems();
    this.initMap();

    if (this.closeTabService.saveDataForMomentLastRead) {
      this.dataSource2 = this.closeTabService.saveDataForMomentLastRead;
      this.markMultipleLocations(this.dataSource2);
    }
    this.interactionService.getMomentLatestReads.subscribe(res => {
      this.dataSource2.unshift(res);
      if (this.dataSource2.length > ENRandomNumbers.twenty)
        this.dataSource2.pop();
      this.updateTableData();
    })
  }
  updateTableData = () => {
    this.closeTabService.saveDataForMomentLastRead = this.dataSource2;
    this.markMultipleLocations(this.dataSource2);
  }

  private layerGroup2 = new L.FeatureGroup();
  private map2: L.Map;

  private mapItems2: Imap[];

  private markMultipleLocations = (xyData: any) => {
    xyData.map((items) => {
      if (items.y > ENRandomNumbers.zero) {
        L.marker([items.y, items.x]).addTo(this.layerGroup2)
      }
    })
  }
  private getOverlays = () => {
    return {
      "لایه ها": this.layerGroup2
    };
  }

  initMap = () => {
    this.map2 = L.map('map2', {
      center: this.envService.mapCenter,
      zoom: ENRandomNumbers.eight,
      minZoom: ENRandomNumbers.four,
      maxZoom: ENRandomNumbers.eighteen,
      layers: [this.mapService.initMapColor(), this.layerGroup2]
    });

    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map2);
  }
  private getMapItems = () => {
    this.mapItems2 = this.mapService.getMapItems();
  }

}