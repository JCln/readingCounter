import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/itrackings';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss']
})
export class FinishedComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService,
    private envService: EnvService
  ) {
    super();
  }

  refetchTable = (index: number) => this.closeTabService.saveDataForTrackFinished = this.closeTabService.saveDataForTrackFinished.slice(0, index).concat(this.closeTabService.saveDataForTrackFinished.slice(index + 1));
  private rowToOffloaded = async (row: string, desc: string) => {
    const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingToOFFLOADED, { trackingId: row, description: desc });
    this.trackingManagerService.successSnackMessage(res.message);
    this.refreshTable();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForTrackFinished = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingFINISHED);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTrackFinished)) {
      this.callAPI();
    }
  }
  backToImportedConfirmDialog = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.reason_toOffloaded,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + '،   قرائت کننده: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-step-backward'
    }

    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      this.rowToOffloaded(rowDataAndIndex.id, desc);
    }
  }
  reDownloadOutputSingle = async (row: ITracking) => {
    if (this.envService.hasNextBazdid) {
      this.hasNextBazdid(row);
      return;
    }
    const a = await this.trackingManagerService.downloadOutputWithoutDESC(ENInterfaces.OutputDELAYED, row);
    this.outputManagerService.downloadFileWithContentDisposition(a);
  }
  hasNextBazdid = async (row: ITracking) => {
    let hasbazdid = await this.trackingManagerService.hasNextBazdidConfirmDialog(EN_messages.insert_nextBazdidDate);
    if (hasbazdid) {
      this.outputManagerService.downloadFileWithContentDisposition(await this.trackingManagerService.downloadOutputSingleWithENV(ENInterfaces.OutputDELAYED, row, hasbazdid));
    }
  }

}