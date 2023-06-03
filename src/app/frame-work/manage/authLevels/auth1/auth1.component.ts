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

  clonedProducts: { [s: string]: IAuthLevels; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
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
    if (!this.closeTabService.saveDataForAppLevel1) {
      this.closeTabService.saveDataForAppLevel1 = await this.authsManagerService.getAPIDataSource(ENInterfaces.AuthLevel1GET);
    }
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForAppLevel1 = this.closeTabService.saveDataForAppLevel1.slice(0, index).concat(this.closeTabService.saveDataForAppLevel1.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title);
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel1REMOVE, rowDataAndIndex['dataSource'].id);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForAppLevel1[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel1EDIT, dataSource['dataSource']);
  }

}