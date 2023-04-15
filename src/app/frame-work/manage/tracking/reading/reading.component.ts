import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/itrackings';
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
  backToImportedConfirmDialog = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reson_delete_backtoImported,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + ' مامور: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-fast-backward'
    }
    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToIMPORTED, rowDataAndIndex.id, desc);
    }
  }
  forceOffload = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reason_forceOffload,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + ' مامور: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: true,
      icon: 'pi pi-ban'
    }
    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingFinishReadiED, rowDataAndIndex.id, desc);
      this.refreshTable();
    }
  }

}