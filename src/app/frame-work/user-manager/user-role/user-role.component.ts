import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IRoleManager } from 'interfaces/iuser-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { InteractionService } from 'services/interaction.service';
import { UsersAllService } from 'services/users-all.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent extends FactoryONE {
  dataSource: IRoleManager[] = [];

 
  regionDictionary: IDictionaryManager[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IRoleManager; } = {};
  table: Table;
  newRowLimit: number = 1;

  constructor(
    public interactionService: InteractionService,
    private closeTabService: CloseTabService,
    private userService: UsersAllService
  ) {
    super(interactionService);
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
  insertSelectedColumns = () => {
    this._selectCols = this.userService.columnUserRoles();
    this._selectedColumns = this.userService.customizeSelectedColumns(this._selectCols);
  }
  refetchTable = (index: number) => this.dataSource = this.dataSource.slice(0, index).concat(this.dataSource.slice(index + 1));
  removeRow = async (rowData: object) => {
    const a = await this.userService.firstConfirmDialog();

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
        this.dataSource.shift();
        return;
      }
      this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (dataSource['dataSource'].isNew) {
      await this.userService.roleAddEdit(ENInterfaces.RoleADD, dataSource['dataSource']);
    }
    else {
      await this.userService.roleAddEdit(ENInterfaces.RoleEDIT, dataSource['dataSource']);
    }
  }
  onRowEditCancel(dataSource: object) {
    this.defaultAddStatus();
    if (dataSource['dataSource'].isNew) {
      this.dataSource.shift();
      return;
    }
    this.dataSource[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
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
