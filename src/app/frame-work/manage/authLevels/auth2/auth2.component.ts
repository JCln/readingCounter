import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevel2 } from 'interfaces/iauth-levels';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { Auth2AddDgComponent } from './auth2-add-dg/auth2-add-dg.component';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrls: ['./auth2.component.scss']
})
export class Auth2Component extends FactoryONE {

  authLevel1Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel2; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public authsManagerService: AuthsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth2AddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.authLevel1Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel2 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForAppLevel2) {
      this.closeTabService.saveDataForAppLevel2 = await this.authsManagerService.getAPIDataSource(ENInterfaces.AuthLevel2GET);
    }

    this.authLevel1Dictionary = await this.authsManagerService.getAuthLevel1Dictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel2, this.authLevel1Dictionary, 'authLevel1Id');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForAppLevel2 = this.closeTabService.saveDataForAppLevel2.slice(0, index).concat(this.closeTabService.saveDataForAppLevel2.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  app: ' + rowDataAndIndex['dataSource'].authLevel1Id);
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel2REMOVE, rowDataAndIndex['dataSource'].id);
      this.refetchTable(rowDataAndIndex['ri']);
      this.refreshTable();
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.closeTabService.saveDataForAppLevel2[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].authLevel1Id !== 'object') {
      this.authLevel1Dictionary.find(item => {
        if (item.title === dataSource['dataSource'].authLevel1Id)
          dataSource['dataSource'].authLevel1Id = item.id
      })
    } else {
      dataSource['dataSource'].authLevel1Id = dataSource['dataSource'].authLevel1Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel2EDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel2, this.authLevel1Dictionary, 'authLevel1Id');
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel2, this.authLevel1Dictionary, 'authLevel1Id');
  }

}