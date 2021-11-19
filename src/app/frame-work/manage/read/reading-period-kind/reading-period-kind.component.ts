import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingPeriodKind } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

import { RpkmAddDgComponent } from './rpkm-add-dg/rpkm-add-dg.component';

@Component({
  selector: 'app-reading-period-kind',
  templateUrl: './reading-period-kind.component.html',
  styleUrls: ['./reading-period-kind.component.scss']
})
export class ReadingPeriodKindComponent extends FactoryONE {
  dataSource: IReadingPeriodKind[] = [];

  clonedProducts: { [s: string]: IReadingPeriodKind; } = {};

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RpkmAddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForReadingPeriodKindManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingPeriodKindManager) {
      this.dataSource = this.closeTabService.saveDataForReadingPeriodKindManager;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.readingPeriodKindAll);
      this.closeTabService.saveDataForReadingPeriodKindManager = this.dataSource;
    }
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnReadingPeriodKind();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.readingPeriodKindRemove, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.readManagerService.verification(dataSource['dataSource'])) {
      this.dataSource['ri'] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.readManagerService.addOrEditAuths(ENInterfaces.readingPeriodKindEdit, dataSource['dataSource']);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}