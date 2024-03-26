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
  selector: 'app-offloaded-group',
  templateUrl: './offloaded-group.component.html',
  styleUrls: ['./offloaded-group.component.scss']
})
export class OffloadedGroupComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService,
    private envService: EnvService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForTrackOffloadedGroup = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingOFFLOADED);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTrackOffloadedGroup)) {
      this.callAPI();
    }
  }
  downloadOutputSingle = async (row: ITracking) => {
    const config = {
      messageTitle: EN_messages.downloadPermit,
      text: 'ش پیگیری: ' + row.trackNumber + '،   قرائت کننده: ' + row.counterReaderName,
      minWidth: '19rem',
      isInput: false,
      isDelete: false,
      icon: 'pi pi-download'
    }
    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      if (this.envService.hasNextBazdid) {
        this.hasNextBazdid(row);
        return;
      }
      const a = await this.trackingManagerService.downloadOutputWithoutDESC(ENInterfaces.OutputSINGLE, row);
      this.outputManagerService.downloadFileWithContentDisposition(a);
    }
  }
  routeToOffloadGeneralGroupModify = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadGeneralModifyGrouped(dataSource);
  }
  backToReading = async (rowDataAndIndex: ITracking) => {
    const config = {
      messageTitle: EN_messages.toReading,
      text: 'ش پیگیری: ' + rowDataAndIndex.trackNumber + '،   قرائت کننده: ' + rowDataAndIndex.counterReaderName,
      minWidth: '19rem',
      isInput: true,
      isDelete: false,
      icon: 'pi pi-step-backward'
    }
    const desc = await this.trackingManagerService.utilsService.firstConfirmDialog(config);
    if (desc) {
      const res = await this.trackingManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.trackingToREADING, { trackingId: rowDataAndIndex.id, description: desc });
      this.trackingManagerService.successSnackMessage(res.message);
      this.callAPI();
    }
  }
  hasNextBazdid = async (row: ITracking) => {
    let hasbazdid = await this.trackingManagerService.hasNextBazdidConfirmDialog(EN_messages.insert_nextBazdidDate);
    if (hasbazdid) {
      const a = await this.trackingManagerService.downloadOutputSingleWithENV(ENInterfaces.OutputSINGLE, row, hasbazdid);
      this.outputManagerService.downloadFileWithContentDisposition(a);
    }
  }
  routeToAssessPre = (dataSource: ITracking) => {
    if (MathS.isNull(dataSource.listNumber)) {
      this.trackingManagerService.utilsService.snackBarMessageWarn(EN_messages.no_listNumberExist);
    }
    else {
      this.trackingManagerService.routeToAssessPre(dataSource);
    }
  }

}