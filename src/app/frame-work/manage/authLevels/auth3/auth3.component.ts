import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevel3 } from 'interfaces/iauth-levels';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';


@Component({
  selector: 'app-auth3',
  templateUrl: './auth3.component.html',
  styleUrls: ['./auth3.component.scss']
})
export class Auth3Component extends FactoryONE {

  authLevel2Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel3; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
    public authsManagerService: AuthsManagerService
  ) {
    super();
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth3AddDgComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: this.authLevel2Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel3 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForAppLevel3) {
      this.closeTabService.saveDataForAppLevel3 = await this.authsManagerService.getAPIDataSource(ENInterfaces.AuthLevel3GET);
    }

    this.authLevel2Dictionary = await this.authsManagerService.getAuthLevel2Dictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel3, this.authLevel2Dictionary, 'authLevel2Id');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForAppLevel3 = this.closeTabService.saveDataForAppLevel3.slice(0, index).concat(this.closeTabService.saveDataForAppLevel3.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  ماژول: ' + rowDataAndIndex['dataSource'].authLevel2Id);
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel3REMOVE, rowDataAndIndex['dataSource'].id);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.closeTabService.saveDataForAppLevel3[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].authLevel2Id !== 'object') {
      this.authLevel2Dictionary.find(item => {
        if (item.title === dataSource['dataSource'].authLevel2Id)
          dataSource['dataSource'].authLevel2Id = item.id
      })
    } else {
      dataSource['dataSource'].authLevel2Id = dataSource['dataSource'].authLevel2Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel3EDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel3, this.authLevel2Dictionary, 'authLevel2Id');
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel3, this.authLevel2Dictionary, 'authLevel2Id');
    // this.closeTabService.saveDataForAppLevel3[index] = this.clonedProducts[dataSource.id];
    // delete this.closeTabService.saveDataForAppLevel3[dataSource.id];
    // return;
  }

}