import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ITracking } from 'interfaces/itrackings';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

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
  callAPI = async () => {
    this.closeTabService.saveDataForTrackLoaded = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingLOADED);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTrackLoaded)) {
      this.callAPI();
    }

  }
  backToImportedConfirmDialog = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reson_delete_backtoImported,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + '،   قرائت کننده: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-step-backward'
    }
    const a = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (a) {
      const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingToImportedFromLoad, { trackingId: rowDataAndIndex.id, description: a });
      this.trackingManagerService.successSnackMessage(res.message);
      this.refreshTable();
    }
  }

}
