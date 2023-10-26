import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IBlockOrSafeIp } from 'interfaces/iserver-manager';
import { CloseTabService } from 'services/close-tab.service';
import { ReadManagerService } from 'services/read-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { UserBlockingComponent } from 'src/app/shared/user-blocking/user-blocking.component';

@Component({
  selector: 'app-ip-filter',
  templateUrl: './ip-filter.component.html',
  styleUrls: ['./ip-filter.component.scss']
})
export class IpFilterComponent extends FactoryONE {
  newRowLimit: number = 1;

  private ipFilterColumns: string = 'ipFilter';
  _selectCols: any[] = [];
  _selectedColumns: any[];
  userAllDictionary: IDictionaryManager[] = [];

  clonedProducts: { [s: string]: IBlockOrSafeIp; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public readManagerService: ReadManagerService,
  ) {
    super();
  }

  nullSavedSource = () => this.closeTabService.ipFilterRes = null;
  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.nullSavedSource();
    }
    if (!this.closeTabService.ipFilterRes) {
      this.closeTabService.ipFilterRes = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.GetIpFilter);
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
    this.userAllDictionary = await this.readManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.userAllDictionary);
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.readManagerService.columnManager.getColumnsMenus(this.ipFilterColumns);
    this._selectedColumns = this.readManagerService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.closeTabService.ipFilterRes = this.closeTabService.ipFilterRes.slice(0, index).concat(this.closeTabService.ipFilterRes.slice(index + 1));
  newRow(): IBlockOrSafeIp {
    return {
      id: 0,
      ip: '',
      subnet: '',
      targetUserDisplayName: '',
      targetUsername: '',
      userId: '',
      isSafe: false,
      isV6: false,
      isNew: true
    };
  }
  onRowEditInit(dataSource: IBlockOrSafeIp) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.id] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.ipFilterRes[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
    delete this.closeTabService.ipFilterRes[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.ipFilterRes.shift();
  }
  removeRow = async (dataSource: IBlockOrSafeIp) => {
    this.newRowLimit = 1;

    if (!this.readManagerService.verificationBlockOrSafeIP(dataSource['dataSource']))
      return;

    const confirmed = await this.readManagerService.firstConfirmDialog('IP: ' + dataSource['dataSource'].ip);
    if (!confirmed) return;

    const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.RemoveIpFilter, dataSource['dataSource']);

    if (a) {
      this.closeTabService.ipFilterRes[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      delete this.closeTabService.ipFilterRes[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
      this.refreshTable();
    }
  }
  async onRowEditSave(dataSource: object) {
    console.log(dataSource);

    this.newRowLimit = 1;
    if (!this.readManagerService.verificationBlockOrSafeIP(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.ipFilterRes.shift();
        return;
      }
      this.closeTabService.ipFilterRes[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].id];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      console.log(dataSource);

      const a = await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.EditIpFilter, dataSource['dataSource']);
      if (a) {
        this.refreshTable();
      }
      else {
        this.refetchTable(dataSource['ri']);
      }
    }
  }
  convertTitleToId = (dataSource: any): any => {
    if (this.userAllDictionary) {
      return this.userAllDictionary.find(item => {
        if (item.title === dataSource)
          return item;
      })
    }
  }
  private async onRowAdd(dataSource: IBlockOrSafeIp, rowIndex: number) {
    console.log(dataSource);
    const tempId = this.convertTitleToId(dataSource.userId);
    dataSource.userId = tempId.id;
    console.log(dataSource);

    if (await this.readManagerService.postObjectWithSuccessMessage(ENInterfaces.AddIpFilter, dataSource)) {
      this.refreshTable();
    }
  }
  openAddDialog = (dataSource: IBlockOrSafeIp) => {
    return new Promise(() => {
      const dialogRef = this.closeTabService.utilsService.dialog.open(UserBlockingComponent, {
        disableClose: true,
        minWidth: '65vw',
        data: {
          di: dataSource
        }
      });
      dialogRef.afterClosed().subscribe(async result => {
        if (result)
          this.refreshTable();
      });
    });
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}
