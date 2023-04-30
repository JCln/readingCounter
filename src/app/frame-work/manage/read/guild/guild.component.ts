import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IGuild } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.scss']
})
export class GuildComponent extends FactoryONE {
  newRowLimit: number = 1;

  _selectCols: any[] = [];
  _selectedColumns: any[];

  clonedProducts: { [s: string]: IGuild; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForGuild = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForGuild) {
      this.closeTabService.saveDataForGuild = await this.readManagerService.getDataSource(ENInterfaces.GuildManagerAll);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnManager.columnSelectedMenus('guild');
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForGuild = this.closeTabService.saveDataForGuild.slice(0, index).concat(this.closeTabService.saveDataForGuild.slice(index + 1));
  newRow(): IGuild {
    return {
      id: 0,
      title: '',
      isNew: true
    };
  }
  onRowEditInit(dataSource: IGuild) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForGuild[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.saveDataForGuild[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForGuild.shift();
  }
  removeRow = async (dataSource: IGuild) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationGuild(dataSource['dataSource']))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('عنوان: ' + dataSource['dataSource'].title);
    if (!confirmed) return;

    const a = await this.readManagerService.deleteSingleRowByObject(ENInterfaces.GuildManagerRemove, dataSource['dataSource']);

    if (a) {
      this.closeTabService.saveDataForGuild[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.saveDataForGuild[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
      this.refreshTable();
    }
  }
  onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.readManagerService.verificationGuild(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForGuild.shift();
        return;
      }
      this.closeTabService.saveDataForGuild[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      const a = this.readManagerService.addOrEditAuths(ENInterfaces.GuildManagerEdit, dataSource['dataSource']);
      if (a) {
        this.refreshTable();
      }
      else {
        this.refetchTable(dataSource['ri']);
      }
    }
  }
  private async onRowAdd(dataSource: IGuild, rowIndex: number) {
    const a = await this.readManagerService.addOrEditAuths(ENInterfaces.GuildManagerAdd, dataSource);
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

}
