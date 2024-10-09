import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { OfflineModeService } from 'services/offline-mode.service';
import { OutputManagerService } from 'services/output-manager.service';

@Component({
  selector: 'app-off-load',
  templateUrl: './off-load.component.html',
  styleUrls: ['./off-load.component.scss']
})
export class OffLoadComponent {

  userCounterReaderDictionary: IDictionaryManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public offlineModeService: OfflineModeService,
    private outputManagerService: OutputManagerService,
    public closeTabService: CloseTabService
  ) {
    this.classWrapper();
  }
  // classWrapper is not Overritten
  classWrapper = () => {
    this.getZoneDictionary();
    this.getCounterReader();
  }

  downloadTextFile = async () => {
    if (this.offlineModeService.verificationService.vertificationLoadManual(this.closeTabService.offloadFormReq)) {
      const res = await this.offlineModeService.ajaxReqWrapperService.getBlob(ENInterfaces.loadManual + '?userId=' + this.closeTabService.offloadFormReq.counterReaderId);
      this.outputManagerService.downloadFileWithContentDisposition(res);
    }
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = await this.offlineModeService.dictionaryWrapperService.getZoneDictionary();
  }
  getCounterReader = async () => {
    if (this.closeTabService.offloadFormReq.zoneId) {
      this.userCounterReaderDictionary = await this.offlineModeService.dictionaryWrapperService.getUserCounterReaderDictionary(this.closeTabService.offloadFormReq.zoneId);
    }
  }

}
