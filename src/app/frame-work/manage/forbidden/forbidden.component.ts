import { Component } from '@angular/core';
import { IForbiddenManager } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent extends FactoryONE {
  dataSource: IForbiddenManager[] = [];
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public forbiddenService: ForbiddenService,
    private closeTabService: CloseTabService,
  ) {
    super();
  }
  connectToServer = async () => {
    this.dataSource = await this.forbiddenService.getDataSource();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.forbiddenService.setDynamicPartRanges(this.dataSource);
    this.closeTabService.saveDataForFNB = this.dataSource;
  }
  classWrapper = async (canRefresh: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForFNB = null;
    }
    if (this.closeTabService.saveDataForFNB) {
      this.dataSource = this.closeTabService.saveDataForFNB;
    }

    this.zoneDictionary = await this.forbiddenService.getZoneDictionary();
  }
  verification = async () => {
    const temp = this.forbiddenService.verificationForbidden(this.forbiddenService.forbiddenReq);
    if (temp)
      this.connectToServer();
  }
  refreshTable = () => {
    this.verification();
  }

}