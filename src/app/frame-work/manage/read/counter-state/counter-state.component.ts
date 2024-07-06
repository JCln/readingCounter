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
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForCounterState.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  doDictionaryConfigs = async () => {
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterState, this.zoneDictionary, 'changableZoneId');
  }
  callAPI = async () => {
    this.closeTabService.saveDataForCounterState = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.counterStateAll);
    this.doDictionaryConfigs();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForCounterState)) {
      this.callAPI();
    }
    this.doDictionaryConfigs();
  }

  ngOnInit(): void {
    this.classWrapper();
  }
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title + '،  ناحیه: ' + rowData['dataSource'].changableZoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.counterStateRemove, rowData['dataSource'].id);
      this.callAPI();
    }
  }
  onRowEditSave = async (dataSource: ICounterState) => {
    this.defaultAddStatus();

    dataSource['dataSource'].moshtarakinId = Number(dataSource['dataSource'].moshtarakinId);
    dataSource['dataSource'].clientOrder = Number(dataSource['dataSource'].clientOrder);
    dataSource['dataSource'].zoneId = dataSource['dataSource'].changableZoneId;

    if (!this.readManagerService.verificationCounterState(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForCounterState.shift();
        return;
      }
      this.closeTabService.saveDataForCounterState[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource']);
    }
    else {
      await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.counterStateEdit, dataSource['dataSource']);
    }
    this.callAPI();
  }
  private async onRowAdd(dataSource: ICounterState) {
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
      changableZoneId: null,
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