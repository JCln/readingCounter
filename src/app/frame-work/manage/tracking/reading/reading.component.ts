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
      this.closeTabService.saveDataForTrackReading = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingREADING);
    }
  }
  backToImportedConfirmDialog = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reson_delete_backtoImported,
      messageTitleTwo: EN_messages.reasonBacktoImportedCaution1 + rowDataAndIndex.counterReaderName + EN_messages.reasonBacktoImportedCaution2,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + '،   قرائت کننده: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-fast-backward'
    }
    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingToIMPORTED, { trackingId: rowDataAndIndex.id, description: desc });
      this.trackingManagerService.successSnackMessage(res.message);
    }
  }
  forceOffload = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reason_forceOffload,
      messageTitleTwo: EN_messages.reasonForceOffloadCaution1 + rowDataAndIndex.counterReaderName + EN_messages.reasonForceOffloadCaution2,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + '،   قرائت کننده: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: true,
      icon: 'pi pi-ban'
    }
    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingFinishReadiED, { trackingId: rowDataAndIndex.id, description: desc });
      this.trackingManagerService.successSnackMessage(res.message);
      this.refreshTable();
    }
  }

}