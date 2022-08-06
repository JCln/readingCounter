import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IImageAttributionResult } from 'interfaces/ireports';
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
  chartColors: any;
  dataSource: IImageAttributionResult[] = [];
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
    if (this.closeTabService.saveDataForImageAttrResult) {
      this.dataSource = this.closeTabService.saveDataForImageAttrResult;
    }
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.imgAttrResultReq, this._isOrderByDate);
    if (temp) {
      this.connectToServer();
    }
  }

  connectToServer = async () => {
    this.dataSource = await this.readingReportManagerService.portRRTest(ENInterfaces.ImageAttributionResult, this.readingReportManagerService.imgAttrResultReq);
    this.closeTabService.saveDataForImageAttrResult = this.dataSource;
    this.chartColors = [{ backgroundColor: MathS.getRandomColors(this.dataSource.length) }]
  }

}
