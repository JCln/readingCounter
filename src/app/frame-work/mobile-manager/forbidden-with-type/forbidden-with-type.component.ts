import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { MobileAppService } from 'services/mobile-app.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-forbidden-with-type',
  templateUrl: './forbidden-with-type.component.html',
  styleUrls: ['./forbidden-with-type.component.scss'],
  animations: [transitionAnimation]
})
export class ForbiddenWithTypeComponent extends FactoryONE {
  fbnWithTypeZoneDictionary: IDictionaryManager[] = [];

  constructor(
    public mobileAppService: MobileAppService,
    public closeTabService: CloseTabService,
  ) {
    super();
  }
  connectToServer = async () => {
    this.closeTabService.mobileManagerforbiddenType = await this.mobileAppService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.forbiddenByParamWithType, this.closeTabService.mobileManagerforbiddenTypeReq);
    Converter.convertIdToTitle(this.closeTabService.mobileManagerforbiddenType, this.fbnWithTypeZoneDictionary, 'zoneId');
  }
  classWrapper = async (canRefresh: boolean) => {
    if (canRefresh) {
      this.closeTabService.mobileManagerforbiddenType = null;
    }
    this.fbnWithTypeZoneDictionary = JSON.parse(JSON.stringify(await this.mobileAppService.dictionaryWrapperService.getZoneDictionary()));
    if (this.fbnWithTypeZoneDictionary[0].id !== 0)
      this.fbnWithTypeZoneDictionary.unshift({ id: 0, title: 'نامشخص', isSelected: true })
  }
  verification = async () => {
    const temp = this.mobileAppService.verificationForbiddenWithType(this.closeTabService.mobileManagerforbiddenTypeReq);
    if (temp)
      this.connectToServer();
  }
  refreshTable = () => {
    this.verification();
  }

}