import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevels } from 'interfaces/iauth-levels';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { FactoryONE } from 'src/app/classes/factory';

import { Auth1AddDgComponent } from './auth1-add-dg/auth1-add-dg.component';
import { MathS } from 'src/app/classes/math-s';
import { EN_messages, ENRandomNumbers } from 'interfaces/enums.enum';


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
  callAPI = async () => {
    this.closeTabService.saveDataForAppLevel1 = await this.authsManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.AuthLevel1GET);
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForAppLevel1)) {
      this.callAPI();
    }
  }
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog('عنوان: ' + rowDataAndIndex['dataSource'].title);
    if (a) {
      const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceById(ENInterfaces.AuthLevel1REMOVE, rowDataAndIndex['dataSource'].id)
      if (res) {
        this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
      }
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
    // app title should be less than much number
    if (!MathS.isLowerThanMaxLength(dataSource['dataSource'].title, ENRandomNumbers.twelve)) {
      this.authsManagerService.utilsService.snackBarMessageWarn(EN_messages.limitedLengthTitle);
      return;
    }

    const res = await this.authsManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.AuthLevel1EDIT, dataSource['dataSource']);
    this.authsManagerService.utilsService.snackBarMessageSuccess(res.message);
  }

}