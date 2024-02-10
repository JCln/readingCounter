import { Component } from '@angular/core';
import { ENCompanyName, ENLocalStorageNames, ENRandomNumbers, EN_messages } from 'interfaces/enums.enum';
import { ILatestReads } from 'interfaces/imoment';
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
  atMostNumbers = [];
  _selectedMostNumbers: number = 0;

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
        L.circleMarker([items.y, items.x], { weight: 7, radius: 3 }).addTo(this.layerGroup2)
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
    this.map2.attributionControl.setPrefix(ENCompanyName.title);
    L.control.layers(this.mapService.getBaseMap(), this.getOverlays()).addTo(this.map2);
  }
  private dropdownAvailableNumbers = () => {
    this.atMostNumbers = [
      { title: ENRandomNumbers.five, val: ENRandomNumbers.five },
      { title: ENRandomNumbers.ten, val: ENRandomNumbers.ten },
      { title: ENRandomNumbers.thirdy, val: ENRandomNumbers.thirdy },
      { title: ENRandomNumbers.fifty, val: ENRandomNumbers.fifty },
      { title: ENRandomNumbers.oneHundred, val: ENRandomNumbers.oneHundred },
    ];
  }
  addResponseToFirst = (res: ILatestReads) => {
    this.closeTabService.saveDataForMomentLastRead.unshift(res);
  }
  private removeAllLayers = () => {
    this.layerGroup2.clearLayers();
  }
  makeEmptyLastReadArray = () => {
    this.closeTabService.saveDataForMomentLastRead = [];
  }
  pushToArray = (res: ILatestReads) => {
    this.closeTabService.saveDataForMomentLastRead.push(res);
  }
  onNextReadViewable = () => {
    this.mapService.saveToLocalStorage(ENLocalStorageNames.numberOfFlashRead, this._selectedMostNumbers);
    this.listManagerService.utilsService.snackBarMessageSuccess(EN_messages.changesOnNextRead);
  }
  numberOfSelectedMostNumber = () => {
    if (this.mapService.browserStorageService.isExists(ENLocalStorageNames.numberOfFlashRead)) {
      this._selectedMostNumbers = this.mapService.browserStorageService.getLocal(ENLocalStorageNames.numberOfFlashRead);
    }
    else {
      this.mapService.saveToLocalStorage(ENLocalStorageNames.numberOfFlashRead, ENRandomNumbers.ten);
    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.initMap();
    this.numberOfSelectedMostNumber();
    this.dropdownAvailableNumbers();
    if (this.closeTabService.saveDataForMomentLastRead) {
      this.markMultipleLocations(this.closeTabService.saveDataForMomentLastRead);
    }
    this.subscription.push(this.interactionService.$getMomentLatestReads.subscribe(res => {
      if (this.closeTabService.saveDataForMomentLastRead.length == 0) {
        this.makeEmptyLastReadArray();
        this.pushToArray(res);
      }
      else {
        this.addResponseToFirst(res);
      }
      // should pop from top more than atMostNumbers is in table
      //  Loop implemented because after change selectedMostNumbers to down, all extra items should remove
      for (let index = 0; index < this.closeTabService.saveDataForMomentLastRead.length; index++) {
        if (this.closeTabService.saveDataForMomentLastRead.length > this._selectedMostNumbers) {
          this.closeTabService.saveDataForMomentLastRead.pop();
          this.removeAllLayers();
        }
      }
      this.updateTableData();
    }))
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil    
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

}