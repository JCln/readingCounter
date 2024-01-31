import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { OutputManagerService } from 'services/output-manager.service';
import { TrackingManagerService } from 'services/tracking-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

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
  callAPI = async () => {
    this.closeTabService.saveDataForLastStates = await this.trackingManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.trackingLASTSTATES);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForLastStates)) {
      this.callAPI();
    }
  }
  showInMap = (trackNumberAndDate: object) => {
    this.trackingManagerService.routeToLMPDXY(trackNumberAndDate['trackNumber'], trackNumberAndDate['insertDateJalali'], null, true);
  }

}
