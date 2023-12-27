import { Component } from '@angular/core';
import { CloseTabService } from 'services/close-tab.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-offloaded-master',
  templateUrl: './offloaded-master.component.html',
  styleUrls: ['./offloaded-master.component.scss']
})
export class OffloadedMasterComponent extends FactoryONE {
  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    await this.closeTabService.getTrackingOffloadedMaster(canRefresh ? canRefresh : false);
  }

}