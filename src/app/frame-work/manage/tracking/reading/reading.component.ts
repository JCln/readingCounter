import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { BrowserStorageService } from 'services/browser-storage.service';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent extends FactoryONE {
  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public browserStorageService: BrowserStorageService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackReading = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForTrackReading) {
      this.closeTabService.saveDataForTrackReading = await this.trackingManagerService.getDataSource(ENInterfaces.trackingREADING);
    }
  }
  backToImportedConfirmDialog = async (rowDataAndIndex: object) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.reson_delete_backtoImported, true, false, 'pi pi-fast-backward');
    if (desc) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToIMPORTED, rowDataAndIndex['dataSource'], desc);
    }
  }
  forceOffload = async (rowDataAndIndex: object) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.reason_forceOffload, true, true, 'pi pi-ban');
    if (desc) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingFinishReadiED, rowDataAndIndex['dataSource'], desc);
      this.refreshTable();
    }
  }

}