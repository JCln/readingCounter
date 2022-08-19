import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevel4 } from 'interfaces/iauth-levels';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { Auth4AddDgComponent } from './auth4-add-dg/auth4-add-dg.component';


@Component({
  selector: 'app-auth4',
  templateUrl: './auth4.component.html',
  styleUrls: ['./auth4.component.scss']
})
export class Auth4Component extends FactoryONE {

  dataSource: IAuthLevel4[] = [];

  authLevel3Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel4; } = {};

  constructor(
    private dialog: MatDialog,
    private closeTabService: CloseTabService,
    public authsManagerService: AuthsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth4AddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.authLevel3Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel4 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel4) {
      this.dataSource = this.closeTabService.saveDataForAppLevel4;
    }
    else {
      this.dataSource = await this.authsManagerService.getAPIDataSource(ENInterfaces.AuthLevel4GET);
      this.closeTabService.saveDataForAppLevel4 = this.dataSource;
    }
    this.authLevel3Dictionary = await this.authsManagerService.getAuthLevel3Dictionary();

    Converter.convertIdToTitle(this.dataSource, this.authLevel3Dictionary, 'authLevel3Id');
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel4REMOVE, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].authLevel3Id !== 'object') {
      this.authLevel3Dictionary.find(item => {
        if (item.title === dataSource['dataSource'].authLevel3Id)
          dataSource['dataSource'].authLevel3Id = item.id
      })
    } else {
      dataSource['dataSource'].authLevel3Id = dataSource['dataSource'].authLevel3Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel4EDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.authLevel3Dictionary, 'authLevel3Id');
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.dataSource, this.authLevel3Dictionary, 'authLevel3Id');
  }

}