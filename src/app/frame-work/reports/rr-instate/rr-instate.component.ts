import { CloseTabService } from 'services/close-tab.service';
import { Component, ViewChild } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { OutputManagerService } from 'services/output-manager.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { TreeSelect } from 'primeng/treeselect';

@Component({
  selector: 'app-rr-instate',
  templateUrl: './rr-instate.component.html',
  styleUrls: ['./rr-instate.component.scss']
})
export class RrInstateComponent extends FactoryONE {
  provinceHierarchy: IProvinceHierarchy[] = [];
  @ViewChild('myTreeSelect', { static: false }) myTreeSelect!: TreeSelect;

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    private outputManagerService: OutputManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  connectToServer = async () => {
    this.closeTabService.inStateReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.myTreeSelect.value);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.inStateReq, true);
    if (temp) {
      const res = await this.readingReportManagerService.ajaxReqWrapperService.postBlobObserve(ENInterfaces.rrInStatePost, this.closeTabService.inStateReq);
      this.outputManagerService.downloadFileWithContentDisposition(res);
    }
  }
  classWrapper = async () => {
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
  }

}
