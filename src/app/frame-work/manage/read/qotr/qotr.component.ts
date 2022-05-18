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

  dataSource: any[] = [];
  provinceDictionary: IDictionaryManager[] = [];

  constructor(
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForQotrManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForQotrManager) {
      this.dataSource = this.closeTabService.saveDataForQotrManager;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.QotrAll);
      this.closeTabService.saveDataForQotrManager = this.dataSource;
    }
    this.provinceDictionary = await this.readManagerService.getProvinceDictionary();

    Converter.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
  }


}