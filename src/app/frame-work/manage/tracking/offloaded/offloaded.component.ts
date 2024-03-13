import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { ITracking } from 'interfaces/itrackings';
import { EN_Routes } from 'interfaces/routes.enum';
import { CloseTabService } from 'services/close-tab.service';
import { EnvService } from 'services/env.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-offloaded',
  templateUrl: './offloaded.component.html',
  styleUrls: ['./offloaded.component.scss']
})
export class OffloadedComponent extends FactoryONE {

  constructor(

    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService,
    private envService: EnvService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForTrackOffloaded = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingOFFLOADED);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForTrackOffloaded)) {
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
  routeToOffloadModify = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadModify(dataSource, EN_Routes.wrmlalltrue);
  }
  routeToOffloadGeneralModify = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadGeneralModify(dataSource);
  }
  routeToOffloadLazy = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadLazy(dataSource);
  }
  routeToAssessPre = (dataSource: ITracking) => {
    if (MathS.isNull(dataSource.listNumber)) {
      this.trackingManagerService.showWarnMessage(EN_messages.no_listNumberExist);
    }
    else {
      this.trackingManagerService.routeToAssessPre(dataSource);
    }
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
}