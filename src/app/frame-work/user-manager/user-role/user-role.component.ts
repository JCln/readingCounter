import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IRoleManager } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

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
  callAPI = async () => {
    this.closeTabService.saveDataForRoleManager = await this.userService.ajaxReqWrapperService.getDataSource(ENInterfaces.RoleGET);
    this.insertSelectedColumns();
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForRoleManager)) {
      this.callAPI();
    }
  }
  insertSelectedColumns = () => {
    this._selectCols = this.userService.columnUserRoles();
    this._selectedColumns = this.userService.customizeSelectedColumns(this._selectCols);
  }
  removeRow = async (rowData: object) => {
    const a = await this.userService.firstConfirmDialog(
      {
        messageTitle: EN_messages.confirm_remove,
        text: 'عنوان: ' + rowData['dataSource'].title + '،  عنوان فارسی: ' + rowData['dataSource'].titleUnicode,
        icon: 'pi pi-trash'
      }
    );

    if (a) {
      await this.userService.deleteSingleRow(ENInterfaces.RoleREMOVE, rowData['dataSource'].id);
      this.callAPI();
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
      const res = await this.userService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.RoleADD, dataSource['dataSource']);
      if (res)
        this.userService.snackBarMessageSuccess(res);
    }
    else {
      const res = await this.userService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.RoleEDIT, dataSource['dataSource']);
      if (res)
        this.userService.snackBarMessageSuccess(res);
    }
    this.callAPI();
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
      title: '',
      isActive: false,
      needDeviceIdLogin: false,
      displaySensitiveNotification: false,
      titleUnicode: '',
      isNew: true
    };
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  testChangedValue() {
    this.newRowLimit = 2;
  }
}
