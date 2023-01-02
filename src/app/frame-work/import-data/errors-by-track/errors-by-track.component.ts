import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-errors-by-track',
  templateUrl: './errors-by-track.component.html',
  styleUrls: ['./errors-by-track.component.scss']
})
export class ErrorsByTrackComponent extends FactoryONE {

  constructor(
    public closeTabService: CloseTabService,
    private importDynamicService: ImportDynamicService,
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForImportErrorsByTrackNumber = null;
      this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber = null;
    }
    if (!this.closeTabService.saveDataForImportErrorsByTrackNumber && this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber) {
      this.closeTabService.saveDataForImportErrorsByTrackNumber = await this.importDynamicService.getById(ENInterfaces.postImportErrorsByTrackNumber, this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber);
    }
  }
  connectToServer = async () => {
    if (this.importDynamicService.verificationTrackNumber(this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber)) {
      this.closeTabService.saveDataForImportErrorsByTrackNumber = await this.importDynamicService.getById(ENInterfaces.postImportErrorsByTrackNumber, this.closeTabService.saveDataForImportErrorsByTrackNumberReq.trackNumber);
    }
  }

}