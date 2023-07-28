import { OfflineModeService } from 'services/offline-mode.service';
import { CloseTabService } from 'services/close-tab.service';
import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-single-reading-counter',
  templateUrl: './single-reading-counter.component.html',
  styleUrls: ['./single-reading-counter.component.scss'],
  animations: [transitionAnimation]
})
export class SingleReadingCounterComponent extends FactoryONE {
  _searchByInfo: string = 'اشتراک';

  constructor(
    public closeTabService: CloseTabService,
    private offlineModeService: OfflineModeService
  ) {
    super();
  }

  connectToServer = async () => {
    if (this.offlineModeService.vertificationSingleReadingRequest(this.closeTabService.offlineSingleReadingCounterReq)) {
      this.closeTabService.offlineSingleReadingCounter = await this.offlineModeService.postDataSource(ENInterfaces.offlineSingleReadingCounter, this.closeTabService.offlineSingleReadingCounterReq);
      console.log(this.closeTabService.offlineSingleReadingCounter);

    }
  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(1);

    this.closeTabService.offlineSingleReadingCounterReq.searchType = this.offlineModeService.getSearchTypes();
  }

}
