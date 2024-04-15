import { Component } from '@angular/core';
import { ENInterfaces } from 'interfaces/en-interfaces.enum';
import { IDictionaryManager, IProvinceHierarchy } from 'interfaces/ioverall-config';
import { CloseTabService } from 'services/close-tab.service';
import { ReadingReportManagerService } from 'services/reading-report-manager.service';
import { FactoryONE } from 'src/app/classes/factory';
import { MathS } from 'src/app/classes/math-s';
import { transitionAnimation } from 'src/app/directives/animation.directive';

@Component({
  selector: 'app-image-attr-file-analyze',
  templateUrl: './image-attr-file-analyze.component.html',
  styleUrls: ['./image-attr-file-analyze.component.scss'],
  animations: [transitionAnimation]
})
export class ImageAttrFileAnalyzeComponent extends FactoryONE {
  chartColors: any[];

  zoneDictionary: IDictionaryManager[] = [];
  provinceHierarchy: IProvinceHierarchy[] = [];

  constructor(
    public readingReportManagerService: ReadingReportManagerService,
    public closeTabService: CloseTabService
  ) {
    super();
  }

  classWrapper = async () => {
    this.provinceHierarchy = await this.readingReportManagerService.dictionaryWrapperService.getProvinceHierarchy();
    this.zoneDictionary = await this.readingReportManagerService.dictionaryWrapperService.getZoneDictionary();
  }
  verification = async () => {
    this.closeTabService.imgAttrAnalyzeReq.zoneIds = this.readingReportManagerService.utilsService.getZoneHierarical(this.closeTabService.imgAttrAnalyzeReq.selectedZoneIds);
    const temp = this.readingReportManagerService.verificationService.verificationRRShared(this.closeTabService.imgAttrAnalyzeReq, true);

    if (temp)
      this.callAPI();
  }
  callAPI = async () => {
    this.closeTabService.imgAttrAnalyzeReq.selectedZoneIds = [];
    this.closeTabService.saveDataForImageAttrAnalyze = await this.readingReportManagerService.ajaxReqWrapperService.postDataSourceByObject(ENInterfaces.ImageAttributionAnalyze, this.closeTabService.imgAttrAnalyzeReq);
    this.chartColors = [{ backgroundColor: MathS.getRandomColors(this.closeTabService.saveDataForImageAttrAnalyze.length) }]
  }

}
