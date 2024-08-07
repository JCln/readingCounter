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
import { MathS } from 'src/app/classes/math-s';


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
          this.callAPI();
      });
    });
  }
  callAPI = async () => {
    this.closeTabService.saveDataForAppLevel3 = await this.authsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel3GET);
    this.insertToAux();
    this.authLevel2Dictionary = await this.authsManagerService.dictionaryWrapperService.getAuthLev2Dictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel3, this.authLevel2Dictionary, 'dynamicId');
  }
  classWrapper = async (canRefresh?: boolean) => {
    if (MathS.isNull(this.closeTabService.saveDataForAppLevel3)) {
      this.callAPI();
    }
    this.authLevel2Dictionary = await this.authsManagerService.dictionaryWrapperService.getAuthLev2Dictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel3, this.authLevel2Dictionary, 'dynamicId');
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForAppLevel3 = this.closeTabService.saveDataForAppLevel3.slice(0, index).concat(this.closeTabService.saveDataForAppLevel3.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  ماژول: ' + rowDataAndIndex['dataSource'].authLevel2Id);
    if (a) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.AuthLevel3REMOVE, rowDataAndIndex['dataSource'].id);
      if (res) {
        this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
  }
  insertToAux = () => {
    this.closeTabService.saveDataForAppLevel3.forEach(item => {
      item.dynamicId = item.authLevel2Id;
    })
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    console.log(dataSource['dataSource']);
    if (!this.authsManagerService.verification(dataSource['dataSource'])) {
      this.closeTabService.saveDataForAppLevel3[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel3EDIT, dataSource['dataSource']);
    this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
    this.callAPI();
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel3, this.authLevel2Dictionary, 'dynamicId');
  }

}