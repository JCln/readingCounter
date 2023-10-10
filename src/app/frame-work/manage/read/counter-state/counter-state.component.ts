import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ICounterState } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-counter-state',
  templateUrl: './counter-state.component.html',
  styleUrls: ['./counter-state.component.scss']
})
export class CounterStateComponent extends FactoryONE {
  zoneDictionary: IDictionaryManager[] = [];

  clonedProducts: { [s: string]: ICounterState; } = {};
  private counterStateDto: string = 'counterStateDto';
  newRowLimit: number = 1;
  _selectCols: any[];
  _selectedColumns: any[];

  constructor(
    public closeTabService: CloseTabService,
    private readManagerService: ReadManagerService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForCounterState = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForCounterState) {
      this.closeTabService.saveDataForCounterState = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.counterStateAll);
    }
    this.zoneDictionary = await this.readManagerService.dictionaryWrapperService.getZoneDictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterState, this.zoneDictionary, 'zoneId');
  }
  columnSelectedMenuDefault = () => {
    this._selectCols = this.readManagerService.columnManager.columnSelectedMenus(this.counterStateDto);
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
    this.columnSelectedMenuDefault();
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForCounterState = this.closeTabService.saveDataForCounterState.slice(0, index).concat(this.closeTabService.saveDataForCounterState.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog('عنوان: ' + rowData['dataSource'].title + '،  ناحیه: ' + rowData['dataSource'].zoneId);
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.counterStateRemove, rowData['dataSource'].id);
      this.refetchTable(rowData['ri']);
      this.refreshTable();
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
      this.refreshTable();
    }
    Converter.convertIdToTitle(this.closeTabService.saveDataForCounterState, this.zoneDictionary, 'zoneId');
  }
  private async onRowAdd(dataSource: ICounterState, rowIndex: number) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.counterStateAdd, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
      Converter.convertIdToTitle(this.closeTabService.saveDataForCounterState, this.zoneDictionary, 'zoneId');
    }
  }

  newRow(): ICounterState {
    return { moshtarakinId: null, title: '', zoneId: null, clientOrder: null, canEnterNumber: false, isMane: false, canNumberBeLessThanPre: false, isTavizi: false, shouldEnterNumber: false, isXarab: false, isFaqed: false, hasImage: false, isNew: true };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}