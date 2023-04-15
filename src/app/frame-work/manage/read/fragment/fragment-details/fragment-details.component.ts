import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';


@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;

  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[] = [];
  _selectedColumns: any[];
  clonedProducts: { [s: string]: IFragmentDetails; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService
  ) {
    super();
  }

  nullSavedSource = () => {
    this.closeTabService.saveDataForFragmentNOBDetails = null;
    this.closeTabService.fragmentNOBDetailsGUID = null;
  }
  classWrapper = async (canRefresh?: boolean) => {
    console.log(this.fragmentManagerService.fragmentDetails_pageSign.GUid);
    if (!this.fragmentManagerService.fragmentDetails_pageSign.GUid) {
      this.fragmentManagerService.routeToFragmentMaster();
    }

    else {
      console.log(this.fragmentManagerService.fragmentDetails_pageSign.GUid);
      if (canRefresh) {
        this.nullSavedSource();
      }
      console.log(this.closeTabService.fragmentNOBDetailsGUID);

      if (
        this.closeTabService.fragmentNOBDetailsGUID != this.fragmentManagerService.fragmentDetails_pageSign.GUid ||
        !this.closeTabService.saveDataForFragmentNOBDetails
      ) {
        this.closeTabService.saveDataForFragmentNOBDetails = await this.fragmentManagerService.getFragmentDetails(this.fragmentManagerService.fragmentDetails_pageSign.GUid);
        this.closeTabService.fragmentNOBDetailsGUID = this.fragmentManagerService.fragmentDetails_pageSign.GUid;
      }
      this.defaultAddStatus();
      this.insertSelectedColumns();
    }
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnManager.columnSelectedMenus('fragmentDetails');
    this._selectedColumns = this.fragmentManagerService.customizeSelectedColumns(this._selectCols);
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  refetchTable = (index: number) => this.closeTabService.saveDataForFragmentNOBDetails = this.closeTabService.saveDataForFragmentNOBDetails.slice(0, index).concat(this.closeTabService.saveDataForFragmentNOBDetails.slice(index + 1));
  newRow(): IFragmentDetails {
    return { routeTitle: '', fromEshterak: '', toEshterak: '', fragmentMasterId: this.fragmentManagerService.fragmentDetails_pageSign.GUid, isNew: true };
  }
  onRowEditInit(dataSource: IFragmentDetails) {
    // this.insertSelectedColumns();
    this.clonedProducts[dataSource.fragmentMasterId] = { ...dataSource };
  }
  onRowEditCancel(dataSource: object) {
    this.newRowLimit = 1;
    this.closeTabService.saveDataForFragmentNOBDetails[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
    delete this.closeTabService.saveDataForFragmentNOBDetails[dataSource['dataSource'].id];
    if (dataSource['dataSource'].isNew)
      this.closeTabService.saveDataForFragmentNOBDetails.shift();
    return;
  }
  removeRow = async (dataSource: any) => {
    this.newRowLimit = 1;

    if (!this.fragmentManagerService.verificationDetails(dataSource['dataSource']))
      return;
    const textMessage = 'از اشتراک: ' + dataSource['dataSource'].fromEshterak + ' تا اشتراک: ' + dataSource['dataSource'].toEshterak;
    const confirmed = await this.fragmentManagerService.firstConfirmDialog(textMessage);
    if (!confirmed) return;
    const a = await this.fragmentManagerService.postBody(ENInterfaces.fragmentDETAILSREMOVE, dataSource['dataSource']);
    if (a) {
      this.closeTabService.saveDataForFragmentNOBDetails[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
      delete this.closeTabService.saveDataForFragmentNOBDetails[dataSource['dataSource'].id];
      this.refetchTable(dataSource['ri']);
    }
  }
  onRowEditSave(dataSource: object) {
    this.newRowLimit = 1;
    if (!this.fragmentManagerService.verificationDetails(dataSource['dataSource'])) {
      if (dataSource['dataSource'].isNew) {
        this.closeTabService.saveDataForFragmentNOBDetails.shift();
        return;
      }
      this.closeTabService.saveDataForFragmentNOBDetails[dataSource['ri']] = this.clonedProducts[dataSource['dataSource'].fragmentMasterId];
      return;
    }
    if (!dataSource['dataSource'].id) {
      this.onRowAdd(dataSource['dataSource'], dataSource['ri']);
    }
    else {
      this.fragmentManagerService.postBody(ENInterfaces.fragmentDETAILSEDIT, dataSource['dataSource']);
    }
  }
  private async onRowAdd(dataSource: IFragmentDetails, rowIndex: number) {
    const a = await this.fragmentManagerService.postBody(ENInterfaces.fragmentDETAILSADD, dataSource);
    if (a) {
      this.refetchTable(rowIndex);
      this.refreshTable();
    }
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }

}