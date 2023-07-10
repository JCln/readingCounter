import { Component } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ForbiddenService } from 'services/forbidden.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  animations: [transitionAnimation]
})
export class ForbiddenComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public forbiddenService: ForbiddenService,
    public closeTabService: CloseTabService,
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForFNB = await this.forbiddenService.getDataSource();
    Converter.convertIdToTitle(this.closeTabService.saveDataForFNB, this.zoneDictionary, 'zoneId');
    this.forbiddenService.setDynamicPartRanges(this.closeTabService.saveDataForFNB);
  }
  classWrapper = async (canRefresh: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForFNB = null;
    }
    this.zoneDictionary = await this.forbiddenService.dictionaryWrapperService.getZoneDictionary();
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