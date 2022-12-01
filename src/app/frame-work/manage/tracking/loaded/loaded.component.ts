import 'jspdf-autotable';

import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ITracking } from 'interfaces/itrackings';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-loaded',
  templateUrl: './loaded.component.html',
  styleUrls: ['./loaded.component.scss']
})
export class LoadedComponent extends FactoryONE {

  dataSource: ITracking[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService    
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackLoaded = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackLoaded) {
      this.dataSource = this.closeTabService.saveDataForTrackLoaded;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingLOADED);
      this.closeTabService.saveDataForTrackLoaded = this.dataSource;
    }
    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();

  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  backToImportedConfirmDialog = async (rowDataAndIndex: object) => {
    const a = await this.trackingManagerService.firstConfirmDialog(EN_messages.reson_delete_backtoImported, true, false);
    if (a) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToImportedFromLoad, rowDataAndIndex['dataSource'], a);
      this.refreshTable();
    }
  }

}
