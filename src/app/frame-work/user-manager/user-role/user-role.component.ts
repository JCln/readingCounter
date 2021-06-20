import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { ENInterfaces } from 'src/app/Interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'src/app/Interfaces/ioverall-config';
import { IRoleManager } from 'src/app/Interfaces/iuser-manager';
import { CloseTabService } from 'src/app/services/close-tab.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { UsersAllService } from 'src/app/services/users-all.service';

import { RoleAddDgComponent } from './role-add-dg/role-add-dg.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: IRoleManager[] = [];

  subscription: Subscription[] = [];
  regionDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IRoleManager; } = {};

  constructor(
    private dialog: MatDialog,
    private interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private userService: UsersAllService
  ) { }

  openAddDialog = () => {
    return new Promise(() => {
      const dialogRef = this.dialog.open(RoleAddDgComponent,
        {
          disableClose: true,
          width: '30rem',
        });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.userService.roleAddEdit(ENInterfaces.RoleADD, result);
        }
      });
    });
  }

  nullSavedSource = () => this.closeTabService.saveDataForRoleManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (this.closeTabService.saveDataForRoleManager) {
      this.dataSource = this.closeTabService.saveDataForRoleManager;
    }
    else {
      this.dataSource = await this.userService.connectToServer(ENInterfaces.RoleGET);
      this.closeTabService.saveDataForRoleManager = this.dataSource;
    }
    this.insertSelectedColumns();
  }
  ngOnInit() {
    this.classWrapper();
  }
  refreshTabStatus = () => {
    this.subscription.push(this.interactionService.getRefreshedPage().subscribe((res: string) => {
      if (res) {
        if (res === '/wr/mu/role')
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
    this.subscription.forEach(subscription => subscription.unsubscribe())
  }
  insertSelectedColumns = () => {
    this._selectCols = this.userService.columnUserRoles();
    this._selectedColumns = this.userService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: IRoleManager, rowIndex: number) => {
    const a = await this.userService.firstConfirmDialog();

    if (a) {
      await this.userService.deleteSingleRow(ENInterfaces.RoleREMOVE, rowData.id);
      this.refetchTable(rowIndex);
    }
  }
  onRowEditInit(dataSource: any) {
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditSave = async (dataSource: IRoleManager, rowIndex: number) => {
    if (!this.userService.verification(dataSource)) {
      this.dataSource[rowIndex] = this.clonedProducts[dataSource.id];
      return;
    }

    await this.userService.roleAddEdit(ENInterfaces.RoleEDIT, dataSource);
  }
  onRowEditCancel(dataSource: IRoleManager, index: number) {
    this.dataSource[index] = this.clonedProducts[dataSource.id];
    delete this.dataSource[dataSource.id];
    return;
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  refreshTable = () => {
    this.classWrapper(true);
  }

}
