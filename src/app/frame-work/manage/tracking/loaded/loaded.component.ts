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

  }
  backToImportedConfirmDialog = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reson_delete_backtoImported,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + ' مامور: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-step-backward'
    }
    const a = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (a) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToImportedFromLoad, rowDataAndIndex.id, a);
      this.refreshTable();
    }
  }

}
