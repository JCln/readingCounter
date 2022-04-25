import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IBatchImportDataResponse, IImportSimafaBatchReq } from 'interfaces/import-data';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetails, IFragmentDetailsByEshterakReq } from 'interfaces/ireads-manager';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-batch',
  templateUrl: './simafa-batch.component.html',
  styleUrls: ['./simafa-batch.component.scss']
})
export class SimafaBatchComponent extends FactoryONE {
  _fragmentDetailsEshterak: IFragmentDetailsByEshterakReq = {
    fromEshterak: null,
    toEshterak: null,
    zoneId: null
  };
  simafaBatchReq: IImportSimafaBatchReq = {
    routeAndReaderIds: [{ routeId: null, counterReaderId: null }],
    fragmentMasterId: '',
    zoneId: 0,
    alalHesabPercent: 5,
    imagePercent: 5,
    hasPreNumber: false,
    displayBillId: false,
    displayRadif: false,
    readingPeriodId: null,
    year: 1401,
    readingProgramId: ''
  }


  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IFragmentDetails[] = [];
  _batchResponse: IBatchImportDataResponse[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  _selectCols: any = [];
  _selectedColumns: any[];
  _successImportBatchMessage: string = '';
  _canShowImportBatchButton: boolean = true;

  constructor(
    public importDynamicService: ImportDynamicService,
    private route: ActivatedRoute
  ) {
    super();
    this.getRouteParams();
  }

  getRouteParams = () => {
    this.simafaBatchReq.readingProgramId = this.route.snapshot.paramMap.get('id');
    this.simafaBatchReq.readingPeriodId = parseInt(this.route.snapshot.paramMap.get('readingPeriodId'));
    this.simafaBatchReq.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
    this.simafaBatchReq.year = parseInt(this.route.snapshot.paramMap.get('year'));

    this._fragmentDetailsEshterak.fromEshterak = this.route.snapshot.paramMap.get('fromEshterak');
    this._fragmentDetailsEshterak.toEshterak = this.route.snapshot.paramMap.get('toEshterak');
    this._fragmentDetailsEshterak.zoneId = parseInt(this.route.snapshot.paramMap.get('zoneId'));
  }
  changeStatusAfterSuccess = () => {
    this._successImportBatchMessage = EN_messages.import_simafaBatch;
    this._canShowImportBatchButton = false;
  }
  connectToServer = async () => {
    console.log(this.simafaBatchReq);
    if (!this.dataSource || this.dataSource.length == 0) {
      this.importDynamicService.noRouteToImportMessage();
      return;
    }
    const validation = this.importDynamicService.verificationSimafaBatch(this.simafaBatchReq);
    if (!validation)
      return;
    this._batchResponse = await this.importDynamicService.postImportSimafa(ENInterfaces.postSimafaBatch, this.simafaBatchReq);
    this.insertColumnsToTableAfterSuccess();
    this.assignBatchResToDataSource();
    this.insertSelectedColumns();
    this.changeStatusAfterSuccess();
    scrollTo(0, 0);
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.dataSource = await this.importDynamicService.postFragmentDetailsByEshterak(this._fragmentDetailsEshterak);
    if (!this.dataSource) return;

    for (let index = 1; index < this.dataSource.length; index++) {
      this.simafaBatchReq.routeAndReaderIds.push({ routeId: null, counterReaderId: null })
    }
    this.simafaBatchReq.fragmentMasterId = this.dataSource[0].fragmentMasterId;
    this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.simafaBatchReq.zoneId);

    this.insertSelectedColumns();
    this.assingIdToRouteId();
  }
  ngOnInit() {
    this.columnsToDefault();
    this.classWrapper();
  }
  insertSelectedColumns = () => {
    this._selectCols = this.importDynamicService.columnSimafaBatch();
    this._selectedColumns = this.importDynamicService.customizeSelectedColumns(this._selectCols);
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
  assingIdToRouteId = () => {
    this.dataSource.forEach((item, index) => {
      this.simafaBatchReq.routeAndReaderIds[index].routeId = item.id;
    })
  }
  assignBatchResToDataSource = () => {
    this.simafaBatchReq.routeAndReaderIds.forEach((simafaBatchItem, index) => {
      this._batchResponse.forEach(batchRes => {

        if (batchRes.fragmentDetailId === simafaBatchItem.routeId) {
          this.dataSource[index].count = batchRes.count;
          this.dataSource[index].trackNumber = batchRes.trackNumber;
          this.dataSource[index].counterReaderName = batchRes.counterReaderName;
        }

      })
    })
  }
  insertColumnsToTableAfterSuccess = () => {
    this.importDynamicService.columnSetSimafaBatch({ field: 'trackNumber', header: 'شماره پیگیری', isSelected: true, readonly: true })
    this.importDynamicService.columnSetSimafaBatch({ field: 'count', header: 'تعداد', isSelected: true, readonly: true })
  }
  columnsToDefault = () => {
    this.importDynamicService.columnRemoveSimafaBatch();
  }
}
