import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
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
    private outputManagerService: OutputManagerService
  ) {
    this.classWrapper();
  }
  // classWrapper is not Overritten
  classWrapper = () => {
    this.getZoneDictionary();

    if (this.offlineModeService.loadForm.zoneId)
      this.getCounterReader();
  }

  downloadTextFile = async () => {
    if (this.offlineModeService.vertificationLoadManual()) {
      const a = await this.offlineModeService.getOfflineManual(this.offlineModeService.loadForm.counterReaderId);
      this.outputManagerService.downloadFile(a, '.txt');
    }
  }
  getZoneDictionary = async () => {
    this.zoneDictionary = await this.offlineModeService.dictionaryWrapperService.getZoneDictionary();
  }
  getCounterReader = async () => {
    if (this.offlineModeService.loadForm.zoneId) {
      this.userCounterReaderDictionary = await this.offlineModeService.dictionaryWrapperService.getUserCounterReaderDictionary(this.offlineModeService.loadForm.zoneId);
    }
  }

}
