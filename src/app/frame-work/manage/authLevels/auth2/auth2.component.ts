import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IAuthLevel2 } from 'interfaces/iauth-levels';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthsManagerService } from 'services/auths-manager.service';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { Converter } from 'src/app/classes/converter';

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

    Converter.convertIdToTitle(this.dataSource, this.authLevel1Dictionary, 'authLevel1Id');
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
  removeRow = async (rowDataAndIndex: object) => {
    const a = await this.authsManagerService.firstConfirmDialog();
    if (a) {
      await this.authsManagerService.deleteSingleRow(ENInterfaces.AuthLevel2REMOVE, rowDataAndIndex['dataSource']);
      this.refetchTable(rowDataAndIndex['ri']);
    }
  }
  onRowEditInit(dataSource: object) {
    this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    if (!this.authsManagerService.verification(dataSource)) {
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (typeof dataSource['dataSource'].authLevel1Id !== 'object') {
      this.authLevel1Dictionary.find(item => {
        if (item.title === dataSource['dataSource'].authLevel1Id)
          dataSource['dataSource'].authLevel1Id = item.id
      })
    } else {
      dataSource['dataSource'].authLevel1Id = dataSource['dataSource'].authLevel1Id['id'];
    }
    await this.authsManagerService.addOrEditAuths(ENInterfaces.AuthLevel2EDIT, dataSource['dataSource']);
    Converter.convertIdToTitle(this.dataSource, this.authLevel1Dictionary, 'authLevel1Id');
  }
  onRowEditCancel() {
    Converter.convertIdToTitle(this.dataSource, this.authLevel1Dictionary, 'authLevel1Id');  
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