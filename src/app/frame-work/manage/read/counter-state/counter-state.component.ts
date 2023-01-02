import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { ICounterState } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { CounterStateService } from 'services/counter-state.service';
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

  dataSource: ICounterState[] = [];
  clonedProducts: { [s: string]: ICounterState; } = {};
  newRowLimit: number = 1;
  // innerLoading: boolean = false;
  _selectCols: any[];
  _selectedColumns: any[];

  constructor(
    private closeTabService: CloseTabService,
    private counterStateService: CounterStateService,
    private readManagerService: ReadManagerService
  ) {
    super();
  }

  // sendGridFriendlyDataSource = (event: LazyLoadEvent): any => {
  //   this.dataSource = this.counterStateService.getGridFriendlyDataSource(event);
  // }
  nullSavedSource = () => this.closeTabService.saveDataForCounterState = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterState) {
      this.dataSource = this.closeTabService.saveDataForCounterState;
    }
    else {
      this.dataSource = await this.counterStateService.getGridFriendlyDataSourceDefault();
      this.closeTabService.saveDataForCounterState = this.dataSource;
    }
    this.zoneDictionary = await this.counterStateService.getZoneDictionary();
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  columnSelectedMenuDefault = () => {
    this._selectCols = this.counterStateService.columnSelectedMenuDefault();
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
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog();
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
        this.dataSource.shift();
        return;
      }
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }

    if (dataSource['dataSource'].isNew) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      await this.readManagerService.addOrEditAuths(ENInterfaces.counterStateEdit, dataSource['dataSource']);
      this.refreshTable();
      Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    }
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  private async onRowAdd(dataSource: ICounterState, rowIndex: number) {
    const a = await this.readManagerService.postTextOutputDATA(ENInterfaces.counterStateAdd, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
      Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    }
  }

  newRow(): ICounterState {
    return { moshtarakinId: null, title: '', zoneId: null, clientOrder: null, canEnterNumber: false, isMane: false, canNumberBeLessThanPre: false, isTavizi: false, shouldEnterNumber: false, isXarab: false, isFaqed: false, hasImage: false, isNew: true };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() { this.newRowLimit = 2; }
}