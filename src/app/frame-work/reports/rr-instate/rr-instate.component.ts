import { CloseTabService } from 'services/close-tab.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-rr-instate',
  templateUrl: './rr-instate.component.html',
  styleUrls: ['./rr-instate.component.scss']
})
export class RrInstateComponent extends FactoryONE {

  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private outputManagerService: OutputManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  connectToServer = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.inStateReq, true);
    if (temp) {
      const res = await this.readingReportManagerService.ajaxReqWrapperService.postBlob(ENInterfaces.rrInStatePost, this.closeTabService.inStateReq);
      this.outputManagerService.downloadFileWithContentDisposition(res);
    }
  }
  classWrapper = async () => {
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
  }

}
