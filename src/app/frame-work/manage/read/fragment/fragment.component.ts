import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentMaster } from 'interfaces/ireads-manager';
import { Table } from 'primeng/table';
import { CloseTabService } from 'services/close-tab.service';
import { FragmentManagerService } from 'services/fragment-manager.service';
import { ProfileService } from 'services/profile.service';
import { Converter } from 'src/app/classes/converter';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';


@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['./fragment.component.scss']
})
export class FragmentComponent extends FactoryONE {
  table: Table;
  newRowLimit: number = 1;

  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any[];
  _selectedColumns: any[];
  isAddingNewRow: boolean = false;
  private readonly fragmentMasterColumns: string = '_fragmentMaster';
  clonedProducts: { [s: string]: IFragmentMaster; } = {};

  fragmentMasterId: string = '';
  zoneId: number = 0;
  onRowEditing: IFragmentMaster;

  constructor(
    public closeTabService: CloseTabService,
    public fragmentManagerService: FragmentManagerService,
    public route: ActivatedRoute,
    private profileService: ProfileService
  ) {
    super();
  }
  testChangedValue() {
    this.newRowLimit = 2;
  }
  getLocalReOrderable = (): boolean => {
    return this.profileService.getLocalReOrderable();
  }
  insertToAuxZoneid = () => {
    this.closeTabService.saveDataForFragmentNOB.forEach(item => {
      item.changableZoneId = item.zoneId;
    })
  }
  callAPI = async () => {
    this.closeTabService.saveDataForFragmentNOB = await this.fragmentManagerService.ajaxReqWrapperService.getDataSource(ENInterfaces.fragmentMASTERALL);
    this.zoneDictionary = await this.fragmentManagerService.dictionaryWrapperService.getZoneDictionary();
    this.insertToAuxZoneid();
    Converter.convertIdToTitle(this.closeTabService.saveDataForFragmentNOB, this.zoneDictionary, 'changableZoneId');
  }
  classWrapper = async () => {
    if (MathS.isNull(this.closeTabService.saveDataForFragmentNOB)) {
      this.callAPI();
    }
    this.defaultAddStatus();
    this.insertSelectedColumns();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.fragmentManagerService.columnManager.getColumnsMenus(this.fragmentMasterColumns);
    this._selectedColumns = this.fragmentManagerService.columnManager.customizeSelectedColumns(this._selectCols);
  }
  defaultAddStatus = () => this.newRowLimit = 1;
  newRow(): IFragmentMaster {
    return { zoneId: null, routeTitle: '', fromEshterak: '', toEshterak: '', changableZoneId: null, isNew: true };
  }
  onRowEditInit(dataSource: any) {
    this.onRowEditing = JSON.parse(JSON.stringify(dataSource));
  }
  onRowEditSave = async (dataSource: IFragmentMaster, rowIndex: number) => {
    dataSource = dataSource['dataSource'];

    this.newRowLimit = 1;
    /* TODO: 
    1- Make first item of dictionary if no value inserted on new row
    2- eshteraks should convert to english numbers
    */
    dataSource.fromEshterak = Converter.persianToEngNumbers(dataSource.fromEshterak);
    dataSource.toEshterak = Converter.persianToEngNumbers(dataSource.toEshterak);

    if (dataSource.zoneId == null) {
      dataSource.zoneId = this.zoneDictionary[0].id;
    }

    if (this.fragmentManagerService.masterValidation(dataSource)) {
      // convert a zone to id

      if (dataSource.isNew) {
        const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTERADD, dataSource);
        this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
      else {
        this.closeTabService.saveDataForFragmentNOB[rowIndex] = this.clonedProducts[dataSource.id];
        const res = await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTEREDIT, dataSource);
        this.fragmentManagerService.utilsService.snackBarMessageSuccess(res.message);
        this.callAPI();
      }
    }
    else {
      this.shiftFromFirst(dataSource);
    }
  }
  shiftFromFirst = (dataSource: IFragmentMaster) => {
    console.log(this.table);

    if (dataSource.isNew) {
      this.table.value.shift();
    }
  }
  onRowEditCancel(dataSource: IFragmentMaster) {
    this.newRowLimit = 1;
    for (let index = 0; index < this.closeTabService.saveDataForFragmentNOB.length; index++) {
      if (dataSource.id === this.closeTabService.saveDataForFragmentNOB[index].id) {
        this.closeTabService.saveDataForFragmentNOB[index] = this.onRowEditing;
      }
    }
    this.shiftFromFirst(dataSource);
  }
  removeFragmentMaster = async (dataSource: IFragmentMaster) => {
    dataSource = dataSource['dataSource'];

    const textMessage = 'ناحیه: ' + dataSource.zoneId + '، از اشتراک: ' + dataSource.fromEshterak + '،  تا اشتراک: ' + dataSource.toEshterak;
    if (this.fragmentManagerService.masterValidation(dataSource)) {
      if (await this.fragmentManagerService.firstConfirmDialog(textMessage)) {
        if (await this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTERREMOVE, dataSource))
          this.callAPI();
      }
    }
  }

  getIsValidateRow = async (dataSource: IFragmentMaster) => {
    if (this.fragmentManagerService.masterValidation(dataSource)) {
      if (this.fragmentManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.fragmentMASTERVALIDATE, dataSource))
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
  routeToAutomaticImport = (dataSource: any) => {
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
