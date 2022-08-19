import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IKarbari } from 'interfaces/ireads-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { KarbariAddDgComponent } from './karbari-add-dg/karbari-add-dg.component';

@Component({
  selector: 'app-karbari',
  templateUrl: './karbari.component.html',
  styleUrls: ['./karbari.component.scss']
})
export class KarbariComponent extends FactoryONE {

  dataSource: IKarbari[] = [];
  provinceDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IKarbari; } = {};

  constructor(
    private dialog: MatDialog,
    private closeTabService: CloseTabService,
    public readManagerService: ReadManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(KarbariAddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.provinceDictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForKarbari = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForKarbari) {
      this.dataSource = this.closeTabService.saveDataForKarbari;
    }
    else {
      this.dataSource = await this.readManagerService.getDataSource(ENInterfaces.KarbariAll);
      this.closeTabService.saveDataForKarbari = this.dataSource;
    }
    this.provinceDictionary = await this.readManagerService.getProvinceDictionary();

    Converter.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.readManagerService.firstConfirmDialog();
    if (a) {
      await this.readManagerService.deleteSingleRow(ENInterfaces.KarbariRemove, rowData['dataSource']);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: IKarbari) => {
    if (!this.readManagerService.verification(dataSource)) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].provinceId !== 'object') {
      this.provinceDictionary.find(item => {
        if (item.title === dataSource['dataSource'].provinceId)
          dataSource['dataSource'].provinceId = item.id
      })
    } else {
      dataSource['dataSource'].provinceId = dataSource['dataSource'].provinceId['id'];
    }
    await this.readManagerService.addOrEditAuths(ENInterfaces.KarbariEdit, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.provinceDictionary, 'provinceId');
  }

}