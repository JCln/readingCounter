import { Component } from '@angular/core';
import { OfflineModeService } from 'services/offline-mode.service';
import { OutputManagerService } from 'services/output-manager.service';

@Component({
  selector: 'app-off-load',
  templateUrl: './off-load.component.html',
  styleUrls: ['./off-load.component.scss']
})
export class OffLoadComponent {
  userName: string = '';

  constructor(
    private offlineModeService: OfflineModeService,
    private outputManagerService: OutputManagerService
  ) { }


  downloadTextFile = async () => {
    if (this.offlineModeService.vertificationLoadManual(this.userName)) {
      const a = await this.offlineModeService.getOfflineManual(this.userName);
      this.outputManagerService.downloadFile(a, '.txt');
    }
  }

}
