import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDynamicTraverse } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-dynamic-traverse',
  templateUrl: './dynamic-traverse.component.html',
  styleUrls: ['./dynamic-traverse.component.scss']
})
export class DynamicTraverseComponent extends FactoryONE {
  newRowLimit: number = 1;

  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IDynamicTraverse; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForDynamicTraverse = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForDynamicTraverse) {
      this.closeTabService.saveDataForDynamicTraverse = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.dynamicTraverseAll);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnManager.columnSelectedMenus('dynamicTraverse');
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  newRow(): IDynamicTraverse {
    return {
      id: 0,
      title: '',
      storageTitle: '',
      isChangeable: false,
      defaultValue: false,
      isActive: true,
      isNew: true
    };
  }
  onRowEditInit(dataSource: IDynamicTraverse) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForDynamicTraverse[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.saveDataForDynamicTraverse[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForDynamicTraverse.shift();
  }
  removeRow = async (dataSource: IDynamicTraverse) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationDynamicTraverse(dataSource['dataSource']))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;
    console.log(dataSource['dataSource'].id);
    const route = ENInterfaces.dynamicTraverseRemove + dataSource['dataSource'].id;
    const a = await this.readManagerService.deleteSingleRowByObjectSpecial(route, dataSource['dataSource']);

    if (a) {
      this.closeTabService.saveDataForDynamicTraverse[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.saveDataForDynamicTraverse[dataSource['dataSource'].id];
      this.refreshTable();
    }
  }
  async onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationDynamicTraverse(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForDynamicTraverse.shift();
        return;
      }
      console.log(this.closeTabService.saveDataForDynamicTraverse[dataSource['ri']]);
      console.log(this.clonedProducts[dataSource['dataSource'].id]);

      this.closeTabService.saveDataForDynamicTraverse[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource']);
    }
    else {
      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.dynamicTraverseEdit, dataSource['dataSource']);
      if (a) {
        this.refreshTable();
      }
    }
  }
  private async onRowAdd(dataSource: IDynamicTraverse) {
    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.dynamicTraverseAdd, dataSource);
    if (a) {
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

}
