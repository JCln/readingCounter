import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, ITitleValue } from 'interfaces/ioverall-config';
import { IReadingReportMaster } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent extends FactoryONE {
  dataSource: IReadingReportMaster[] = [];
  rowGroupMetadata: any;
  _selectedKindId: string = '';
  _years: ITitleValue[] = [];
  readingPeriodKindDictionary: IDictionaryManager[] = [];
  readingPeriodDictionary: IDictionaryManager[] = [];
  aggregateOptions = [
    { field: 'zoneTitle', header: 'ناحیه' },
    { field: 'reportTitle', header: 'عنوان گزارش' },
    { field: 'itemCount', header: 'تعداد' },
  ];
  canShowTable: boolean = true;
  _canShowGroupBorder: boolean = false;


  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  // refreshTableAfterGrouping = (val: any) => {
  //   if (val) {
  //     this.updateRowGroupMetaData();
  //     this.canShowTable = false;
  //     setTimeout(() => this.canShowTable = true, 0);
  //     this._canShowGroupBorder = true;
  //   }
  //   else {
  //     this._canShowGroupBorder = false;
  //   }
  // }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForRRMaster = null;
      this.verification();
    }

    if (this.closeTabService.saveDataForRRMaster) {
      this.dataSource = this.closeTabService.saveDataForRRMaster;
    }
    this.readingReportManagerService.getSearchInOrderTo();

    this.readingPeriodKindDictionary = await this.readingReportManagerService.getReadingPeriodKindDictionary();
    this.receiveYear();
    // this.refreshTableAfterGrouping(this.closeTabService.offloadedGroupReq._selectedAggregate);
  }
  receiveYear = () => {
    this._years = this.readingReportManagerService.getYears();
  }
  getReadingPeriod = async () => {
    this.readingPeriodDictionary = await this.readingReportManagerService.getReadingPeriodDictionary(this._selectedKindId);
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.masterReq, this.readingReportManagerService._isOrderByDate);
    if (temp) {
      this.connectToServer();
    }
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ReadingReportMasterWithParam, this.readingReportManagerService.masterReq);
    this.closeTabService.saveDataForRRMaster = this.dataSource;
  }
  // updateRowGroupMetaData() {
  //   this.rowGroupMetadata = {};

  //   if (this.dataSource) {
  //     for (let i = 0; i < this.dataSource.length; i++) {
  //       let rowData = this.dataSource[i];
  //       let representativeName = rowData[this.closeTabService.offloadedGroupReq._selectedAggregate];

  //       if (i == 0) {
  //         this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
  //       }
  //       else {
  //         let previousRowData = this.dataSource[i - 1];
  //         let previousRowGroup = previousRowData[this.closeTabService.offloadedGroupReq._selectedAggregate];
  //         if (representativeName === previousRowGroup)
  //           this.rowGroupMetadata[representativeName].size++;
  //         else
  //           this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
  //       }
  //     }
  //   }
  // }
  // resetAggregation = () => {
  //   this.closeTabService.offloadedGroupReq._selectedAggregate = '';
  //   this.updateRowGroupMetaData();
  // }
}
