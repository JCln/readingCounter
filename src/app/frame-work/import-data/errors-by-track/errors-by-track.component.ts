import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-errors-by-track',
  templateUrl: './errors-by-track.component.html',
  styleUrls: ['./errors-by-track.component.scss'],
  animations: [transitionAnimation]
})
export class ErrorsByTrackComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForImportErrorsByTrackNumber = await this.importDynamicService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.postImportErrorsByTrackNumber, this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber.toString());
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForImportErrorsByTrackNumber) && this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber) {
      this.callAPI();
    }
  }
  connectToServer = async () => {
    if (this.importDynamicService.verificationService.verificationTrackNumber(this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber)) {
      this.closeTabService.saveDataForImportErrorsByTrackNumber = await this.importDynamicService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.postImportErrorsByTrackNumber, this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber.toString());
    }
  }

}