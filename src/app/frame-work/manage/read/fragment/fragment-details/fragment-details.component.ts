import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;
  readonly fragmentDetailsColumns: string = 'fragmentDetails';

  _selectCols: any[] = [];
  _selectedColumns: any[];

  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IFragmentDetails; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService
  ) {
    super();
  }

  callAPI = async () => {
    this.closeTabService.saveDataForFragmentNOBDetails = await this.fragmentManagerService.ajaxReqWrapperService.getDataSourceById(ENInterfaces.fragmentDETAILSDETAILS, this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid);
    this.closeTabService.fragmentNOBDetailsGUID = this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid;
  }
  classWrapper = async () => {
    console.log(this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid);
    if (!this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid) {
      this.fragmentManagerService.routeToFragmentMaster();
    }

    else {
      console.log(this.closeTabService.fragmentNOBDetailsGUID);

      if (
        this.closeTabService.fragmentNOBDetailsGUID != this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid ||
        MathS.isNull(this.closeTabService.saveDataForFragmentNOBDetails)
      ) {
        this.callAPI();
      }
      this.defaultAddStatus();
      this.insertSelectedColumns();
    }
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnManager.getColumnsMenus(this.fragmentDetailsColumns);
    this._selectedColumns = this.fragmentManagerService.columnManager.customizeSelectedColumns(this._selectCols);
    console.log(this._selectedColumns);
    console.log(this._selectCols);

  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  newRow(): IFragmentDetails {
    return { routeTitle: '', fromEshterak: '', toEshterak: '', fragmentMasterId: this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid, isNew: true };
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
    console.log(dataSource);
    
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
      this.callAPI();
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
      this.callAPI();
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