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
import { MathS } from 'src/app/classes/math-s';

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
  insertToAux = () => {
    this.closeTabService.saveDataForAppLevel2.forEach(item => {
      item.dynamicId = item.authLevel1Id;
    })
  }
  async callDictionary() {
    this.authLevel1Dictionary = await this.authsManagerService.dictionaryWrapperService.getAuthLev1Dictionary();
    Converter.convertIdToTitle(this.closeTabService.saveDataForAppLevel2, this.authLevel1Dictionary, 'dynamicId');
  }
  callAPI = async () => {
    this.closeTabService.saveDataForAppLevel2 = await this.authsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel2GET);
    this.insertToAux();
    this.callDictionary();
  }

  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForAppLevel2)) {
      this.callAPI();
    }
    this.callDictionary();
  }
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title + '،  app: ' + rowDataAndIndex['dataSource'].dynamicId);
    if (a) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.AuthLevel2REMOVE, rowDataAndIndex['dataSource'].id);
      if (res) {
        this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.refreshTable();
      }
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (this.authsManagerService.verification(dataSource)) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel2EDIT, dataSource['dataSource']);
      this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
      this.callAPI();
    }
  }
  onRowEditCancel() {
    this.callDictionary();
  }

}