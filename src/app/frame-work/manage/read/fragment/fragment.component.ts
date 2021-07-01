import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { IFragmentMaster } from 'src/app/Interfaces/imanage';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { FragmentManagerService } from 'src/app/services/fragment-manager.service';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent implements OnInit, AfterViewInit, OnDestroy {
  subscription: Subscription[] = [];

  table: Table;
  newRowLimit: number = 1;

  dataSource: IFragmentMaster[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  isAddingNewRow: boolean = false;
  clonedProducts: { [s: string]: IFragmentMaster; } = {};

  constructor(
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService
  ) {
  }

  testChangedValue() {
    this.newRowLimit = 2;
  }
  nullSavedSource = () => this.closeTabService.saveDataForFragmentNOB = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForFragmentNOB) {
      this.dataSource = this.closeTabService.saveDataForFragmentNOB;
    }
    else {
      this.dataSource = await this.fragmentManagerService.getDataSource();
      this.closeTabService.saveDataForFragmentNOB = this.dataSource;
    }
    this.zoneDictionary = await this.fragmentManagerService.getZoneDictionary();
    this.fragmentManagerService.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.defaultAddStatus();
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnSelectedFragmentMaster();
    this._selectedColumns = this.fragmentManagerService.customizeSelectedColumns(this._selectCols);
  }
  ngOnInit(): void {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res === '/wr/m/r/nob')
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
  defaultAddStatus = () => this.newRowLimit = 1;
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  refreshTable = () => {
    this.classWrapper(true);
  }
  newRow(): IFragmentMaster {
    return { zoneId: null, routeTitle: '', fromEshterak: '', toEshterak: '', isNew: true };
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave(dataSource: IFragmentMaster, rowIndex: number) {
    this.newRowLimit = 1;
    if (!this.fragmentManagerService.verificationMaster(dataSource)) {
      if (dataSource.isNew) {
        this.dataSource.shift();
        return;
      }
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    dataSource.zoneId = dataSource.zoneId['id'];
    if (!dataSource.id) {
      this.onRowAdd(dataSource, rowIndex);
    }
    else {
      this.fragmentManagerService.editFragmentMaster(dataSource);
    }
    this.refreshTable();
  }
  async onRowAdd(dataSource: IFragmentMaster, rowIndex: number) {
    if (!this.fragmentManagerService.verificationMaster(dataSource))
      return;
    const a = await this.fragmentManagerService.addFragmentMaster(dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  onRowEditCancel(dataSource: IFragmentMaster, index: number) {
    this.newRowLimit = 1;
    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
    if (dataSource.isNew)
      this.dataSource.shift();
    return;
  }
  removeFragmentMaster = async (dataSource: IFragmentMaster, rowIndex: number) => {
    const obj2 = { ...dataSource };
    obj2.zoneId = 1;
    if (!this.fragmentManagerService.verificationMaster(obj2))
      return;
    const a = await this.fragmentManagerService.removeFragmentMaster(obj2);
    if (a)
      this.refetchTable(rowIndex);
  }
  getIsValidateRow = async (dataSource: IFragmentMaster) => {
    const obj2 = { ...dataSource };
    obj2.zoneId = 1;
    if (!this.fragmentManagerService.verificationMaster(obj2))
      return;
    this.fragmentManagerService.isValidateMaster(obj2);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
