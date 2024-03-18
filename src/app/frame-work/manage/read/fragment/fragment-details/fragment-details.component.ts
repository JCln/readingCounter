import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { FdDgComponent } from './fd-dg/fd-dg.component';


@Component({
  selector: 'app-fragment-details',
  templateUrl: './fragment-details.component.html',
  styleUrls: ['./fragment-details.component.scss']
})
export class FragmentDetailsComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;
  ref: DynamicDialogRef;
  readonly fragmentDetailsColumns: string = 'fragmentDetails';

  zoneDictionary: IDictionaryManager[] = [];
  clonedProducts: { [s: string]: IFragmentDetails; } = {};

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    private dialogService: DialogService
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
      if (
        this.closeTabService.fragmentNOBDetailsGUID != this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid ||
        MathS.isNull(this.closeTabService.saveDataForFragmentNOBDetails)
      ) {
        this.callAPI();
      }
      this.defaultAddStatus();
    }
  }
  defaultAddStatus = () => this.newRowLimit = 1;

  testChangedValue() {
    this.newRowLimit = 2;
  }
  newRow = () => {
    this.ref = this.dialogService.open(FdDgComponent, {
      data: this.fragmentManagerService.pageSignsService.fragmentDetails_pageSign.GUid,
      rtl: true,
      width: '80%'
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        console.log(1);
        this.callAPI();
      }
    });
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
    console.log(confirmed);

    if (confirmed) {
      const res = await this.fragmentManagerService.postBody(ENInterfaces.fragmentDETAILSREMOVE, dataSource['dataSource']);
      if (res) {
        this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
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
    if (dataSource['dataSource'].id) {
      this.fragmentManagerService.postBody(ENInterfaces.fragmentDETAILSEDIT, dataSource['dataSource']);
    }
  }


}