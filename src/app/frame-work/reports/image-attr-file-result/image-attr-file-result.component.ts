import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-image-attr-file-result',
  templateUrl: './image-attr-file-result.component.html',
  styleUrls: ['./image-attr-file-result.component.scss'],
  animations: [transitionAnimation]
})
export class ImageAttrFileResultComponent extends FactoryONE {
  chartColors: any;
  readonly _isOrderByDate: boolean = true;

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => { }
  verification = async () => {
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.imgAttrResultReq, this._isOrderByDate);
    if (temp) {
      this.callAPI();
    }
  }

  callAPI = async () => {
    this.closeTabService.saveDataForImageAttrResult = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ImageAttributionResult, this.closeTabService.imgAttrResultReq);
    this.chartColors = [{ backgroundColor: MathS.getRandomColors(this.closeTabService.saveDataForImageAttrResult.length) }]
  }

}
