import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IAuthLevel3 } from 'src/app/Interfaces/iauth-levels';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { AuthsManagerService } from 'src/app/services/auths-manager.service';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { Auth3AddDgComponent } from './auth3-add-dg/auth3-add-dg.component';


@Component({
  selector: 'app-auth3',
  templateUrl: './auth3.component.html',
  styleUrls: ['./auth3.component.scss']
})
export class Auth3Component implements OnInit, AfterViewInit, OnDestroy {

  dataSource: IAuthLevel3[] = [];
  subscription: Subscription[] = [];

  authLevel2Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel3; } = {};
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
      const dialogRef = this.dialog.open(Auth3AddDgComponent, {
        disableClose: true,
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

    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel2Dictionary, 'authLevel2Id');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/cr')
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
    this._selectCols = this.authsManagerService.columnAuth3();
    this._selectedColumns = this.authsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IAuthLevel3, rowIndex: number) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel3REMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IAuthLevel3, rowIndex: number) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.authLevel2Id !== 'object') {
      this.authLevel2Dictionary.find(item => {
        if (item.title === dataSource.authLevel2Id)
          dataSource.authLevel2Id = item.id
      })
    } else {
      dataSource.authLevel2Id = dataSource.authLevel2Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel3EDIT, dataSource);
    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel2Dictionary, 'authLevel2Id');
  }
  onRowEditCancel(dataSource: IAuthLevel3, index: number) {
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