import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';

@Component({
  selector: 'app-image-attr-file-analyze',
  templateUrl: './image-attr-file-analyze.component.html',
  styleUrls: ['./image-attr-file-analyze.component.scss']
})
export class ImageAttrFileAnalyzeComponent extends FactoryONE {
  chartColors: any[];

  _isOrderByDate: boolean = true;
  zoneDictionary: IDictionaryManager[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async (canRefresh?: boolean) => {
    if (canRefresh) {
      this.closeTabService.saveDataForImageAttrAnalyze = null;
      this.verification();
    }
    this.zoneDictionary = await this.readingReportManagerService.getZoneDictionary();
  }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationRRShared(this.readingReportManagerService.imgAttrAnalyzeReq, this._isOrderByDate);
    if (temp)
      this.connectToServer();
  }
  connectToServer = async () => {
    this.closeTabService.saveDataForImageAttrAnalyze = await this.readingReportManagerService.portRRTest(ENInterfaces.ImageAttributionAnalyze, this.readingReportManagerService.imgAttrAnalyzeReq);
    this.chartColors = [{ backgroundColor: MathS.getRandomColors(this.closeTabService.saveDataForImageAttrAnalyze.length) }]
  }

}
