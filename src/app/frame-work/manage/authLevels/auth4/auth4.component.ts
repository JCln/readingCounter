import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IAuthLevel4 } from 'src/app/Interfaces/iauth-levels';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';

import { Auth4AddDgComponent } from './auth4-add-dg/auth4-add-dg.component';


@Component({
  selector: 'app-auth4',
  templateUrl: './auth4.component.html',
  styleUrls: ['./auth4.component.scss']
})
export class Auth4Component implements OnInit, AfterViewInit, OnDestroy {

  dataSource: IAuthLevel4[] = [];
  subscription: Subscription[] = [];


  authLevel3Dictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IAuthLevel4; } = {};
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
      const dialogRef = this.dialog.open(Auth4AddDgComponent, {
        disableClose: true,
        minWidth: '19rem',
        data: {
          di: this.authLevel3Dictionary
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel4ADD, result);
        }
      });
    });
  }
  nullSavedSource = () => this.closeTabService.saveDataForAppLevel4 = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForAppLevel4) {
      this.dataSource = this.closeTabService.saveDataForAppLevel4;
    }
    else {
      this.dataSource = await this.authsManagerService.getAuth4DataSource();
      this.closeTabService.saveDataForAppLevel4 = this.dataSource;
    }
    this.authLevel3Dictionary = await this.authsManagerService.getAuthLevel3Dictionary();

    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel3Dictionary, 'authLevel3Id');
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/m/al/ac')
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
    this._selectCols = this.authsManagerService.columnAuth4();
    this._selectedColumns = this.authsManagerService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IAuthLevel4, rowIndex: number) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel4REMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IAuthLevel4, rowIndex: number) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }
    if (typeof dataSource.authLevel3Id !== 'object') {
      this.authLevel3Dictionary.find(item => {
        if (item.title === dataSource.authLevel3Id)
          dataSource.authLevel3Id = item.id
      })
    } else {
      dataSource.authLevel3Id = dataSource.authLevel3Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel4EDIT, dataSource);
    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel3Dictionary, 'authLevel3Id');
  }
  onRowEditCancel(dataSource: IAuthLevel4, index: number) {
    this.authsManagerService.convertIdToTitle(this.dataSource, this.authLevel3Dictionary, 'authLevel3Id');
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