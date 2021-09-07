import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevel3 } from 'interfaces/iauth-levels';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';

import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';


@Component({
  selector: 'app-auth3',
  templateUrl: './auth3.component.html',
  styleUrls: ['./auth3.component.scss']
})
export class Auth3Component extends FactoryONE {

  dataSource: IAuthLevel3[] = [];

  authLevel2Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel3; } = {};
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public authsManagerService: AuthsManagerService
  ) {
    super(interactionService);
  }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth3AddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          di: this.authLevel2Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel3ADD, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel3 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel3) {
      this.dataSource = this.closeTabService.saveDataForAppLevel3;
    }
    else {
      this.dataSource = await this.authsManagerService.getAuth3DataSource();
      this.closeTabService.saveDataForAppLevel3 = this.dataSource;
    }
    this.authLevel2Dictionary = await this.authsManagerService.getAuthLevel2Dictionary();

    Converter.convertIdToTitle(this.dataSource, this.authLevel2Dictionary, 'authLevel2Id');
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.authsManagerService.columnAuth3();
    this._selectedColumns = this.authsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel3REMOVE, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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
    Converter.convertIdToTitle(this.dataSource, this.authLevel2Dictionary, 'authLevel2Id');
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.dataSource, this.authLevel2Dictionary, 'authLevel2Id');
    // this.dataSource[index] = this.clonedProducts[dataSource.id];
    // delete this.dataSource[dataSource.id];
    // return;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}