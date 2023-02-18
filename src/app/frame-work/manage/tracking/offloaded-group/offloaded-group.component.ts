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
  nullSavedSource = () => this.closeTabService.saveDataForTrackOffloadedGroup = null;
  refetchTable = (index: number) => this.closeTabService.saveDataForTrackOffloadedGroup = this.closeTabService.saveDataForTrackOffloadedGroup.slice(0, index).concat(this.closeTabService.saveDataForTrackOffloadedGroup.slice(index + 1));
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForTrackOffloadedGroup) {
      this.closeTabService.saveDataForTrackOffloadedGroup = await this.trackingManagerService.getDataSource(ENInterfaces.trackingOFFLOADED);
    }
  }
  downloadOutputSingle = async (row: ITracking) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.downloadPermit, false, false);
    if (desc) {
      if (this.envService.hasNextBazdid) {
        this.hasNextBazdid(row);
        return;
      }
      const a = await this.trackingManagerService.downloadOutputWithoutDESC(ENInterfaces.OutputSINGLE, row);
      this.outputManagerService.downloadFile(a);
    }
  }
  routeToOffloadGeneralGroupModify = (dataSource: ITracking) => {
    this.trackingManagerService.routeToOffloadGeneralModifyGrouped(dataSource);
  }
  backToReading = async (rowDataAndIndex: object) => {
    const desc = await this.trackingManagerService.firstConfirmDialog(EN_messages.toReading, true, false);
    if (desc) {
      this.trackingManagerService.migrateOrRemoveTask(ENInterfaces.trackingToREADING, rowDataAndIndex['dataSource'], desc);
      this.refreshTable();
    }
  }
  hasNextBazdid = async (row: ITracking) => {
    let hasbazdid = await this.trackingManagerService.hasNextBazdidConfirmDialog(EN_messages.insert_nextBazdidDate);
    hasbazdid = Converter.persianToEngNumbers(hasbazdid);
    if (hasbazdid) {
      const a = await this.trackingManagerService.downloadOutputSingleWithENV(ENInterfaces.OutputSINGLE, row, hasbazdid);
      this.outputManagerService.downloadFile(a);
    }
  }
  routeToAssessPre = (dataSource: ITracking) => {
    if (MathS.isNull(dataSource.listNumber)) {
      this.trackingManagerService.showWarnMessage(EN_messages.no_listNumberExist);
    }
    else {
      this.closeTabService.saveDataForAssessPreReq.zoneId = dataSource.zoneId;
      this.closeTabService.saveDataForAssessPreReq.listNumber = dataSource.listNumber;
      this.trackingManagerService.routeToAssessPre();
    }
  }

}