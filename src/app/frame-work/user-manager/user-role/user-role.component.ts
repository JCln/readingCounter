import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IRoleManager } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent extends FactoryONE {
  regionDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IRoleManager; } = {};
  table: Table;
  newRowLimit: number = 1;

  constructor(
    public closeTabService: CloseTabService,
    private userService: UsersAllService
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.saveDataForRoleManager = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.saveDataForRoleManager) {
      this.closeTabService.saveDataForRoleManager = await this.userService.connectToServer(ENInterfaces.RoleGET);
    }
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.userService.columnUserRoles();
    this._selectedColumns = this.userService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForRoleManager = this.closeTabService.saveDataForRoleManager.slice(0, index).concat(this.closeTabService.saveDataForRoleManager.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.userService.firstConfirmDialog(EN_messages.confirm_remove);

    if (a) {
      await this.userService.deleteSingleRow(ENInterfaces.RoleREMOVE, rowData['dataSource'].id);
      this.refetchTable(rowData['ri']);
    }
  }
  onRowEditInit(dataSource: any) {
    // this.clonedProducts[dataSource['dataSource'].id] = { ...dataSource['dataSource'] };
  }
  onRowEditSave = async (dataSource: object) => {
    this.defaultAddStatus();
    if (!this.userService.verification(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForRoleManager.shift();
        return;
      }
      this.closeTabService.saveDataForRoleManager[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (dataSource['dataSource'].isNew) {
      const res = await this.userService.postDataSource(ENInterfaces.RoleADD, dataSource['dataSource']);
      if (res)
        this.userService.snackBarMessageSuccess(res);
    }
    else {
      const res = await this.userService.postDataSource(ENInterfaces.RoleEDIT, dataSource['dataSource']);
      if (res)
        this.userService.snackBarMessageSuccess(res);
    }
  }
  onRowEditCancel(dataSource: object) {
    this.defaultAddStatus();
    if (dataSource['dataSource'].isNew) {
      this.closeTabService.saveDataForRoleManager.shift();
      return;
    }
    this.closeTabService.saveDataForRoleManager[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  newRow(): IRoleManager {
    return {
      title: '', isActive: false, needDeviceIdLogin: false, titleUnicode: '', isNew: true
    };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() {
    this.newRowLimit = 2;
  }
}
