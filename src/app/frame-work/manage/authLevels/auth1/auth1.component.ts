import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IAuthLevels } from 'src/app/Interfaces/iauth-levels';
import { AuthsManagerService } from 'src/app/services/auths-manager.service';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { Auth1AddDgComponent } from './auth1-add-dg/auth1-add-dg.component';


@Component({
  selector: 'app-auth1',
  templateUrl: './auth1.component.html',
  styleUrls: ['./auth1.component.scss']
})
export class Auth1Component implements OnInit, AfterViewInit, OnDestroy {

  dataSource: IAuthLevels[] = [];
  subscription: Subscription[] = [];

  clonedProducts: { [s: string]: IAuthLevels; } = {};
  _selectCols: any[] = [];
  _selectedColumns: any[];

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private authsManagerService: AuthsManagerService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(Auth1AddDgComponent, { disableClose: true });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel1ADD, result);
        }
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
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.authsManagerService.columnAuth1();
    this._selectedColumns = this.authsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/ap')
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
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IAuthLevels, rowIndex: number) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel1REMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IAuthLevels, rowIndex: number) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel1EDIT, dataSource);
  }
  onRowEditCancel(dataSource: IAuthLevels, index: number) {
    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
    return;
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