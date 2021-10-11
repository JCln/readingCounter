import { Component, Input } from '@angular/core';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentMaster } from 'interfaces/ireads-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { InteractionService } from 'services/interaction.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;

  dataSource: IFragmentMaster[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  isAddingNewRow: boolean = false;
  clonedProducts: { [s: string]: IFragmentMaster; } = {};

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService
  ) {
    super(interactionService);
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
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.defaultAddStatus();
    if (this.dataSource.length)
      this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnSelectedFragmentMaster();
    this._selectedColumns = this.fragmentManagerService.customizeSelectedColumns(this._selectCols);
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  newRow(): IFragmentMaster {
    return { zoneId: null, routeTitle: '', fromEshterak: '', toEshterak: '', isNew: true };
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource.id] = { ...dataSource };
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
    console.log(a);

    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  onRowEditCancel(dataSource: IFragmentMaster, index: number) {
    this.newRowLimit = 1;
    if (dataSource.isNew)
      this.dataSource.shift();
    return;
  }
  removeFragmentMaster = async (dataSource: IFragmentMaster, rowIndex: number) => {
    const obj2 = { ...dataSource };
    obj2.zoneId = 1;
    if (!this.fragmentManagerService.verificationMaster(obj2))
      return;
    const confirmed = await this.fragmentManagerService.firstConfirmDialog();
    if (!confirmed) return;
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
