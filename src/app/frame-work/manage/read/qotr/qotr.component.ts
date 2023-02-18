import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';


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

  nullSavedSource = () => this.closeTabService.saveDataForQotrManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForQotrManager) {
      this.closeTabService.saveDataForQotrManager = await this.readManagerService.getDataSource(ENInterfaces.QotrAll);
    }
    this.provinceDictionary = await this.readManagerService.getProvinceDictionary();

    Converter.convertIdToTitle(this.closeTabService.saveDataForQotrManager, this.provinceDictionary, 'provinceId');
  }


}