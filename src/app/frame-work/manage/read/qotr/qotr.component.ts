import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-qotr',
  templateUrl: './qotr.component.html',
  styleUrls: ['./qotr.component.scss']
})
export class QotrComponent extends FactoryONE {

  provinceDictionary: IDictionaryManager[] = [];

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForQotrManager = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.QotrAll);
    this.provinceDictionary = await this.readManagerService.dictionaryWrapperService.getProvinceDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForQotrManager, this.provinceDictionary, 'provinceId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForQotrManager)) {
      this.callAPI();
    }
  }


}