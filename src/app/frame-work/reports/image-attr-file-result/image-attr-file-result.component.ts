import { Component, Input } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IImageAttributionResult, IReadingReportReq } from 'interfaces/ireports';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-image-attr-file-result',
  templateUrl: './image-attr-file-result.component.html',
  styleUrls: ['./image-attr-file-result.component.scss']
})
export class ImageAttrFileResultComponent extends FactoryONE {
  isCollapsed: boolean = false;
  readingReportReq: IReadingReportReq = {
    fromDate: '',
    toDate: '',
    counterReaderId: '',
    readingPeriodId: null,
    reportCode: 0,
    year: 1400
  }
  chartColors:any;
  dataSource: IImageAttributionResult[] = [];

  _selectCols: any[] = [];
  _selectedColumns: any[];

  _isOrderByDate: boolean = true;

  constructor(
    public readingReportManagerService: ReadingReportManagerService,

    private closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForImageAttrResult = null;
      this.verification();
    }
    this.readingReportReq = this.readingReportManagerService.imgAttrResultReq;
    if (this.closeTabService.saveDataForImageAttrResult) {
      this.dataSource = this.closeTabService.saveDataForImageAttrResult;
    }
  }
  verification = async () => {
    this._isOrderByDate ? (this.readingReportReq.readingPeriodId = null, this.readingReportReq.year = 0) : (this.readingReportReq.fromDate = '', this.readingReportReq.toDate = '')
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportReq, this._isOrderByDate);
    if (temp) {
      this.connectToServer();
    }
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ImageAttributionResult, this.readingReportReq);
    this.closeTabService.saveDataForImageAttrResult = this.dataSource;
    this.chartColors = [{ backgroundColor: MathS.getRandomColors(this.dataSource.length) }]    
  }
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this._selectCols.filter(col => val.includes(col));
  }
}
