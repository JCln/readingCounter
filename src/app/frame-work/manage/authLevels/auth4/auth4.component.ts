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
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-auth4',
  templateUrl: './auth4.component.html',
  styleUrls: ['./auth4.component.scss']
})
export class Auth4Component extends FactoryONE {

  authLevel3Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel4; } = {};

  constructor(
    private dialog: MatDialog,
    public closeTabService: CloseTabService,
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
          this.callAPI();
      });
    });
  }
  convertion = async () => {
    this.authLevel3Dictionary = await this.authsManagerService.dictionaryWrapperService.getAuthLev3Dictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel4, this.authLevel3Dictionary, 'dynamicId');
  }
  insertToAux = () => {
    this.closeTabService.saveDataForAppLevel4.forEach(item => {
      item.dynamicId = item.authLevel3Id;
    })
  }

  callAPI = async () => {
    this.closeTabService.saveDataForAppLevel4 = await this.authsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel4GET);
    this.insertToAux();
    this.convertion();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForAppLevel4)) {
      this.callAPI();
    }
    this.convertion();
  }
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  کنترلر: ' + rowDataAndIndex['dataSource'].authLevel3Id);
    if (a) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.AuthLevel4REMOVE, rowDataAndIndex['dataSource'].id);
      if (res) {
        this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (this.authsManagerService.verification(dataSource['dataSource'])) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel4EDIT, dataSource['dataSource']);
      this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  onRowEditCancel() {
    this.convertion();
  }

}