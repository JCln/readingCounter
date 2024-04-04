import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentMaster } from 'interfaces/ireads-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { FragmentAddDgComponent } from './fragment-add-dg/fragment-add-dg.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;

  ref: DynamicDialogRef;
  zoneDictionary: IDictionaryManager[] = [];
  isAddingNewRow: boolean = false;
  readonly fragmentMasterColumns: string = '_fragmentMaster';
  clonedProducts: { [s: string]: IFragmentMaster; } = {};

  fragmentMasterId: string = '';
  zoneId: number = 0;
  onRowEditing: IFragmentMaster;

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    public route: ActivatedRoute,
    public dialogService: DialogService
  ) {
    super();
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForFragmentNOB.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  doDictionaryConfigs = async () => {
    this.zoneDictionary = await this.fragmentManagerService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.saveDataForFragmentNOB, this.zoneDictionary, 'changableZoneId');
  }
  callAPI = async () => {
    this.closeTabService.saveDataForFragmentNOB = await this.fragmentManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.fragmentMASTERALL);
    this.doDictionaryConfigs();
  }

  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForFragmentNOB)) {
      this.callAPI();
    }
    this.doDictionaryConfigs();
  }
  openDialog = (item?: IFragmentMaster) => {
    this.ref = this.dialogService.open(FragmentAddDgComponent, {
      data: item,
      rtl: true,
      width: '80%'
    })
    this.ref.onClose.subscribe(async res => {
      if (res) {
        this.callAPI();
      }
    });
  }
  removeFragmentMaster = async (dataSource: IFragmentMaster) => {
    const textMessage = 'ناحیه: ' + dataSource.zoneId + '، از اشتراک: ' + dataSource.fromEshterak + '،  تا اشتراک: ' + dataSource.toEshterak;
    if (await this.fragmentManagerService.firstConfirmDialog(textMessage)) {
      const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTERREMOVE, dataSource)
      if (res) {
        this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
  }
  getIsValidateRow = async (dataSource: IFragmentMaster) => {
    if (this.fragmentManagerService.verificationService.masterValidation(dataSource)) {
      const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTERVALIDATE, dataSource)
      if (res) {
        this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
  }
  routeToAutomaticImport = (dataSource: any) => {
    console.log(dataSource);

    dataSource.id = MathS.trimation(dataSource.id);
    if (!MathS.isNull(dataSource.id)) {
      if (dataSource.isValidated) {
        this.fragmentMasterId = dataSource.id;
        this.zoneId = dataSource.zoneId;
      }
      else {
        this.fragmentManagerService.utilsService.snackBarMessageWarn(EN_messages.isNotValidatedFragment);
      }
    }
  }
}
