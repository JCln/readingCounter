import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ICounterState } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  clonedProducts: { [s: string]: ICounterState; } = {};
  readonly counterStateDto: string = 'counterStateDto';
  newRowLimit: number = 1;

  constructor(
    public closeTabService: CloseTabService,
    private readManagerService: ReadManagerService
  ) {
    super();
  }
  callAPI = async () => {
    this.closeTabService.saveDataForCounterState = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.counterStateAll);
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterState, this.zoneDictionary, 'zoneId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForCounterState)) {
      this.callAPI();
    }
  }
  
  ngOnInit(): void {
    this.classWrapper();    
  }
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title + '،  ناحیه: ' + rowData['dataSource'].zoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.counterStateRemove, rowData['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditSave = async (dataSource: ICounterState) => {
    this.defaultAddStatus();

    dataSource['dataSource'].moshtarakinId = Number(dataSource['dataSource'].moshtarakinId);
    dataSource['dataSource'].clientOrder = Number(dataSource['dataSource'].clientOrder);


    if (typeof dataSource['dataSource'].zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource['dataSource'].zoneId)
          dataSource['dataSource'].zoneId = item.id
      })
    } else {
      dataSource['dataSource'].zoneId = dataSource['dataSource'].zoneId['id'];
    }

    if (!this.readManagerService.verificationCounterState(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForCounterState.shift();
        return;
      }
      this.closeTabService.saveDataForCounterState[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.counterStateEdit, dataSource['dataSource']);
    }
    this.callAPI();
  }
  private async onRowAdd(dataSource: ICounterState, rowIndex: number) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.counterStateAdd, dataSource);
    if (a) {
      this.callAPI();
    }
  }

  newRow(): ICounterState {
    return {
      moshtarakinId: null,
      title: '',
      zoneId: null,
      clientOrder: null,
      canEnterNumber: false,
      isMane: false,
      canNumberBeLessThanPre: false,
      isTavizi: false,
      shouldEnterNumber: false,
      isXarab: false,
      isFaqed: false,
      hasImage: false,
      displayDebt: false,
      displayIcons: false,
      isNew: true
    };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}