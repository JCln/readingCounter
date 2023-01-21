import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { EN_messages } from 'interfaces/enums.enum';
import { IReadingConfigDefault } from 'interfaces/iimports';
import { IBatchImportDataResponse } from 'interfaces/import-data';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { IFragmentDetails } from 'interfaces/ireads-manager';
import { AllImportsService } from 'services/all-imports.service';
import { ImportDynamicService } from 'services/import-dynamic.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-simafa-batch',
  templateUrl: './simafa-batch.component.html',
  styleUrls: ['./simafa-batch.component.scss']
})
export class SimafaBatchComponent extends FactoryONE {

  userCounterReaderDictionary: IDictionaryManager[] = [];
  dataSource: IFragmentDetails[] = [];
  _batchResponse: IBatchImportDataResponse[] = [];
  zoneDictionary: IDictionaryManager[] = [];
  readingConfigDefault: IReadingConfigDefault;
  _selectCols: any = [];
  _selectedColumns: any[];
  _successImportBatchMessage: string = '';
  _canShowImportBatchButton: boolean = true;

  constructor(
    public importDynamicService: ImportDynamicService,
    public allImportsService: AllImportsService,
  ) {
    super();
  }

  changeStatusAfterSuccess = () => {
    this._successImportBatchMessage = EN_messages.import_simafaBatch;
    this._canShowImportBatchButton = false;
  }
  connectToServer = async () => {
    if (!this.dataSource || this.dataSource.length == 0) {
      this.importDynamicService.noRouteToImportMessage();
      return;
    }
    const validation = this.importDynamicService.verificationSimafaBatch(this.allImportsService.allImports_batch);
    if (validation) {
      this._batchResponse = await this.importDynamicService.postBodyServer(ENInterfaces.postSimafaBatch, this.allImportsService.allImports_batch);
      this.insertColumnsToTableAfterSuccess();
      this.assignBatchResToDataSource();
      this.insertSelectedColumns();
      this.changeStatusAfterSuccess();
      scrollTo(0, 0);
    }
  }
  assingIdToRouteId = () => {
    this.dataSource.forEach((item, index) => {
      this.allImportsService.allImports_batch.routeAndReaderIds[index].routeId = item.id;
    })
  }
  classWrapper = async (canRefresh?: boolean) => {
    this.dataSource = await this.importDynamicService.postBodyServer(ENInterfaces.fragmentDETAILSByEshterak,
      {
        fromEshterak: this.allImportsService.allImports_batch.fromEshterak,
        toEshterak: this.allImportsService.allImports_batch.toEshterak,
        zoneId: this.allImportsService.allImports_batch.zoneId
      }
    );
    if (this.dataSource) {
      for (let index = 1; index < this.dataSource.length && this.allImportsService.allImports_batch.routeAndReaderIds.length < this.dataSource.length; index++) {
        this.allImportsService.allImports_batch.routeAndReaderIds.push({ routeId: null, counterReaderId: null })
      }
      this.allImportsService.allImports_batch.fragmentMasterId = this.dataSource[0].fragmentMasterId;
      this.userCounterReaderDictionary = await this.importDynamicService.getUserCounterReaders(this.allImportsService.allImports_batch.zoneId);
      this.readingConfigDefault = await this.importDynamicService.getReadingConfigDefaults(this.allImportsService.allImports_batch.zoneId);

      this.assingIdToRouteId();
      this.insertReadingConfigDefaults(this.readingConfigDefault);
      this.insertSelectedColumns();
    }
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
  assignBatchResToDataSource = () => {
    this.allImportsService.allImports_batch.routeAndReaderIds.forEach((simafaBatchItem, index) => {
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
  private insertReadingConfigDefaults = (rcd: any) => {
    this.allImportsService.allImports_batch.hasPreNumber = rcd.hasPreNumber;
    this.allImportsService.allImports_batch.displayBillId = rcd.displayBillId;
    this.allImportsService.allImports_batch.displayRadif = rcd.displayRadif;
    this.allImportsService.allImports_batch.imagePercent = rcd.defaultImagePercent;
    this.allImportsService.allImports_batch.alalHesabPercent = rcd.defaultAlalHesab;
  }
}
