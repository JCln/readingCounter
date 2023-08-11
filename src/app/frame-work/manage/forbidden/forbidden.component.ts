import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
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
  fbnZoneDictionary: IDictionaryManager[] = [];

  constructor(
    public forbiddenService: ForbiddenService,
    public closeTabService: CloseTabService,
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForFNB = await this.forbiddenService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.forbidden, this.closeTabService.forbiddenReq);
    Converter.convertIdToTitle(this.closeTabService.saveDataForFNB, this.fbnZoneDictionary, 'zoneId');
    this.forbiddenService.setDynamicPartRanges(this.closeTabService.saveDataForFNB);
  }
  classWrapper = async (canRefresh: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForFNB = null;
    }
    this.fbnZoneDictionary = await JSON.parse(JSON.stringify(this.forbiddenService.dictionaryWrapperService.getZoneDictionary()));
    if (this.fbnZoneDictionary[0].id !== 0)
      this.fbnZoneDictionary.unshift({ id: 0, title: 'نامشخص', isSelected: true })
  }
  verification = async () => {
    const temp = this.forbiddenService.verificationForbidden(this.closeTabService.forbiddenReq);
    if (temp)
      this.connectToServer();
  }
  refreshTable = () => {
    this.verification();
  }

}