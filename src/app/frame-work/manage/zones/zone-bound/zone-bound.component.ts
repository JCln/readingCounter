import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IZoneBoundManager } from 'interfaces/izones';
import { CloseTabService } from 'services/close-tab.service';
import { SectorsManagerService } from 'services/sectors-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { ZoneBoundAddDgComponent } from './zone-bound-add-dg/zone-bound-add-dg.component';

@Component({
  selector: 'app-zone-bound',
  templateUrl: './zone-bound.component.html',
  styleUrls: ['./zone-bound.component.scss']
})
export class ZoneBoundComponent extends FactoryONE {
  dataSource: IZoneBoundManager[] = [];


  zoneDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IZoneBoundManager; } = {};

  constructor(
    private dialog: MatDialog,
     
    private closeTabService: CloseTabService,
    private sectorsManagerService: SectorsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(ZoneBoundAddDgComponent,
        {
          disableClose: true,
          minWidth: '19rem',
          data: {
            di: this.zoneDictionary
          }

        });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForZoneBound = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForZoneBound) {
      this.dataSource = this.closeTabService.saveDataForZoneBound;
    }
    else {
      this.dataSource = await this.sectorsManagerService.getSectorsDataSource(ENInterfaces.ZoneBoundGET);
      this.closeTabService.saveDataForZoneBound = this.dataSource;
    }
    this.zoneDictionary = await this.sectorsManagerService.getZoneDictionary();

    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.sectorsManagerService.columnZoneBound();
    this._selectedColumns = this.sectorsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.sectorsManagerService.firstConfirmDialog();

    if (a) {
      await this.sectorsManagerService.deleteSingleRow(ENInterfaces.ZoneBoundREMOVE, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.sectorsManagerService.verification(dataSource['dataSource'])) {
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
    await this.sectorsManagerService.addOrEditCountry(ENInterfaces.ZoneBoundEDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.zoneDictionary, 'zoneId');
  }
  onRowEditCancel() {
    // this.dataSource[rowDataAndIndex['ri']] = this.clonedProducts[rowDataAndIndex['dataSource']];
    // delete this.dataSource[rowDataAndIndex['dataSource']];
    // return;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}