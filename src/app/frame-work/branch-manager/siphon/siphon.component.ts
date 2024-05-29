import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-siphon',
  templateUrl: './siphon.component.html',
  styleUrls: ['./siphon.component.scss']
})
export class SiphonComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.siphon = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.siphonAll);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.siphon)) {
      this.callAPI();
    }
  }


}