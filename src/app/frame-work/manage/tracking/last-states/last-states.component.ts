import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-last-states',
  templateUrl: './last-states.component.html',
  styleUrls: ['./last-states.component.scss']
})
export class LastStatesComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public trackingManagerService: TrackingManagerService,
    public outputManagerService: OutputManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForLastStates = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForLastStates) {
      this.closeTabService.saveDataForLastStates = await this.trackingManagerService.getDataSource(ENInterfaces.trackingLASTSTATES);
    }
  }
  showInMap = (trackNumberAndDate: object) => {
    this.trackingManagerService.routeToLMPDXY(trackNumberAndDate['trackNumber'], trackNumberAndDate['insertDateJalali'], null, true);
  }

}
