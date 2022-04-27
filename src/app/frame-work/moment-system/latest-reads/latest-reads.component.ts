import { Component } from '@angular/core';
import { ENRandomNumbers } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { FactoryONE } from 'src/app/classes/factory';
import { ILatestReads } from 'src/app/Interfaces/imoment';

@Component({
  selector: 'app-latest-reads',
  templateUrl: './latest-reads.component.html',
  styleUrls: ['./latest-reads.component.scss']
})
export class LatestReadsComponent extends FactoryONE {
  tempData =
    {
      id: 'id',
      zoneTitle: 'esfahan',
      counterReaderName: 'counterReaderName1',
      counterNumber: 10,
      counterStateTitle: 'counterStateTitle',
      gisAccuracy: 'gisAccuracy',
      x: '13929.4',
      y: '1392.3',
      billId: 'billId',
      radif: 22,
      eshterak: 'eshterak',
      qeraatCode: 'qeraatCode',
      firstName: 'firstName',
      sureName: 'stringsureName'
    }
  tempData2 =
    {
      id: 'id',
      zoneTitle: 'tse',
      counterReaderName: 'counterReaderName1',
      counterNumber: 2,
      counterStateTitle: 'counterStateTitle',
      gisAccuracy: 'gisAccuracy',
      x: '13929.4',
      y: '1392.3',
      billId: 'billId',
      radif: 22,
      eshterak: 'eshterak',
      qeraatCode: 'qeraatCode',
      firstName: 'firstName',
      sureName: 'stringsureName'
    }
  dataSource: ILatestReads[] = [];

  constructor(
    private closeTabService: CloseTabService,
    private interactionService: InteractionService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForTrackReading = null;
  classWrapper = async (canRefresh?: boolean) => {
    this.interactionService.getMomentLatestReads.subscribe(res => {
      this.dataSource.unshift(res);
      if (this.dataSource.length > ENRandomNumbers.twenty)
        this.dataSource.pop();
    })
  }
}