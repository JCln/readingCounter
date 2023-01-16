import 'jspdf-autotable';

import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-loaded',
  templateUrl: './loaded.component.html',
  styleUrls: ['./loaded.component.scss']
})
export class LoadedComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackLoaded = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForTrackLoaded) {
      this.closeTabService.saveDataForTrackLoaded = await this.trackingManagerService.getDataSource(ENInterfaces.trackingLOADED);
    }
    this.zoneDictionary = await this.trackingManagerService.getZoneDictionary();

  }
  backToImportedConfirmDialog = async (rowDataAndIndex: object) => {
    const a = await this.trackingManagerService.firstConfirmDialog(EN_messages.reson_delete_backtoImported, true, false);
    if (a) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToImportedFromLoad, rowDataAndIndex['dataSource'], a);
      this.refreshTable();
    }
  }

}
