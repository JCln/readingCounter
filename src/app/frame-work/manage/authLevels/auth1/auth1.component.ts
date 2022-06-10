import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevels } from 'interfaces/iauth-levels';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

import { Auth1AddDgComponent } from './auth1-add-dg/auth1-add-dg.component';


@Component({
  selector: 'app-auth1',
  templateUrl: './auth1.component.html',
  styleUrls: ['./auth1.component.scss']
})
export class Auth1Component extends FactoryONE {

  dataSource: IAuthLevels[] = [];

  clonedProducts: { [s: string]: IAuthLevels; } = {};

  constructor(
    private dialog: MatDialog,
    private closeTabService: CloseTabService,
    private authsManagerService: AuthsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth1AddDgComponent, { disableClose: true, minWidth: '19rem' });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel1 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel1) {
      this.dataSource = this.closeTabService.saveDataForAppLevel1;
    }
    else {
      this.dataSource = await this.authsManagerService.getAuth1DataSource();
      this.closeTabService.saveDataForAppLevel1 = this.dataSource;
    }
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel1REMOVE, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource['dataSource'])) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel1EDIT, dataSource['dataSource']);
  }

}