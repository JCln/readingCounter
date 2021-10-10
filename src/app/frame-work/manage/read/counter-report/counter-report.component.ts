import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { ICounterReport } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { CrAddDgComponent } from './cr-add-dg/cr-add-dg.component';

@Component({
  selector: 'app-counter-report',
  templateUrl: './counter-report.component.html',
  styleUrls: ['./counter-report.component.scss']
})
export class CounterReportComponent extends FactoryONE {
  dataSource: ICounterReport[] = [];

  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: ICounterReport; } = {};

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(CrAddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          this.refreshTable();
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForCounterReport = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForCounterReport) {
      this.dataSource = this.closeTabService.saveDataForCounterReport;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.CounterReportAll);
      this.closeTabService.saveDataForCounterReport = this.dataSource;
    }
    this.zoneDictionary = await this.readManagerService.getZoneDictionary();

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnCounterReport();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.CounterReportRemove, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
      this.refreshTable();
    }
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.readManagerService.verification(dataSource['dataSource'])) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].zoneId !== 'object') {
      this.zoneDictionary.find(item => {
        if (item.title === dataSource['dataSource'].zoneId)
          dataSource['dataSource'].zoneId = item.id
      })
    } else {
      dataSource['dataSource'].zoneId = dataSource['dataSource'].zoneId['id'];
    }
    await this.readManagerService.addOrEditAuths(ENInterfaces.CounterReportEdit, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}