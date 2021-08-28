import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IReadingConfigDefault } from 'interfaces/imanage';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { RdAddDgComponent } from './rd-add-dg/rd-add-dg.component';
import { RdEditDgComponent } from './rd-edit-dg/rd-edit-dg.component';

@Component({
  selector: 'app-reading-config',
  templateUrl: './reading-config.component.html',
  styleUrls: ['./reading-config.component.scss']
})
export class ReadingConfigComponent extends FactoryONE {

  dataSource: IReadingConfigDefault[] = [];
  subscription: Subscription[] = [];

  editableDataSource = [];
  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IReadingConfigDefault; } = {};

  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super(interactionService)
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RdAddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        width: '100%',
        data: {
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.readManagerService.addOrEditAuths(ENInterfaces.ReadingConfigADD, result);
          this.refreshTable();
        }
      });
    });
  }
  getEditableSource = (row: any) => {
    const a = this.editableDataSource.find(dataSource => {
      if (dataSource.id == row.id) {
        return dataSource.id;
      }
    })
    return a;
  }
  openEditDialog = (row: object) => {
    const editable = this.getEditableSource(row).zoneId;
    return new Promise(() => {
      const dialogRef = this.dialog.open(RdEditDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        width: '100%',
        data: {
          row,
          editable,
          di: this.zoneDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          await this.readManagerService.addOrEditAuths(ENInterfaces.ReadingConfigEDIT, result);
        this.refreshTable();
      });
    })
  }

  nullSavedSource = () => this.closeTabService.saveDataForReadingConfig = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForReadingConfig) {
      this.dataSource = this.closeTabService.saveDataForReadingConfig;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.ReadingConfigALL);
      this.closeTabService.saveDataForReadingConfig = this.dataSource;
    }
    this.zoneDictionary = await this.readManagerService.getZoneDictionary();
    this.editableDataSource = JSON.parse(JSON.stringify(this.dataSource));

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnReadingConfigDefault();
    this._selectedColumns = this.readManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.ReadingConfigREMOVE, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
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
