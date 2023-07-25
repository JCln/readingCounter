import { OfflineModeService } from 'services/offline-mode.service';
import { CloseTabService } from 'services/close-tab.service';
import { Component, OnInit } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';

@Component({
  selector: 'app-single-reading-counter',
  templateUrl: './single-reading-counter.component.html',
  styleUrls: ['./single-reading-counter.component.scss']
})
export class SingleReadingCounterComponent implements OnInit {
  _searchByInfo: string = 'اشتراک';

  constructor(
    public closeTabService: CloseTabService,
    private offlineModeService: OfflineModeService
  ) { }

  connectToServer = async () => {
    if (this.offlineModeService.vertificationSingleReadingRequest(this.closeTabService.offlineSingleReadingCounterReq)) {
      this.closeTabService.offlineSingleReadingCounter = await this.offlineModeService.postDataSource(ENInterfaces.offlineSingleReadingCounter, this.closeTabService.offlineSingleReadingCounterReq);
    }
  }
  ngOnInit(): void {
  }

}
