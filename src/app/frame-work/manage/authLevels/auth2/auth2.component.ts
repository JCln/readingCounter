import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IAuthLevel2 } from 'src/app/Interfaces/iauth-levels';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { AuthsManagerService } from 'src/app/services/auths-manager.service';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { Auth2AddDgComponent } from './auth2-add-dg/auth2-add-dg.component';

@Component({
  selector: 'app-auth2',
  templateUrl: './auth2.component.html',
  styleUrls: ['./auth2.component.scss']
})
export class Auth2Component implements OnInit, AfterViewInit, OnDestroy {

  dataSource: IAuthLevel2[] = [];
  subscription: Subscription[] = [];

  authLevel1Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel2; } = {};
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    public authsManagerService: AuthsManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth2AddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          di: this.authLevel1Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel2ADD, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel2 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel2) {
      this.dataSource = this.closeTabService.saveDataForAppLevel2;
    }
    else {
      this.dataSource = await this.authsManagerService.getAuth2DataSource();
      this.closeTabService.saveDataForAppLevel2 = this.dataSource;
    }
    this.authLevel1Dictionary = await this.authsManagerService.getAuthLevel1Dictionary();

    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel1Dictionary, 'authLevel1Id');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/me')
          this.classWrapper(true);
      }
    })
    )
  }
  ngAfterViewInit(): void {
    this.refreshTabStatus();
  }
  ngOnDestroy(): void {
    //  for purpose of refresh any time even without new event emiteds
    // we use subscription and not use take or takeUntil
    this.subscription.forEach(subscription => subscription.unsubscribe());
  }
  insertSelectedColumns = () => {
    this._selectCols = this.authsManagerService.columnAuth2();
    this._selectedColumns = this.authsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IAuthLevel2, rowIndex: number) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel2REMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IAuthLevel2, rowIndex: number) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.authLevel1Id !== 'object') {
      this.authLevel1Dictionary.find(item => {
        if (item.title === dataSource.authLevel1Id)
          dataSource.authLevel1Id = item.id
      })
    } else {
      dataSource.authLevel1Id = dataSource.authLevel1Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel2EDIT, dataSource);
    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel1Dictionary, 'authLevel1Id');
  }
  onRowEditCancel(dataSource: IAuthLevel2, index: number) {
    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel1Dictionary, 'authLevel1Id');
    // this.dataSource[index] = this.clonedProducts[dataSource.id];
    // delete this.dataSource[dataSource.id];
    // return;
  }
  refreshTable = () => {
    this.classWrapper(true);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}