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

  dataSource: ITracking[] = [];

  constructor(
    private closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public browserStorageService: BrowserStorageService
  ) {
    super();
  }

  private rowToImported = async (row: string, desc: string, rowIndex: number) => {
    await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToIMPORTED, row, desc);
  }
  nullSavedSource = () => this.closeTabService.saveDataForTrackReading = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForTrackReading) {
      this.dataSource = this.closeTabService.saveDataForTrackReading;
    }
    else {
      this.dataSource = await this.trackingManagerService.getDataSource(ENInterfaces.trackingREADING);
      this.closeTabService.saveDataForTrackReading = this.dataSource;
    }
  }
  // refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  backToImportedConfirmDialog = async (rowDataAndIndex: object) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.reson_delete_backtoImported, true, false);
    if (desc) {
      this.rowToImported(rowDataAndIndex['dataSource'], desc, rowDataAndIndex['ri']);
    }
  }
  forceOffload = async (rowDataAndIndex: object) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.reason_forceOffload, true, true);
    if (desc) {
      await this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingFinishReadiED, rowDataAndIndex['dataSource'], desc);
      this.refreshTable();
    }
  }

}