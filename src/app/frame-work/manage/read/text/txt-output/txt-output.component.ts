import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { ITextOutput } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { OutputManagerService } from 'src/app/services/output-manager.service';
import { ReadManagerService } from 'src/app/services/read-manager.service';

@Component({
  selector: 'app-txt-output',
  templateUrl: './txt-output.component.html',
  styleUrls: ['./txt-output.component.scss']
})
export class TxtOutputComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  table: Table;
  newRowLimit: number = 1;

  dataSource: ITextOutput[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  _masterId: string = '';
  clonedProducts: { [s: string]: ITextOutput; } = {};

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
    public outputManagerService: OutputManagerService
  ) { }

  nullSavedSource = () => this.closeTabService.saveDataForTextOutput = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.textOutputGET);
    this.zoneDictionary = await this.readManagerService.getZoneDictionary();
    this.closeTabService.saveDataForTextOutput = this.dataSource;
    this.makeIDReadable();
    this.defaultAddStatus();
    this.insertSelectedColumns();
    this.readManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnTextOutput();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res.includes('/wr/m/r/txt/out'))
        this.classWrapper(true);
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }

  testChangedValue() {
    this.newRowLimit = 2;
  }
  refreshTable = () => this.classWrapper(true);
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  newRow(): ITextOutput {
    return {
      id: null,
      zoneId: null,
      itemTitle: '',
      startIndex: null,
      endIndex: null,
      length: null,
      isNew: true
    };
  }
  onRowEditInit(dataSource: ITextOutput) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: ITextOutput, index: number) {
    this.newRowLimit = 1;
    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
    if (dataSource.isNew)
      this.dataSource.shift();
    return;
  }
  removeRow = async (dataSource: ITextOutput, index: number) => {
    this.newRowLimit = 1;
    console.log(dataSource);
    if (typeof dataSource.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource.zoneId)
          dataSource.zoneId = item.id
      })
    } else {
      dataSource.zoneId = dataSource.zoneId['id'];
    }

    const verif = await this.readManagerService.firstConfirmDialog();
    if (verif) {
      const a = await this.readManagerService.postTextOutputDATA(ENInterfaces.textOutputRemove, dataSource);

      if (a) {
        this.dataSource[index] = this.clonedProducts[dataSource.id];
        delete this.dataSource[dataSource.id];
        this.refetchTable(index);
      }
    }
  }
  onRowEditSave(dataSource: ITextOutput, rowIndex: number) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationTextOutputEditedRow(dataSource)) {
      if (dataSource.isNew) {
        this.dataSource.shift();
        return;
      }
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }

    if (typeof dataSource.zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource.zoneId)
          dataSource.zoneId = item.id
      })
    } else {
      dataSource.zoneId = dataSource.zoneId['id'];
    }

    if (dataSource.isNew) {
      this.onRowAdd(dataSource, rowIndex);
    }
    else {
      this.readManagerService.postTextOutputDATA(ENInterfaces.textOutputEdit, dataSource);
    }
  }
  async onRowAdd(dataSource: ITextOutput, rowIndex: number) {
    const a = await this.readManagerService.postTextOutputDATA(ENInterfaces.textOutputAdd, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  private makeIDReadable = () => {
    this.dataSource.forEach(item => {
      item.id = item['id'];
    })
  }
}